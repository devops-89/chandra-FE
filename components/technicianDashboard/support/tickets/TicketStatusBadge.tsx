'use client';

interface Props {
  status: string;
}

export default function TicketStatusBadge({
  status,
}: Props) {
  const statusStyles = {
    Open:
      'bg-blue-100 text-blue-700',

    'In Progress':
      'bg-amber-100 text-amber-700',

    Resolved:
      'bg-emerald-100 text-emerald-700',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold
        ${
          statusStyles[
            status as keyof typeof statusStyles
          ]
        }
      `}
    >
      {status}
    </span>
  )}