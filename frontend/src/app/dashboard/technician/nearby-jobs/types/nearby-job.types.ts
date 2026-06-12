export type JobPriority = 'urgent' | 'normal' | 'scheduled';
export type ServiceType = 'AC Deep Cleaning' | 'Kitchen Plumbing' | 'Electrical' | 'Solar Cleaning' | 'Maintenance';
export type FilterType = 'all' | 'distance' | 'payout' | 'schedule';

export interface NearbyJob {
  id: string;
  serviceType: ServiceType;
  title: string;
  customerName: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: number;
  scheduledTime: string;
  estimatedDuration: string;
  payout: number;
  priority: JobPriority;
  badge?: string;
}

export interface JobFilter {
  id: string;
  label: string;
  type: FilterType;
  active: boolean;
}

export interface ServiceOutlook {
  availableJobs: number;
  averagePayout: number;
  potentialEarnings: number;
}
