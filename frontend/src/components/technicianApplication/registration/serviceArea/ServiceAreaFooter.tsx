'use client';

import { SERVICE_AREA_TEXT } from '@/constants/technicianApplication/serviceAreaOptions';
import type { ServiceAreaFooterProps } from '@/types/technicianOnboarding/serviceArea.types';

export default function ServiceAreaFooter({
  onPrevious,
  onSubmit,
}: ServiceAreaFooterProps) {
  return (
    <div className="flex gap-4 justify-between p-6 bg-white rounded-xl border border-slate-400">
      <button
        onClick={onPrevious}
        type="button"
        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        {SERVICE_AREA_TEXT.previousButton}
      </button>

      <button
        onClick={onSubmit}
        type="button"
        className="flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 cursor-pointer transition-colors font-medium"
      >
        {SERVICE_AREA_TEXT.submitButton}
        <span className="material-symbols-outlined">check_circle</span>
      </button>
    </div>
  );
}
