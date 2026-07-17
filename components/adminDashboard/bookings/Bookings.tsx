'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAdminBookings } from '@/redux/slices/adminBookingSlice';

import BookingsTable from './list/BookingsTable';
import BookingStats from './stats/BookingStats';

const Bookings = () => {
  const dispatch = useAppDispatch();

  const {
    bookings,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.adminBookings,
  );

  useEffect(() => {
    dispatch(
      fetchAdminBookings({
        page: 1,
        limit: 30,
      }),
    );
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Bookings
        </h1>

        <p className="text-slate-500">
          Manage all service bookings
        </p>
      </div>

      <BookingStats />

      {isLoading ? (
        <div className="rounded-xl bg-white p-8 text-center">
          Loading bookings...
        </div>
      ) : error ? (
        <div className="rounded-xl bg-red-50 p-8 text-center text-red-600">
          {error}
        </div>
      ) : (
        <BookingsTable bookings={bookings} />
      )}
    </div>
  );
};

export default Bookings;