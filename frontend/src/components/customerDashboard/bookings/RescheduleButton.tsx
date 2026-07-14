'use client';

import { RefreshCw } from 'lucide-react';

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

export default function RescheduleButton({ disabled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-xl mt-2 bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
    >
      <RefreshCw className="w-4 h-4" />
      Reschedule
    </button>
  );
}