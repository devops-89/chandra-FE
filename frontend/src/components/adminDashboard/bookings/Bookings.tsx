'use client';

import { useState } from 'react';

import { bookingsData } from '@/constants/admin/bookingData';

import BookingsTable from './list/BookingsTable';
import BookingTabs, { type BookingTab } from './list/BookingTabs';
import ManualAssignmentPanel from './list/ManualAssignmentPanel';
import BookingStats from './stats/BookingStats';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<BookingTab>('all');

  const filteredBookings = bookingsData.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return b.status === 'Pending';
    if (activeTab === 'active')
      return b.status === 'Assigned' || b.status === 'In Progress';
    if (activeTab === 'completed') return b.status === 'Completed';
    return true;
  });

  const isManualTab = activeTab === 'manual';

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

      {/* Tabs */}
      <BookingTabs
        active={activeTab}
        bookings={bookingsData}
        onChange={setActiveTab}
      />

      {/* Filters — hidden on manual assignment tab */}
      {/* {!isManualTab && <BookingFilters />} */}

      {/* Content */}
      {isManualTab ? (
        <ManualAssignmentPanel bookings={bookingsData} />
      ) : (
        <BookingsTable bookings={filteredBookings} />
      )}
    </div>
  );
};

export default Bookings;
