'use client';

import { HELP_TEXT } from '@/constants/technicianApplication/documentUpload.constants';
import type { UploadHelpCardProps } from '@/types/technicianApplication/documentUpload.types';

export default function UploadHelpCard({
  title = HELP_TEXT.title,
  description = HELP_TEXT.description,
}: UploadHelpCardProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start">
        <span className="material-symbols-outlined text-blue-700 text-6xl">
          help
        </span>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h4>
          <p className="text-sm text-gray-600">
            {description}
          </p>
          <a
            href="mailto:support@hichandra.com"
            className="text-blue-700 text-sm font-medium hover:underline mt-3 inline-block"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}
