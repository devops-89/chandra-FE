'use client';

import Link from 'next/link';
import { useEffect,useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';

import ActiveJobStatus from './ActiveJobStatus';
import JobStepper from './JobStepper';
import QuickActions from './QuickActions';

export default function ActiveJobCard() {
  const [currentJob, setCurrentJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActive = async () => {
      try {
        const res = await BookingControllers.getAssignedBookings(1, 10);
        if (res?.data?.data && res.data.data.length > 0) {
          const bookings = res.data.data;
          const active = bookings.find((b: any) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED' && b.status !== 'REJECTED');
          if (active) {
            setCurrentJob(active);
          } else {
            const completed = bookings.find((b: any) => b.status === 'COMPLETED');
            if (completed) {
              setCurrentJob(completed);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching active booking:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActive();

    const handleRefresh = () => fetchActive();
    window.addEventListener('refresh_bookings', handleRefresh);
    return () => window.removeEventListener('refresh_bookings', handleRefresh);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading active booking...</div>;
  }

  if (!currentJob) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center py-12">
        <span className="material-symbols-outlined text-slate-350 text-5xl mb-3">work_history</span>
        <h5 className="text-xl font-bold text-slate-900 mb-2">No Active Booking</h5>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6 leading-relaxed">
          You don&apost have any active bookings currently assigned. Browse nearby requests to start earning!
        </p>
        <Link
          href="/technician/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
        >
          Browse Nearby Bookings
        </Link>
      </div>
    );
  }

  const formattedStatus = currentJob.status ? currentJob.status.charAt(0).toUpperCase() + currentJob.status.slice(1).toLowerCase() : 'Unknown';
  const serviceType = currentJob.service?.name || currentJob.serviceType || 'Service';
  
  // Extract address safely
  const addr = currentJob.address || {};
  const addrStr = [addr.addressLine1 || addr.line1 || addr.street, addr.city || addr.district]
    .filter(Boolean)
    .join(', ');
  const addressDisplay = addrStr || 'No address provided';

  return (
    <div
      className="
        bg-white
        p-5 md:p-6
        rounded-xl
        border-l-8
        border-emerald-600
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]
        relative
        overflow-hidden
      "
    >
      <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h5 className="text-2xl font-bold text-slate-900">
              {serviceType}
            </h5>
            <ActiveJobStatus status={formattedStatus} />
          </div>

          <p className="text-slate-500 flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">
              location_on
            </span>
            {addressDisplay}
          </p>
        </div>

        <div className="text-right">
          <p className="text-slate-500 text-sm">ETA</p>
          <p className="text-2xl font-extrabold text-emerald-600">
            {currentJob.status === 'COMPLETED' ? 'Done' : '15 Min'}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <JobStepper status={currentJob.status} />
      </div>

      <QuickActions />
    </div>
  );
}