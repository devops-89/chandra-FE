'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Snackbar, Alert, Pagination, Stack } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectNearbyJobs, selectNearbyJobsFilters } from '@/redux/selectors/nearbyJobsSelectors';
import { setCurrentJob } from '@/redux/slices/activeJobsSlice';
import { setJobs, addJob } from '@/redux/slices/nearbyJobsSlice';
import type { NearbyJob } from '@/types/technicianDashboard/nearbyJobs.types';
import { BookingControllers } from '@/api/bookingControllers';

import JobCard from './JobCard';

export default function JobList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectNearbyJobs);
  const filters = useAppSelector(selectNearbyJobsFilters);
  const [selectedDetailsJob, setSelectedDetailsJob] = useState<NearbyJob | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'error'>('success');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await BookingControllers.getTechnicianActiveBookings(page, 10, filters.serviceType);
        if (response?.data?.data) {
          if (response.data.pagination) {
            setTotalPages(response.data.pagination.totalPages || 1);
          }
          const dismissedStr = localStorage.getItem('dismissedBookings');
          const dismissedIds = dismissedStr ? JSON.parse(dismissedStr) : [];
          
          let apiJobs = response.data.data.map((b: any) => {
            const customerName = b.customer 
              ? `${b.customer.firstName || ''} ${b.customer.lastName || ''}`.trim() 
              : 'Unknown Customer';
            const serviceName = b.service?.name || 'General Service';
            
            // Format schedule date
            let scheduleStr = 'Today, 10:00 AM';
            if (b.scheduledAt) {
              const dateObj = new Date(b.scheduledAt);
              scheduleStr = dateObj.toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
              });
            }

            return {
              id: b.id,
              serviceType: serviceName,
              title: `${serviceName} Request`,
              customerName: customerName,
              rating: 4.8, // Fallback since it's missing in response
              reviews: 120, // Fallback
              location: b.address?.fullAddress || b.address?.city || 'Unknown Location',
              distance: '2.4 Km', // Fallback distance
              schedule: scheduleStr,
              duration: '2 Hours', // Fallback
              payout: `₹${b.totalAmount || 500}`,
              urgency: 'Normal' as const,
              lat: b.address?.latitude,
              lng: b.address?.longitude,
            };
          });
          
          apiJobs = apiJobs.filter((job: any) => !dismissedIds.includes(job.id));
          dispatch(setJobs(apiJobs));
        }
      } catch (error) {
        console.error('Failed to fetch technician bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();

    const handleRefresh = () => fetchBookings();
    window.addEventListener('refresh_bookings', handleRefresh);

    const handleNewBooking = (event: any) => {
      const b = event.detail;
      if (b && b.bookingId) {
        const customerName = b.customerInfo ? `${b.customerInfo.firstName || ''} ${b.customerInfo.lastName || ''}`.trim() : 'Unknown Customer';
        const serviceName = b.serviceInfo?.name || 'General Service';
        let scheduleStr = 'Today, 10:00 AM';
        if (b.bookingInfo?.scheduledAt) {
          scheduleStr = new Date(b.bookingInfo.scheduledAt).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
          });
        }
        
        const newJob = {
          id: b.bookingId,
          serviceType: serviceName,
          title: `${serviceName} Request`,
          customerName: customerName,
          rating: 4.8,
          reviews: 120,
          location: b.addressInfo?.fullAddress || b.addressInfo?.city || 'Unknown Location',
          distance: '2.4 Km',
          schedule: scheduleStr,
          duration: '2 Hours',
          payout: `₹${b.bookingInfo?.priceBreakdown?.technicianEarning || b.bookingInfo?.totalAmount || 500}`,
          urgency: 'Normal' as const,
          lat: b.addressInfo?.latitude,
          lng: b.addressInfo?.longitude,
        };
        
        // Use functional state update to prepend the new job to existing jobs from Redux
        dispatch(addJob(newJob));
      }
    };
    window.addEventListener('new_booking_data', handleNewBooking);

    return () => {
      window.removeEventListener('refresh_bookings', handleRefresh);
      window.removeEventListener('new_booking_data', handleNewBooking);
    };
  }, [dispatch, filters.serviceType, page]);

  const handleAccept = async (job: NearbyJob) => {
    try {
      await BookingControllers.acceptBooking(job.id);
      
      const activeJob = {
        id: `JOB-${job.id}`,
        rawId: job.id,
        serviceId: undefined, // Or populate it if we add it to NearbyJob
        serviceType: job.serviceType,
        title: job.title || `${job.serviceType} Service`,
        customerName: job.customerName,
        customerRating: job.rating || 4.8,
        address: job.location || 'Sector 52, Gurgaon',
        payout: typeof job.payout === 'string' ? parseFloat(job.payout.replace(/[^0-9.]/g, '')) || 2500 : 2500,
        duration: job.duration || '2 Hours',
        distance: job.distance || '2.4 Km',
        status: 'accepted' as const,
        eta: '12 Min',
      };
      dispatch(setCurrentJob(activeJob));
      dispatch(setJobs(jobs.filter((j) => j.id !== job.id)));
      
      setSnackbarMessage('Booking successfully accepted!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Optionally route after a short delay so user sees snackbar, or just don't route.
      // We will remove router.push so the snackbar can be seen, or we navigate after delay.
      setTimeout(() => {
        router.push('/technician/bookings');
      }, 1500);
      
    } catch (error) {
      console.error('Failed to accept booking', error);
      setSnackbarMessage('Failed to accept booking.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleReject = (jobId: number) => {
    const dismissedStr = localStorage.getItem('dismissedBookings');
    const dismissedIds = dismissedStr ? JSON.parse(dismissedStr) : [];
    localStorage.setItem('dismissedBookings', JSON.stringify([...dismissedIds, jobId]));
    dispatch(setJobs(jobs.filter((j) => j.id !== jobId)));
    
    setSnackbarMessage('Booking successfully dismissed!');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    // serviceType filter (search query)
    if (
      filters.serviceType &&
      !job.serviceType.toLowerCase().includes(filters.serviceType.toLowerCase()) &&
      !job.title.toLowerCase().includes(filters.serviceType.toLowerCase())
    ) {
      return false;
    }
    // distance filter
    if (filters.distance) {
      const distanceLimit = parseFloat(filters.distance);
      const km = parseFloat(job.distance.replace(/[^0-9.]/g, ''));
      if (!isNaN(km) && km > distanceLimit) {
        return false;
      }
    }
    // payout filter
    if (filters.payout) {
      const payoutLimit = parseFloat(filters.payout);
      const val = parseFloat(job.payout.replace(/[^0-9.]/g, ''));
      if (!isNaN(val) && val < payoutLimit) {
        return false;
      }
    }
    // schedule filter
    if (filters.schedule) {
      if (filters.schedule.toLowerCase() === 'today' && !job.schedule.toLowerCase().includes('today')) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <span className="material-symbols-outlined text-slate-300 text-5xl mb-3">search_off</span>
          <p className="text-slate-500 font-medium">No nearby bookings match your active filters.</p>
        </div>
      ) : (
        filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onAccept={() => handleAccept(job)}
            onReject={() => handleReject(job.id)}
            onViewDetails={() => setSelectedDetailsJob(job)}
          />
        ))
      )}

      {totalPages >= 1 && filteredJobs.length > 0 && (
        <Stack spacing={2} className="items-center mt-8 pb-4">
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={(e, val) => setPage(val)} 
            color="standard" 
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#059669',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#047857',
                }
              }
            }}
          />
        </Stack>
      )}

      {/* View Details Modal */}
      {selectedDetailsJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-150 relative">
            <button
              onClick={() => setSelectedDetailsJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                {selectedDetailsJob.serviceType}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                selectedDetailsJob.urgency === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {selectedDetailsJob.urgency}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedDetailsJob.title}</h3>
            
            <div className="space-y-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">person</span>
                <div>
                  <span className="font-semibold text-slate-900">{selectedDetailsJob.customerName}</span>
                  <span className="ml-2 text-yellow-500 font-medium">★ {selectedDetailsJob.rating} ({selectedDetailsJob.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">location_on</span>
                <span>{selectedDetailsJob.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">schedule</span>
                <span>Scheduled for: {selectedDetailsJob.schedule} ({selectedDetailsJob.duration})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">payments</span>
                <span className="font-bold text-emerald-600 text-base">{selectedDetailsJob.payout}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-slate-900 mb-2">Booking Description</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Provide high-quality cleaning and complete support. Make sure to inspect the equipment beforehand, perform deep cleansing processes, and verify functionality post-job completion. Ensure client satisfaction.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  handleAccept(selectedDetailsJob);
                  setSelectedDetailsJob(null);
                }}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer text-sm"
              >
                Accept Booking
              </button>
              <button
                onClick={() => {
                  handleReject(selectedDetailsJob.id);
                  setSelectedDetailsJob(null);
                }}
                className="py-3 px-5 border border-slate-200 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition-colors cursor-pointer text-sm"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          variant="filled" 
          sx={{ 
            width: '100%', 
            borderRadius: '12px', 
            bgcolor: snackbarSeverity === 'success' ? '#059669' : (snackbarSeverity === 'error' ? '#dc2626' : '#334155'), 
            color: 'white' 
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}