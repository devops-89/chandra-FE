'use client';

import type { DocumentUploadCardProps } from '@/types/technicianApplication/documentUpload.types';

import UploadDropzone from './UploadDropzone';

export default function DocumentUploadCard({
  document,
  isUploaded,
  uploadedFile,
  onUpload,
  onRemove,
}: DocumentUploadCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start mb-4">
        <span className="material-symbols-outlined text-emerald-700 text-6xl">
          {document.icon}
        </span>
        <div className="ml-4 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-lg font-semibold text-gray-900">
              {document.name}
            </h4>
            {document.optional ? (
              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                Optional
              </span>
            ) : (
              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">
                Required
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {document.description}
          </p>
        </div>
      </div>

      <UploadDropzone
        documentName={document.id}
        acceptedFormats={document.acceptedFormats}
        onUpload={onUpload}
        onRemove={onRemove}
        isUploaded={isUploaded}
        fileName={document.name}
        fileUrl={uploadedFile?.fileUrl}
      />
    </div>
  );
}
