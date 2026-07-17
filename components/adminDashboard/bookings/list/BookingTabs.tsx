'use client';

import type { AdminBooking } from '@/types/admin/bookings.types';

export type BookingTab =
  | 'all'
  | 'pending'
  | 'active'
  | 'completed'
  | 'manual';

interface Tab {
  id: BookingTab;
  label: string;
  count: number;
  dotColor?: string;
}

interface Props {
  active: BookingTab;
  bookings: AdminBooking[];
  onChange: (tab: BookingTab) => void;
}

const BookingTabs = ({
  active,
  bookings,
  onChange,
}: Props) => {
  const tabs: Tab[] = [
    {
      id: 'all',
      label: 'All Bookings',
      count: bookings.length,
    },
    {
      id: 'pending',
      label: 'Pending',
      count: bookings.filter(
        (booking) => booking.status === 'PENDING',
      ).length,
      dotColor: 'bg-yellow-400',
    },
    {
      id: 'active',
      label: 'Active',
      count: bookings.filter(
        (booking) =>
          booking.status === 'ASSIGNED' ||
          booking.status === 'IN_PROGRESS',
      ).length,
      dotColor: 'bg-blue-400',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: bookings.filter(
        (booking) => booking.status === 'COMPLETED',
      ).length,
      dotColor: 'bg-green-400',
    },
    {
      id: 'manual',
      label: 'Manual Assignment',
      count: bookings.filter(
        (booking) => booking.technician === null,
      ).length,
      dotColor: 'bg-emerald-500',
    },
  ];

  return (
    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            {tab.dotColor && (
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  isActive
                    ? 'bg-white/70'
                    : tab.dotColor
                }`}
              />
            )}

            {tab.label}

            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BookingTabs;