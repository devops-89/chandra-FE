'use client';

import type { DocumentUploadCardProps } from '@/types/technicianApplication/documentUpload.types';

import UploadDropzone from './UploadDropzone';

export default function DocumentUploadCard({
  document,
  isUploaded,
  onUpload,
}: DocumentUploadCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start mb-4">
        <span className="material-symbols-outlined text-emerald-700 text-6xl">
          {document.icon}
        </span>
        <div className="ml-4 flex-1">
          <h4 className="text-lg font-semibold text-gray-900">
            {document.name}
          </h4>
          <p className="text-sm text-gray-600">
            {document.description}
          </p>
        </div>
      </div>

      <UploadDropzone
        documentName={document.id}
        acceptedFormats={document.acceptedFormats}
        onUpload={onUpload}
        isUploaded={isUploaded}
        fileName={document.name}
      />
    </div>
  );
}
