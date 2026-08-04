'use client';

import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';

import JobCard from './JobCard';

interface NormalizedJob {
  id: string;
  service: Record<string, unknown> | null;
  customer: Record<string, unknown> | null;
  address: Record<string, unknown> | null;
  totalAmount: number | null;
  scheduledAt: string | null;
  status: string | null;
  createdAt: string | null;
  distance?: string;
  serviceType?: string;
  customerName?: string;
  payout?: string;
  schedule?: string;
  _optimisticAt?: number;
  _rawSocket?: Record<string, unknown>;
  [key: string]: unknown;
}

export default function NearbyJobsGrid() {
  const router = useRouter();
  const [jobs, setJobs] = useState<NormalizedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const res = await BookingControllers.getTechnicianActiveBookings();
        if (res?.data?.data && Array.isArray(res.data.data)) {
          const apiJobs: NormalizedJob[] = res.data.data;
          setJobs((prevJobs) => {
            const apiJobMap = new Map<string, NormalizedJob>();
            apiJobs.forEach((job) => {
              const id = (job.id || job._id) as string;
              if (id) apiJobMap.set(id, job);
            });

            const mergedList: NormalizedJob[] = [];
            const processedIds = new Set<string>();

            // 1. Process existing local jobs
            prevJobs.forEach((prevJob) => {
              const id = (prevJob.id || prevJob._id) as string;
              if (!id) return;

              if (apiJobMap.has(id)) {
                // Enrich and update existing job with backend truth
                const updated = { ...prevJob, ...apiJobMap.get(id) };
                mergedList.push(updated);
                processedIds.add(id);
              } else {
                // Keep fresh optimistic socket jobs (< 10s old) while backend indexing propagates
                const isFreshOptimistic = prevJob._optimisticAt && Date.now() - prevJob._optimisticAt < 10000;
                if (isFreshOptimistic) {
                  mergedList.push(prevJob);
                  processedIds.add(id);
                }
              }
            });

            // 2. Append new jobs from API response not already in local state
            apiJobs.forEach((apiJob) => {
              const id = (apiJob.id || apiJob._id) as string;
              if (id && !processedIds.has(id)) {
                mergedList.push(apiJob);
              }
            });

            return mergedList;
          });
        }
      } catch (error) {
        console.error('Error fetching available bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailable();

    // Normalize socket payload { bookingId, bookingInfo, serviceInfo, customerInfo, addressInfo }
    // into the shape that NearbyJobsGrid and JobCard already expect from the API response.
    const normalizeSocketPayload = (raw: Record<string, unknown>): NormalizedJob | null => {
      // Already in API shape (has id, not bookingId)
      if (raw?.id) return raw as unknown as NormalizedJob;

      // Socket shape detected
      const bookingId = raw?.bookingId as string | undefined;
      const bookingInfo = raw?.bookingInfo as Record<string, unknown> | undefined;
      const serviceInfo = raw?.serviceInfo as Record<string, unknown> | undefined;
      const customerInfo = raw?.customerInfo as Record<string, unknown> | undefined;
      const addressInfo = raw?.addressInfo as Record<string, unknown> | undefined;

      if (!bookingId) return null;

      return {
        id: bookingId,
        service: serviceInfo ?? null,
        customer: customerInfo ?? null,
        address: addressInfo ?? null,
        totalAmount: (bookingInfo?.totalAmount as number) ?? null,
        scheduledAt: (bookingInfo?.scheduledAt as string) ?? null,
        status: (bookingInfo?.status as string) ?? null,
        createdAt: (bookingInfo?.createdAt as string) ?? null,
        // Keep raw socket fields so background API merge can enrich later
        _rawSocket: raw,
      };
    };

    const handleRefresh = (e: Event) => {
      const detail = (e as CustomEvent<{
        action: string;
        booking?: Record<string, unknown>;
        bookingId?: string;
        timestamp?: number;
      }>).detail;

      if (!detail || !detail.action) {
        fetchAvailable();
        return;
      }

      if (detail.action === 'add' || detail.action === 'update') {
        const booking = detail.booking ? normalizeSocketPayload(detail.booking) : null;
        const targetId = booking?.id || (booking?._id as string | undefined);
        if (targetId) {
          const taggedBooking = { ...booking, _optimisticAt: detail.timestamp || Date.now() } as NormalizedJob;
          setJobs((prevJobs) => {
            const exists = prevJobs.some((j) => (j.id || j._id) === targetId);
            if (exists) {
              return prevJobs.map((j) => ((j.id || j._id) === targetId ? { ...j, ...taggedBooking } : j));
            }
            return [taggedBooking, ...prevJobs];
          });
        }
      } else if (detail.action === 'remove' && detail.bookingId) {
        setJobs((prevJobs) => prevJobs.filter((j) => (j.id || j._id) !== detail.bookingId));
      }

      // Background API synchronization
      fetchAvailable();
    };

    window.addEventListener('refresh_bookings', handleRefresh);
    return () => window.removeEventListener('refresh_bookings', handleRefresh);
  }, []);

  const handleAccept = async (job: NormalizedJob) => {
    try {
      await BookingControllers.acceptBooking(Number(job.id));
      router.push('/technician/bookings');
    } catch (error) {
      console.error('Error accepting booking', error);
    }
  };

  const displayJobs = jobs.slice(0, 2);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (displayJobs.length === 0) {
    return (
      <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
        <p className="text-slate-500 text-sm">No nearby bookings available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {displayJobs.map((job, idx) => {
        const serviceType = (job.service as Record<string, unknown>)?.name as string || job.serviceType || 'Service';
        const customer = job.customer as Record<string, string> | null;
        const customerName = customer ? `${customer.firstName} ${customer.lastName}` : job.customerName || 'Customer';
        const distance = job.distance || '2.4 Km';
        const payout = String(job.totalAmount ?? job.payout ?? 0);

        return (
          <JobCard
            key={job.id || (job._id as string)}
            serviceType={serviceType}
            customerName={customerName}
            distance={distance}
            payout={payout}
            time={job.scheduledAt ? new Date(job.scheduledAt).toLocaleString() : job.schedule || 'Today, 2:30 PM'}
            variant={idx % 2 === 0 ? 'green' : 'blue'}
            onAccept={() => handleAccept(job)}
            onReject={() => {
              setJobs((prevJobs) => prevJobs.filter((j) => (j.id || j._id) !== (job.id || job._id)));
            }}
          />
        );
      })}
    </div>
  );
}