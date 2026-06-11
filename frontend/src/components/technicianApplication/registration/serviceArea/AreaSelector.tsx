'use client';

import { SERVICE_AREA_TEXT } from '@/constants/technicianApplication/serviceAreaOptions';
import { getAreaByValue } from '@/data/technicianOnboarding/serviceAreaData';
import type { AreaSelectorProps } from '@/types/technicianOnboarding/serviceArea.types';

export default function AreaSelector({
  value,
  onChange,
}: AreaSelectorProps) {
  const areaOption = getAreaByValue(value);
  const kmValue = areaOption?.km || 5;

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl border border-slate-200">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">location_on</span>
          {SERVICE_AREA_TEXT.areaSection}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="areaSlider" className="text-gray-700 font-medium">
            Service Area
          </label>
          <div className="text-2xl font-bold text-emerald-700">{kmValue} km</div>
        </div>

        <input
          id="areaSlider"
          type="range"
          min="0"
          max="5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
          style={{
            background: `linear-gradient(to right, rgb(5, 150, 105) 0%, rgb(5, 150, 105) ${(value / 5) * 100}%, rgb(229, 231, 235) ${(value / 5) * 100}%, rgb(229, 231, 235) 100%)`,
          }}
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>5 km</span>
          <span>50 km</span>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <p className="text-sm text-emerald-900">
          You can serve customers within <span className="font-semibold">{kmValue} km</span> area from your location.
        </p>
      </div>
    </div>
  );
}
