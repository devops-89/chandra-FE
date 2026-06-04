import BookingAuthGuard from '@/components/booking/BookingAuthGuard';
import BookingConfirmation from '@/components/booking/BookingConfirmation';

export default function ConfirmationPage() {
  return (
    <BookingAuthGuard>
      <BookingConfirmation />
    </BookingAuthGuard>
  );
}
