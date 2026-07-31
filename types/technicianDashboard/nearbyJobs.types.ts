export interface NearbyJob {
  id: number;
  serviceType: string;
  title: string;
  customerName: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  schedule: string;
  duration: string;
  payout: string;
  urgency: 'Urgent' | 'Normal';
  lat?: string;
  lng?: string;
}

export interface NearbyJobsFilters {
  serviceType: string;
  distance: string;
  payout: string;
  schedule: string;
}

export interface NearbyJobsState {
  jobs: NearbyJob[];
  selectedJob: NearbyJob | null;

  filters: NearbyJobsFilters;

  loading: boolean;
  error: string | null;
}