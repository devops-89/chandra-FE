import { BookingStatus } from '@/types/bookingTypes/booking.types';

interface Props {
  status: BookingStatus;
}

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    BOOKED:
      'bg-blue-100 text-blue-700',
    ASSIGNED:
      'bg-amber-100 text-amber-700',
    ON_WAY:
      'bg-purple-100 text-purple-700',
    STARTED:
      'bg-indigo-100 text-indigo-700',
    COMPLETED:
      'bg-emerald-100 text-emerald-700',
    CANCELLED:
      'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${styles[status]}
      `}
    >
      {status.replace('_', ' ')}
    </span>
  );
}