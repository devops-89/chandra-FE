'use client';

import Link from 'next/link';

import type { ToolInventoryFooterProps } from '@/types/technicianApplication/toolInventory.types';

export default function ToolInventoryFooter({
  onPrevious,
  onSubmit,
  isComplete = false,
}: ToolInventoryFooterProps) {
  return (
    <div className="flex gap-4 justify-between pt-8 border-t border-gray-200">
      <Link
        href="/technicianOnboarding/document-upload"
        className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          onPrevious();
        }}
      >
        ← Previous Step
      </Link>

      <button
        onClick={onSubmit}
        disabled={!isComplete}
        className={`px-8 py-3 rounded-lg font-medium transition-colors ${
          isComplete
            ? 'bg-emerald-700 text-white hover:bg-emerald-800'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        Save & Continue →
      </button>
    </div>
  );
}
