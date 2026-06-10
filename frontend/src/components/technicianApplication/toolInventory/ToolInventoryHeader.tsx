'use client';

import { TOOL_INVENTORY_TEXT } from '@/constants/technicianApplication/toolInventory.constants';
import type { ToolInventoryHeaderProps } from '@/types/technicianApplication/toolInventory.types';

export default function ToolInventoryHeader({
  title = TOOL_INVENTORY_TEXT.header.title,
  description = TOOL_INVENTORY_TEXT.header.description,
}: ToolInventoryHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}
