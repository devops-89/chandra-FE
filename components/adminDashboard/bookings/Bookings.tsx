'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAdminBookings } from '@/redux/slices/adminBookingSlice';

import BookingsTable from './list/BookingsTable';
import BookingStats from './stats/BookingStats';


const Bookings = () => {
  const dispatch = useAppDispatch();

  const { bookings, isLoading, error } = useAppSelector(
    (state) => state.adminBookings,
  );

  useEffect(() => {
    dispatch(fetchAdminBookings({ page: 1, limit: 30 }));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Bookings</h1>
        <p className="text-slate-500">Manage all service bookings</p>
      </div>

      <BookingStats />

      <BookingsTable bookings={bookings} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Bookings;
