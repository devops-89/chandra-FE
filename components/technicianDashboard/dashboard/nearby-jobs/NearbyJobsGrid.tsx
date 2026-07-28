'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingControllers } from '@/api/bookingControllers';

import JobCard from './JobCard';

export default function NearbyJobsGrid() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const res = await BookingControllers.getTechnicianActiveBookings();
        if (res?.data?.data) {
          setJobs(Array.isArray(res.data.data) ? res.data.data : []);
        }
      } catch (error) {
        console.error('Error fetching available bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailable();

    const handleRefresh = () => fetchAvailable();
    window.addEventListener('refresh_bookings', handleRefresh);
    return () => window.removeEventListener('refresh_bookings', handleRefresh);
  }, []);

  const handleAccept = async (job: any) => {
    try {
      await BookingControllers.acceptBooking(job.id);
      router.push('/dashboard/technician/bookings');
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
        const serviceType = job.service?.name || job.serviceType || 'Service';
        const customerName = job.customer ? `${job.customer.firstName} ${job.customer.lastName}` : job.customerName || 'Customer';
        const distance = job.distance || '2.4 Km';
        const payout = job.totalAmount || job.payout || 0;
        
        return (
          <JobCard
            key={job.id}
            serviceType={serviceType}
            customerName={customerName}
            distance={distance}
            payout={payout}
            time={job.scheduledAt ? new Date(job.scheduledAt).toLocaleString() : job.schedule || 'Today, 2:30 PM'}
            variant={idx % 2 === 0 ? 'green' : 'blue'}
            onAccept={() => handleAccept(job)}
            onReject={() => {
               // Optional: remove locally
               setJobs(jobs.filter(j => j.id !== job.id));
            }}
          />
        );
      })}
    </div>
  );
}