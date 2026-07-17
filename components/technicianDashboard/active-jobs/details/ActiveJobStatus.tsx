'use client';

import { useAppSelector } from '@/redux/hooks';

const statusConfig: Record<string, { bg: string; text: string }> = {
  assigned: { bg: 'bg-blue-100', text: 'text-blue-700' },
  accepted: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  travelling: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  started: { bg: 'bg-orange-100', text: 'text-orange-700' },
  completed: { bg: 'bg-green-100', text: 'text-green-700' },
};

export default function ActiveJobStatus() {
  const currentJob = useAppSelector((state) => state.activeJobs.currentJob);
  const status = currentJob?.status || 'travelling';
  const config = statusConfig[status] || statusConfig.travelling;
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`
        ${config.bg}
        ${config.text}
        px-4
        py-2
        rounded-full
        text-sm
        font-semibold
        animate-pulse
      `}
    >
      {label}
    </span>
  );
}