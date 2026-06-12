import type { JobFilter } from '../types/nearby-job.types';

export const INITIAL_FILTERS: JobFilter[] = [
  {
    id: 'all-services',
    label: 'All Services',
    type: 'all',
    active: true,
  },
  {
    id: 'distance-5km',
    label: 'Distance < 5km',
    type: 'distance',
    active: false,
  },
  {
    id: 'payout-50',
    label: 'Payout: $50+',
    type: 'payout',
    active: false,
  },
  {
    id: 'schedule-today',
    label: 'Schedule: Today',
    type: 'schedule',
    active: false,
  },
];

export const PRIORITY_COLORS = {
  urgent: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Urgent',
  },
  normal: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'Normal',
  },
  scheduled: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Scheduled',
  },
};

export const SERVICE_BADGE_COLORS = {
  'AC Deep Cleaning': 'bg-success-mint text-emerald-deep',
  'Kitchen Plumbing': 'bg-secondary-container text-on-secondary-container',
  'Electrical': 'bg-blue-50 text-blue-700',
  'Solar Cleaning': 'bg-yellow-50 text-yellow-700',
  'Maintenance': 'bg-gray-100 text-gray-700',
};
