import { Booking } from '@/types/bookingTypes/booking.types';

export const bookings: Booking[] = [
  {
    id: 'HC-1001',
    serviceName: 'Solar Cleaning',
    bookingDate: '24 June 2026',
    amount: 999,
    status: 'ASSIGNED',
  },
  {
    id: 'HC-1002',
    serviceName: 'AC Servicing',
    bookingDate: '20 June 2026',
    amount: 699,
    status: 'COMPLETED',
  },
  {
    id: 'HC-1003',
    serviceName: 'Electrical Repair',
    bookingDate: '18 June 2026',
    amount: 499,
    status: 'CANCELLED',
  },
  {
    id: 'HC-1004',
    serviceName: 'Plumbing',
    bookingDate: '15 June 2026',
    amount: 799,
    status: 'COMPLETED',
  },
];