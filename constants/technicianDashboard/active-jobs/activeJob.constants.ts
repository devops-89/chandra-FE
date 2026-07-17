import type { ActiveJob } from '@/types/technicianDashboard/activeJobs.types';

export const MOCK_ACTIVE_JOB: ActiveJob = {
  id: 'JOB-1001',

  serviceType: 'AC Deep Cleaning',

  title: 'Central Air Unit Maintenance',

  customerName: 'Robert Harrison',

  customerRating: 4.9,

  address:
    'Tower A, Green Valley Apartments, Sector 52, Gurgaon',

  payout: 2500,

  duration: '2 Hours',

  distance: '2.4 Km',

  status: 'travelling',

  eta: '12 Min',
};