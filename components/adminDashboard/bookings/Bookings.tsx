'use client';



import Link from 'next/link';
import { Plus } from 'lucide-react';

import BookingsTable from './list/BookingsTable';

const Bookings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Bookings</h1>
          <p className="text-slate-500">Manage all service bookings</p>
        </div>
        <Link
          href="/admin/bookings/create"
          className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-50 shadow-sm"
        >
          <Plus size={18} />
          <span>Add Booking</span>
        </Link>
      </div>

      <BookingsTable />
    </div>
  );
};

export default Bookings;
