'use client';

import { useParams } from 'next/navigation';
import BookingDetailsPageWrapper from '@/components/adminDashboard/bookings/details/BookingDetailsPageWrapper';

export default function BookingDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  if (!id) return null;

  return <BookingDetailsPageWrapper bookingId={id} />;
}
