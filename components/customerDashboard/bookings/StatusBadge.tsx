import type { CustomerBooking } from '@/types/customerBooking.types';

interface Props {
  status: CustomerBooking['status'];
}

export default function StatusBadge({
  status,
}: Props) {
  const styles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',

    ACCEPTED: 'bg-blue-100 text-blue-700',

    IN_PROGRESS: 'bg-purple-100 text-purple-700',

    COMPLETED: 'bg-emerald-100 text-emerald-700',

    CANCELLED: 'bg-red-100 text-red-700',

    REJECTED: 'bg-red-100 text-red-700',

    ON_HOLD: 'bg-orange-100 text-orange-700',
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${styles[status] ?? 'bg-slate-100 text-slate-700'}
      `}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}