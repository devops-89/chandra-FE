'use client';

import { useState } from 'react';

import type { AdminBooking } from '@/types/admin/bookings.types';

import BookingCard from './BookingCard';
import BookingTabs, { type BookingTab } from './BookingTabs';
import ManualAssignmentPanel from './ManualAssignmentPanel';

interface Props {
  bookings: AdminBooking[];
}

const BookingsTable = ({ bookings }: Props) => {
  const [activeTab, setActiveTab] =
    useState<BookingTab>('all');

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;

    if (activeTab === 'pending')
      return booking.status === 'PENDING';

    if (activeTab === 'active')
      return (
        booking.status === 'ASSIGNED' ||
        booking.status === 'IN_PROGRESS'
      );

    if (activeTab === 'completed')
      return booking.status === 'COMPLETED';

    if (activeTab === 'manual')
      return booking.technician === null;

    return true;
  });

  const isManualTab = activeTab === 'manual';

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <svg
            className="h-7 w-7 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>

        <h3 className="text-base font-semibold text-slate-700">
          No bookings found
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          No bookings match this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="px-4 pt-4">
        <BookingTabs
          active={activeTab}
          bookings={bookings}
          onChange={setActiveTab}
        />
      </div>

      {isManualTab ? (
        <ManualAssignmentPanel bookings={filteredBookings} />
      ) : (
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              booking={booking}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsTable;