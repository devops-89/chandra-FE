'use client';

interface JobStatusBadgeProps {
  status:
    | 'In Progress'
    | 'Dispatched'
    | 'Delayed'
    | 'Completed';
}

export default function JobStatusBadge({
  status,
}: JobStatusBadgeProps) {
  const styles = {
    'In Progress':
      'bg-emerald-100 text-emerald-700',

    Dispatched:
      'bg-blue-100 text-blue-700',

    Delayed:
      'bg-red-100 text-red-700',

    Completed:
      'bg-slate-100 text-slate-700',
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}