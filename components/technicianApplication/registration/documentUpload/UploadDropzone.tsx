'use client';

import type { ChangeEvent } from 'react';
import { useRef } from 'react';

import type { UploadDropzoneProps } from '@/types/technicianApplication/documentUpload.types';

export default function UploadDropzone({
  documentName,
  acceptedFormats,
  onUpload,
  onRemove,
  isUploaded = false,
  fileName,
  fileUrl,
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
      }, file);
    }
  };

  if (isUploaded && fileName) {
    return (
      <div className="border-2 border-emerald-700 bg-emerald-50 rounded-lg p-4 text-center relative group">
        <button
          onClick={() => onRemove(documentName)}
          className="absolute -top-2 -right-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Remove document"
        >
          <span className="material-symbols-outlined text-sm block">close</span>
        </button>
        {fileUrl ? (
          <img src={fileUrl} alt={fileName} className="h-16 mx-auto mb-2 rounded object-cover" />
        ) : (
          <span className="material-symbols-outlined text-emerald-700 text-4xl mb-2 block">
            check_circle
          </span>
        )}
        <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1" title={fileName}>
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
          }, file);
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
