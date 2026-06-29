'use client';

import Link from 'next/link';

import type { DocumentUploadFooterProps } from '@/types/technicianApplication/documentUpload.types';

export default function DocumentUploadFooter({
  onPrevious,
  onSubmit,
  isComplete = false,
}: DocumentUploadFooterProps) {
  return (
    <div className="flex gap-4 justify-between pt-8 border-t border-gray-200">
      <Link
        href="/technician/onboarding/skills-equipment"
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
        Submit & Continue →
      </button>
    </div>
  );
}
