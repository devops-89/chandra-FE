import type { Booking } from '@/constants/admin/bookingData';

import BookingTimeline from './BookingTimeline';
import CustomerInfo from './CustomerInfo';
import PaymentInfo from './PaymentInfo';
import TechnicianInfo from './TechnicianInfo';

interface Props {
  booking: Booking;
}

const BookingDetails = ({ booking }: Props) => {
  return (
    <div className="space-y-6">
      <BookingTimeline status={booking.status} />

      <div className="grid gap-6 lg:grid-cols-3">
        <CustomerInfo customer={booking.customer} />
        <TechnicianInfo technician={booking.technician} />
        <PaymentInfo amount={booking.amount} />
      </div>
    </div>
  );
};

export default BookingDetails;