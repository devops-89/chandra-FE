export interface ActiveJob {
  id: string;
  rawId: number;
  serviceType: string;
  serviceId?: number;

  title: string;

  customerName: string;
  customerPhone?: string;

  customerRating: number;

  address: string;

  payout: number;

  duration: string;

  distance: string;

  status:
    | 'assigned'
    | 'accepted'
    | 'travelling'
    | 'started'
    | 'completed';

  eta: string;
}