import type { AdminBooking } from '@/types/admin/bookings.types';

import BookingTimeline from './BookingTimeline';
import CustomerInfo from './CustomerInfo';
import PaymentInfo from './PaymentInfo';
import TechnicianInfo from './TechnicianInfo';

interface Props {
  booking: AdminBooking;
}

const BookingDetails = ({ booking }: Props) => {
  return (
    <div className="space-y-6">
      <BookingTimeline status={booking.status} />

      <div className="grid gap-6 lg:grid-cols-3">
        <CustomerInfo customer={booking.customer} />
        <TechnicianInfo technician={booking.technician} />
        <PaymentInfo totalAmount={booking.totalAmount} />
      </div>
    </div>
  );
};

export default BookingDetails;