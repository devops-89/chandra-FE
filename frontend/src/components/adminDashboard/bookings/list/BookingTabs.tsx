'use client';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

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
  dotColor: string;
}

interface Props {
  active: BookingTab;
  bookings: AdminBooking[];
  onChange: (tab: BookingTab) => void;
}

const BookingTabs = ({ active, bookings, onChange }: Props) => {
  const tabs: Tab[] = [
    {
      id: 'all',
      label: 'All Bookings',
      count: bookings.length,
      dotColor: '#059669',
    },
    {
      id: 'pending',
      label: 'Pending',
      count: bookings.filter((b) => b.status === 'PENDING').length,
      dotColor: '#facc15',
    },
    {
      id: 'active',
      label: 'Active',
      count: bookings.filter(
        (b) => b.status === 'ASSIGNED' || b.status === 'IN_PROGRESS',
      ).length,
      dotColor: '#60a5fa',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: bookings.filter((b) => b.status === 'COMPLETED').length,
      dotColor: '#4ade80',
    },
    {
      id: 'manual',
      label: 'Manual Assignment',
      count: bookings.filter((b) => b.technician === null).length,
      dotColor: '#059669',
    },
  ];

  return (
    <Breadcrumbs
      aria-label="booking tabs"
      separator=""
      sx={{
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'nowrap',
          overflowX: 'auto',
          gap: '4px',
          pb: '2px',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '& .MuiBreadcrumbs-separator': { display: 'none' },
        '& .MuiBreadcrumbs-li': { display: 'flex' },
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <Typography
            key={tab.id}
            component="button"
            onClick={() => onChange(tab.id)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '12px',
              px: '14px',
              py: '8px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              backgroundColor: isActive ? '#059669' : 'transparent',
              color: isActive ? '#fff' : '#64748b',
              boxShadow: isActive ? '0 1px 4px rgba(5,150,105,0.3)' : 'none',
              '&:hover': {
                backgroundColor: isActive ? '#047857' : '#f1f5f9',
                color: isActive ? '#fff' : '#1e293b',
              },
            }}
          >
            {/* dot */}
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: isActive ? 'rgba(255,255,255,0.7)' : tab.dotColor,
                transition: 'background-color 0.2s ease',
              }}
            />

            {tab.label}

            {/* count badge */}
            <span
              style={{
                borderRadius: '999px',
                padding: '1px 6px',
                fontSize: '0.6875rem',
                fontWeight: 700,
                lineHeight: 1.4,
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                color: isActive ? '#fff' : '#64748b',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.count}
            </span>
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BookingTabs;
