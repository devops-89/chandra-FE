'use client';

interface JobStatusBadgeProps {
  status: string;
}

export default function JobStatusBadge({
  status,
}: JobStatusBadgeProps) {
  const styles: Record<string, string> = {
    'In Progress': 'bg-emerald-100 text-emerald-700',
    Dispatched: 'bg-blue-100 text-blue-700',
    Delayed: 'bg-red-100 text-red-700',
    Completed: 'bg-slate-100 text-slate-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    ACCEPTED: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-emerald-100 text-emerald-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[status] || 'bg-gray-100 text-gray-700'}
      `}
    >
      {status}
    </span>
  );
}