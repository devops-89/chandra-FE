'use client';

import { TOOL_INVENTORY_TEXT } from '@/constants/technicianApplication/toolInventory.constants';
import type { AdditionalEquipmentInputProps } from '@/types/technicianApplication/toolInventory.types';

export default function AdditionalEquipmentInput({
  value,
  onChange,
}: AdditionalEquipmentInputProps) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-900">
        {TOOL_INVENTORY_TEXT.additionalToolsLabel}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={TOOL_INVENTORY_TEXT.additionalToolsPlaceholder}
        rows={5}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent resize-none"
      />
      <p className="text-xs text-gray-500">
        Describe any additional tools, equipment, or certifications you have
      </p>
    </div>
  );
}
