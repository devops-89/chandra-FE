'use client';

import { getVehicleOptions } from '@/data/technicianOnboarding/toolInventoryData';
import type { VehicleAvailabilityCardProps } from '@/types/technicianApplication/toolInventory.types';

export default function VehicleAvailabilityCard({
  selected,
  onSelect,
}: VehicleAvailabilityCardProps) {
  const options = getVehicleOptions();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="space-y-4">
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer text-left ${
                isSelected
                  ? 'border-emerald-700 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-white text-4xl">
                    done
                  </span>
                )}
              </div>
              <span className="material-symbols-outlined text-2xl text-gray-600">
                {option.icon}
              </span>
              <span className="font-medium text-gray-900">
                {option.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
