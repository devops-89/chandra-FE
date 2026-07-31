'use client';

import { SERVICE_AREA_TEXT } from '@/constants/technicianApplication/serviceAreaOptions';
import { getAreaByValue } from '@/data/technicianOnboarding/serviceAreaData';
import type { CoverageSummaryProps } from '@/types/technicianOnboarding/serviceArea.types';

export default function CoverageSummary({
  radius,
}: CoverageSummaryProps) {
  const areaOption = getAreaByValue(radius);
  const kmValue = areaOption?.km || 5;

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <span className="material-symbols-outlined">map</span>
        {SERVICE_AREA_TEXT.coverageSummaryTitle}
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <span className="text-gray-700 text-sm">Service Area</span>
          <span className="text-2xl font-bold text-emerald-700">{kmValue}</span>
          <span className="text-gray-500 text-sm">km</span>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-900">
          <span className="font-semibold">Note:</span> You can update your service coverage anytime from your profile.
        </p>
      </div>
    </div>
  );
}
