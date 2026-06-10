'use client';

import type { EquipmentCardProps } from '@/types/technicianApplication/toolInventory.types';

export default function EquipmentCard({
  equipment,
  isSelected,
  onToggle,
}: EquipmentCardProps) {
  return (
    <button
      onClick={() => onToggle(equipment.id)}
      className={`text-left p-6 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-emerald-700 bg-emerald-50'
          : 'border-gray-200 bg-white hover:border-emerald-700'
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`material-symbols-outlined text-4xl shrink-0 ${
            isSelected ? 'text-emerald-700' : 'text-gray-400'
          }`}
        >
          {equipment.icon}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {equipment.name}
            </h3>
            {isSelected && (
              <span className="material-symbols-outlined text-emerald-700">
                check_circle
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {equipment.description}
          </p>
        </div>
      </div>
    </button>
  );
}
