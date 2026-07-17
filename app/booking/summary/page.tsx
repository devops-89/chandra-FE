import BookingAuthGuard from '@/components/booking/BookingAuthGuard';
import BookingSummary from '@/components/booking/BookingSummary';

export default function SummaryPage() {
  return (
    <BookingAuthGuard>
      <BookingSummary />
    </BookingAuthGuard>
  );
}
