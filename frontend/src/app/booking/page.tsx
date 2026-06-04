import BookingAuthGuard from '@/components/booking/BookingAuthGuard';
import UnifiedBookingPage from '@/components/booking/UnifiedBookingPage';
import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';

interface BookingPageProps {
  searchParams: Promise<{
    service?: string;
  }>;
}

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const params = await searchParams;

  return (
    <BookingAuthGuard>
      <PublicNavbar />
      <UnifiedBookingPage service={params.service ?? ''} />
      <PublicFooter />
    </BookingAuthGuard>
  );
}   
