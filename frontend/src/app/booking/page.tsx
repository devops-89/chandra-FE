import BookingAuthGuard from '@/components/booking/BookingAuthGuard';
import UnifiedBookingPage from '@/components/booking/UnifiedBookingPage';
import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';

interface BookingPageProps {
  searchParams: Promise<{
    serviceId?: string; // numeric ID from /booking?serviceId=6
    service?:   string; // legacy slug kept for backward compat
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;

  return (
    <BookingAuthGuard>
      <PublicNavbar />
      <UnifiedBookingPage
        serviceId={params.serviceId ? Number(params.serviceId) : undefined}
        service={params.service ?? ''}
      />
      <PublicFooter />
    </BookingAuthGuard>
  );
}
