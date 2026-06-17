import type { NearbyJob } from '@/types/technicianDashboard/nearbyJobs.types';

export const MOCK_NEARBY_JOBS: NearbyJob[] = [
  {
    id: 1,
    serviceType: 'AC Deep Cleaning',
    title: 'Central Air Unit Maintenance',
    customerName: 'Robert Harrison',
    rating: 4.9,
    reviews: 12,
    location: 'Sector 52, Gurgaon',
    distance: '2.4 km away',
    schedule: 'Tomorrow, 10:00 AM',
    duration: 'Est. 2 Hours',
    payout: '$120.00',
    urgency: 'Urgent',
  },

  {
    id: 2,
    serviceType: 'Kitchen Plumbing',
    title: 'Kitchen Sink Pipe Replacement',
    customerName: 'Sarah Wilson',
    rating: 4.7,
    reviews: 8,
    location: 'Sector 45, Gurgaon',
    distance: '3.1 km away',
    schedule: 'Today, 04:30 PM',
    duration: 'Est. 1.5 Hours',
    payout: '$85.00',
    urgency: 'Normal',
  },
];