import UnifiedBookingPage from '@/components/booking/UnifiedBookingPage';

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
    <UnifiedBookingPage
      service={params.service ?? ''}
    />
  );
}   