'use client';

import type { AdminBooking } from '@/types/admin/bookings.types';

import AdminBreadcrumbTabs from '../../shared/AdminBreadcrumbTabs';

export type BookingTab =
  | 'all'
  | 'pending'
  | 'active'
  | 'completed'
  | 'manual';

interface Props {
  active: BookingTab;
  bookings: AdminBooking[];
  onChange: (tab: BookingTab) => void;
}

const BookingTabs = ({ active, bookings, onChange }: Props) => {
  const tabs = [
    { id: 'all',       label: 'All Bookings',      count: bookings.length,                                                                                   dotColor: '#059669' },
    { id: 'pending',   label: 'Pending',            count: bookings.filter((b) => b.status === 'PENDING').length,                                             dotColor: '#facc15' },
    { id: 'active',    label: 'Active',             count: bookings.filter((b) => b.status === 'ASSIGNED' || b.status === 'IN_PROGRESS').length,              dotColor: '#60a5fa' },
    { id: 'completed', label: 'Completed',          count: bookings.filter((b) => b.status === 'COMPLETED').length,                                           dotColor: '#4ade80' },
    { id: 'manual',    label: 'Manual Assignment',  count: bookings.filter((b) => b.technician === null).length,                                              dotColor: '#059669' },
  ];

  return (
    <AdminBreadcrumbTabs
      tabs={tabs}
      active={active}
      onChange={(id) => onChange(id as BookingTab)}
    />
  );
};

export default BookingTabs;
