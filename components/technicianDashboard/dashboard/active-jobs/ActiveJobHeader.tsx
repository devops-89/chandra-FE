'use client';

import Link from 'next/link';

export default function ActiveJobHeader() {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-lg md:text-xl font-bold text-slate-900">
        Active Booking
      </h4>
      <Link href="/dashboard/technician/bookings" className="text-emerald-600 font-medium text-sm hover:underline">
        View All
      </Link>
    </div>
  );
}