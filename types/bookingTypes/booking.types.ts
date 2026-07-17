export type BookingStatus =
  | 'BOOKED'
  | 'ASSIGNED'
  | 'ON_WAY'
  | 'STARTED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Booking {
  id: string;
  serviceName: string;
  bookingDate: string;
  amount: number;
  status: BookingStatus;
}