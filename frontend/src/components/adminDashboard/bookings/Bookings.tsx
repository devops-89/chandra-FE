'use client';

import { bookingsData } from '@/constants/admin/bookingData';
import BookingStats from './stats/BookingStats';
import BookingsTable from './list/BookingsTable';

const Bookings = () => {

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Bookings
        </h1>
        <p className="text-slate-500">Manage all service bookings</p>
      </div>

      <BookingStats />

      <BookingsTable bookings={bookingsData} />
    </div>
  );
};

export default Bookings;
