'use client';

import { TOOL_INVENTORY_TEXT } from '@/constants/technicianApplication/toolInventory.constants';
import type { ToolInventoryInfoBannerProps } from '@/types/technicianApplication/toolInventory.types';

export default function ToolInventoryInfoBanner({
  message = TOOL_INVENTORY_TEXT.infoBannerMessage,
}: ToolInventoryInfoBannerProps) {
  return (
    <div className="bg-emerald-50 border border-emerald-700 rounded-lg p-6 flex items-start gap-4">
      <span className="material-symbols-outlined text-emerald-700 text-6xl shrink-0">
        info
      </span>
      <div>
        <h4 className="text-lg font-semibold text-emerald-900 mb-1">
          Priority Assignments
        </h4>
        <p className="text-sm text-emerald-800">
          {message}
        </p>
      </div>
    </div>
  );
}
