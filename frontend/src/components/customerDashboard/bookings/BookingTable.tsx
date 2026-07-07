'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerBookings } from '@/redux/slices/customerBookingSlice';

import BookingRow from './BookingRow';

export default function BookingTable() {
  const dispatch = useAppDispatch();

  const {
    bookings,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.customerBookings
  );

  useEffect(() => {
    dispatch(fetchCustomerBookings());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">
          No bookings found
        </h3>

        <p className="mt-2 text-slate-500">
          Your bookings will appear here once you book a service.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-sm
      "
    >
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-600">
            <th className="px-4 py-4 text-left text-white">
              Booking ID
            </th>

            <th className="px-4 py-4 text-left text-white">
              Service
            </th>

            <th className="px-4 py-4 text-left text-white">
              Date
            </th>

            <th className="px-4 py-4 text-left text-white">
              Amount
            </th>

            <th className="px-4 py-4 text-left text-white">
              Status
            </th>

            <th className="px-4 py-4 text-left text-white">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="text-slate-500">
          {bookings.map((booking) => (
            <BookingRow
              key={booking.bookingId}
              booking={booking}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}