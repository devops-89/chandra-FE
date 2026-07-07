'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import StatusBadge from '@/components/customerDashboard/bookings/StatusBadge';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
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
    if (!booking?.scheduledAt) {
      return 'N/A';
    }

    return new Date(booking.scheduledAt).toLocaleString('en-IN', {
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
    </DashboardLayout>
  );
}
