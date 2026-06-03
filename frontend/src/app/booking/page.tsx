import BookingForm from '@/components/booking/BookingForm';

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
    <BookingForm
      service={params.service ?? ''}
    />
  );
}