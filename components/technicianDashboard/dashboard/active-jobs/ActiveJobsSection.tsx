'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ActiveJobHeader from './ActiveJobHeader';
import ActiveJobCard from '../../active-jobs/details/ActiveJobCard';
import { BookingControllers } from '@/api/bookingControllers';

export default function ActiveJobsSection() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActive = async () => {
      try {
        const res = await BookingControllers.getAssignedBookings(1, 10);
        if (res?.data?.data) {
          const allBookings = res.data.data;
          // Filter out CANCELLED
          let active = allBookings.filter((b: any) => b.status !== 'CANCELLED');
          
          if (active.length > 0) {
             setJobs(active.slice(0, 2).map((booking: any) => ({
                id: `JOB-${booking.id || booking.bookingId}`,
                rawId: booking.id || booking.bookingId,
                serviceType: booking.service?.name || 'Service',
                serviceId: booking.service?.id || booking.serviceId || undefined,
                title: booking.service?.name || 'Assigned Job',
                customerName: booking.customer ? `${booking.customer.firstName || ''} ${booking.customer.lastName || ''}`.trim() : (booking.customer?.name || 'Unknown'),
                customerPhone: booking.customer?.phone || '',
                customerRating: booking.customerRating ?? 5.0,
                address: booking.address?.fullAddress || (booking.address ? [booking.address.addressLine1 || booking.address.line1, booking.address.city].filter(Boolean).join(', ') : ''),
                payout: booking.totalAmount || booking.priceBreakdown?.technicianEarning || booking.technicianEarning || 0,
                duration: booking.duration || '',
                distance: booking.distance || '',
                status: booking.status?.toLowerCase() as any,
                eta: booking.scheduledAtIst || '',
             })));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchActive();

    const handleRefresh = () => fetchActive();
    window.addEventListener('refresh_bookings', handleRefresh);
    return () => window.removeEventListener('refresh_bookings', handleRefresh);
  }, []);

  return (
    <section className="space-y-6">
      <ActiveJobHeader />
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map(job => (
             <ActiveJobCard key={job.id} currentJob={job} />
          ))}
        </div>
      ) : (
        <ActiveJobCard currentJob={null} />
      )}
    </section>
  );
}