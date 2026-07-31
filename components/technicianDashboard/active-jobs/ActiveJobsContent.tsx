'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setLoading, setError } from '@/redux/slices/activeJobsSlice';
import { BookingControllers } from '@/api/bookingControllers';

import { Pagination } from '@mui/material';

import ActiveJobCard from './details/ActiveJobCard';
import JobStatusTabs from './header/JobStatusTabs';
import type { ActiveJob } from '@/types/technicianDashboard/activeJobs.types';
import { BOOKING_STATUS } from '@/types/enums';

export default function ActiveJobsContent() {
  const dispatch = useAppDispatch();
  const [localLoading, setLocalLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<BOOKING_STATUS>(BOOKING_STATUS.ACCEPTED);
  const [jobs, setJobs] = useState<ActiveJob[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      try {
        setLocalLoading(true);
        dispatch(setLoading(true));
        const res = await BookingControllers.getAssignedBookings(page, 4, activeStatus);
        
        if (!isMounted) return;

        const bookings = res?.data?.data || [];
        const totalItems = res?.data?.pagination?.total || bookings.length;
        setTotalPages(res?.data?.pagination?.totalPages || Math.ceil(totalItems / 4) || 1);
        
        if (bookings.length > 0) {
          const mappedJobs: ActiveJob[] = bookings.map((booking: any) => ({
            id: `JOB-${booking.id || booking.bookingId}`,
            rawId: booking.id || booking.bookingId,
            serviceType: booking.service?.name || 'Service',
            serviceId: booking.service?.id || booking.serviceId || undefined,
            title: booking.service?.name || 'Assigned Job',
            customerName: booking.customer ? `${booking.customer.firstName || ''} ${booking.customer.lastName || ''}`.trim() : (booking.customer?.name || 'Unknown'),
            customerPhone: booking.customer?.phone || '',
            customerRating: booking.customerRating ?? 5.0,
            address: booking.address?.fullAddress || '',
            payout: booking.totalAmount || booking.priceBreakdown?.technicianEarning || booking.technicianEarning || 0,
            duration: booking.duration || '',
            distance: booking.distance || '',
            status: booking.status?.toLowerCase() as any,
            eta: booking.scheduledAtIst || '',
          }));
          setJobs(mappedJobs);
        } else {
          setJobs([]);
        }
      } catch (err: any) {
        if (isMounted) {
          dispatch(setError(err.message || 'Failed to fetch active bookings'));
        }
      } finally {
        if (isMounted) {
          setLocalLoading(false);
          dispatch(setLoading(false));
        }
      }
    };

    fetchBookings();

    const handleRefresh = () => fetchBookings();
    window.addEventListener('refresh_bookings', handleRefresh);

    return () => {
      isMounted = false;
      window.removeEventListener('refresh_bookings', handleRefresh);
    };
  }, [dispatch, activeStatus, page]);

  return (
    <div className="space-y-6 pb-12">
      <JobStatusTabs activeStatus={activeStatus} onChangeStatus={(status) => {
        setActiveStatus(status);
        setPage(1); // Reset page on tab change
      }} />

      {localLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
        </div>
      ) : jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map((job) => (
            <ActiveJobCard 
              key={job.id} 
              currentJob={job} 
              onStatusUpdate={(newStatus) => {
                setActiveStatus(newStatus as BOOKING_STATUS);
                setPage(1);
              }}
            />
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#0f172a', // slate-900
                      fontFamily: 'inherit',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#10b981 !important', // emerald-500
                      color: '#ffffff',
                    },
                  }}
                />
            </div>
          )}
        </div>
      ) : (
        <ActiveJobCard currentJob={null} />
      )}
    </div>
  );
}