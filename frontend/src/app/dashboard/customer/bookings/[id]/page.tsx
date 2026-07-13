'use client';

import { AlertTriangle,X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import StatusBadge from '@/components/customerDashboard/bookings/StatusBadge';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import { useAppDispatch } from '@/redux/hooks';
import { cancelBooking } from '@/redux/slices/customerBookingSlice';
import type {
  CustomerBooking,
  CustomerBookingsResponse,
} from '@/types/customerBooking.types';

export default function BookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [booking, setBooking] = useState<CustomerBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<CustomerBookingsResponse>(
          ENDPOINTS.GET_CUSTOMER_BOOKINGS,
        );

        const bookings = response.data?.data?.data ?? [];
        const matchedBooking = bookings.find(
          (item) => String(item.bookingId) === String(id),
        );

        if (isMounted) {
          setBooking(matchedBooking ?? null);
        }
      } catch {
        if (isMounted) {
          setError('Unable to load booking details right now.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchBooking();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!booking?.scheduledAtIst) {
      return 'N/A';
    }

    const parseIstDate = (dateStr: string): Date => {
      const cleanStr = dateStr.trim();
      let date = new Date(cleanStr);
      if (!isNaN(date.getTime())) {
        return date;
      }

      const match = cleanStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[\s,]+(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s+(AM|PM))?)?$/i);
      if (match) {
        const [_, day, month, year, hoursStr, minutesStr, secondsStr, period] = match;
        let hours = hoursStr ? Number(hoursStr) : 0;
        const minutes = minutesStr ? Number(minutesStr) : 0;
        const seconds = secondsStr ? Number(secondsStr) : 0;

        if (period) {
          if (period.toUpperCase() === 'PM' && hours !== 12) {
            hours += 12;
          } else if (period.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
          }
        }

        date = new Date(Number(year), Number(month) - 1, Number(day), hours, minutes, seconds);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }

      const isoFormat = cleanStr.replace(' ', 'T');
      date = new Date(isoFormat);
      if (!isNaN(date.getTime())) {
        return date;
      }

      return new Date(NaN);
    };

    const parsedDate = parseIstDate(booking.scheduledAtIst);
    if (isNaN(parsedDate.getTime())) {
      return 'N/A';
    }

    return parsedDate.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }, [booking]);

  const formattedAmount = useMemo(() => {
    if (!booking?.totalAmount) {
      return '₹0.00';
    }

    return `₹${Number(booking.totalAmount).toFixed(2)}`;
  }, [booking]);

  const dispatch = useAppDispatch();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Booking Details
          </h1>

          <p className="text-slate-500">
            Review the full details for your selected booking.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
            Loading booking details...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        ) : !booking ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
            No booking found for this ID.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
                    Booking #{booking.bookingId}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                    {booking.service?.name ?? 'Service'}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Scheduled on {formattedDate}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <StatusBadge status={booking.status} />
                  <p className="text-xl font-semibold text-slate-950">
                    {formattedAmount}
                  </p>

                  {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && booking.status !== 'REJECTED' && (
                    <button 
                      onClick={() => setIsCancelModalOpen(true)}
                      className='p-2 rounded-xl bg-red-600 text-white hover:cursor-pointer hover:bg-red-700 transition-colors text-sm font-medium'
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-950">
                  Booking Summary
                </h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span>Service</span>
                    <span className="font-medium text-slate-900">
                      {booking.service?.name ?? 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span>Status</span>
                    <span className="font-medium text-slate-900">
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span>Payment Status</span>
                    <span className="font-medium text-slate-900">
                      {booking.paymentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span>Emergency</span>
                    <span className="font-medium text-slate-900">
                      {booking.isEmergency ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Booked On</span>
                    <span className="font-medium text-slate-900">
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString('en-IN')
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-950">
                  Service Details
                </h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span>Technician</span>
                    <span className="font-medium text-slate-900">
                      {booking.technician?.name ?? 'Not assigned'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span>Phone</span>
                    <span className="font-medium text-slate-900">
                      {booking.technician?.phone ?? 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span>Address</span>
                    <span className="max-w-[60%] text-right font-medium text-slate-900">
                      {booking.address?.fullAddress ?? 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location</span>
                    <span className="font-medium text-slate-900">
                      {booking.address?.city ?? 'N/A'}, {booking.address?.state ?? 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">
                Review & Feedback
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-700">Your Rating</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    {booking.myRating ?? 'Not rated'}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {booking.myReview ?? 'No review submitted yet.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-700">Technician Rating</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    {booking.technicianRating ?? 'Not rated'}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {booking.technicianReview ?? 'No technician feedback yet.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {isCancelModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setIsCancelModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Cancel Booking</h2>
                  <p className="text-xs text-slate-500">Booking #{booking?.bookingId}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 space-y-4">
              <p className="text-sm text-slate-600">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Reason for Cancellation
                </label>
                <textarea
                  rows={3}
                  placeholder="Please let us know why you are cancelling..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                disabled={isCancelling}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!booking) return;

                  if (!cancelReason.trim()) {
                  alert('Please enter a cancellation reason.');
                    return;
                  }

                try {
                  setIsCancelling(true);

                  const cancelledBooking = await dispatch(
                    cancelBooking({
                    bookingId: booking.bookingId,
                    cancellationReason: cancelReason,
                  })
                ).unwrap();

                setBooking((prev) =>
                  prev
                    ? {
                      ...prev,
                      status: cancelledBooking.status,
                      cancelledBy: cancelledBooking.cancelledBy,
                      cancelledByRole: cancelledBooking.cancelledByRole,
                      cancellationReason:
                      cancelledBooking.cancellationReason,
                      updatedAt: cancelledBooking.updatedAt,
                    }
                  : prev
              );

                setCancelReason('');
                setIsCancelModalOpen(false);

              alert('Booking cancelled successfully.');
              } catch (err) {
              alert(
                typeof err === 'string'
                  ? err
                  : 'Failed to cancel booking.'
                );
              } finally {
              setIsCancelling(false);
              }
            }}
                disabled={isCancelling}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
