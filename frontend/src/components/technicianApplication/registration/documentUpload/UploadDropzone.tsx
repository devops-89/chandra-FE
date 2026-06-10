'use client';

import type { ChangeEvent } from 'react';
import { useRef } from 'react';

import type { UploadDropzoneProps } from '@/types/technicianApplication/documentUpload.types';

export default function UploadDropzone({
  documentName,
  acceptedFormats,
  onUpload,
  isUploaded = false,
  fileName,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload({
        documentId: documentName,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      });
    }
  };

  if (isUploaded && fileName) {
    return (
      <div className="border-2 border-emerald-700 bg-emerald-50 rounded-lg p-6 text-center">
        <span className="material-symbols-outlined text-emerald-700 text-4xl mb-2 block">
          check_circle
        </span>
        <p className="text-sm font-medium text-gray-900 mb-1">
          {fileName}
        </p>
        <p className="text-xs text-gray-600">Upload successful</p>
      </div>
    );
  }

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-700 hover:bg-emerald-50 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
          onUpload({
            documentId: documentName,
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
          });
        }
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats.map((fmt) => `.${fmt}`).join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
      <span className="material-symbols-outlined text-gray-400 text-4xl mb-2 block">
        cloud_upload
      </span>
      <p className="text-sm font-medium text-gray-900 mb-1">
        Drag and drop or{' '}
        <span className="text-emerald-700 font-semibold">browse</span>
      </p>
      <p className="text-xs text-gray-600">
        Supported: {acceptedFormats.join(', ').toUpperCase()}
      </p>
    </div>
  );
}
