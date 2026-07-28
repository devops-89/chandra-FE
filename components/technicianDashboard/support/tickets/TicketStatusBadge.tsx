'use client';

interface Props {
  status: string;
}

export default function TicketStatusBadge({
  status,
}: Props) {
  const normalizedStatus = status ? status.toUpperCase() : 'OPEN';

  const statusStyles: Record<string, string> = {
    'OPEN': 'bg-blue-100 text-blue-700',
    'IN PROGRESS': 'bg-amber-100 text-amber-700',
    'RESOLVED': 'bg-emerald-100 text-emerald-700',
    'CLOSED': 'bg-slate-100 text-slate-700',
  };

  const style = statusStyles[normalizedStatus] || 'bg-gray-100 text-gray-700';

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  )}