import type { TimeSlots } from '@/types/bookingTypes/bookingForm.types';

export const TIME_SLOTS: TimeSlots = {
  morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['01:00 PM', '02:00 PM', '03:00 PM'],
  evening: ['05:00 PM', '06:00 PM', '07:00 PM'],
};

export const BOOKING_STEPS = [
  'Select Address',
  'Select Date & Time', 
  'Book Service'
];