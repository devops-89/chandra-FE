'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { SELFIE_UPLOAD_TEXT } from '@/constants/technicianApplication/documentUpload.constants';
import type { SelfieVerificationCardProps } from '@/types/technicianApplication/documentUpload.types';

export default function SelfieVerificationCard({
  image,
  onCapture,
}: SelfieVerificationCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    inputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCapture({
        documentId: 'selfie',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {SELFIE_UPLOAD_TEXT.title}
      </h3>

      {image ? (
        <div className="mb-6">
          <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-700">
            <Image
              src={image.fileUrl}
              alt="Selfie"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-emerald-700 font-medium">
            Selfie uploaded successfully
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gray-100 border-4 border-gray-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-400 text-6xl">
              photo_camera
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {SELFIE_UPLOAD_TEXT.description}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        onClick={handleCapture}
        className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors cursor-pointer inline-block"
      >
        {SELFIE_UPLOAD_TEXT.buttonText}
      </button>

      <p className="text-xs text-gray-600 mt-4">
        {SELFIE_UPLOAD_TEXT.instructions}
      </p>
    </div>
  );
}
