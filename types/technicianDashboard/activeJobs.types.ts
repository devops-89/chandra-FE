export interface ActiveJob {
  id: string;

  serviceType: string;

  title: string;

  customerName: string;

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