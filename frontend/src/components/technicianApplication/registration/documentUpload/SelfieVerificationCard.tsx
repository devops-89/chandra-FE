'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { SELFIE_UPLOAD_TEXT } from '@/constants/technicianApplication/documentUpload.constants';
import type { SelfieVerificationCardProps } from '@/types/technicianApplication/documentUpload.types';

export default function SelfieVerificationCard({
  image,
  onCapture,
}: SelfieVerificationCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCaptureClick = async () => {
    // If browser doesn't support getUserMedia, fallback to file selection
    if (!navigator.mediaDevices?.getUserMedia) {
      inputRef.current?.click();
      return;
    }

    setCameraError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraActive(true);

      // Delay slightly to ensure video element is mounted and ref is set
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 50);
    } catch (err) {
      console.error('Camera access failed, falling back to file upload:', err);
      setCameraError(true);
      // Fallback to opening file dialog (C drive)
      inputRef.current?.click();
    }
  };

  const handleTakeSnapshot = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');

      // Use square dimensions for standard avatar selfie
      const size = Math.min(video.videoWidth || 480, video.videoHeight || 480);
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw the center of the video frame onto the square canvas
        const sx = (video.videoWidth - size) / 2;
        const sy = (video.videoHeight - size) / 2;

        ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `selfie_${Date.now()}.jpg`, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });

              onCapture(
                {
                  documentId: 'selfie',
                  fileName: file.name,
                  fileUrl: URL.createObjectURL(file),
                  uploadedAt: new Date().toISOString(),
                },
                file,
              );
              handleStopCamera();
            }
          },
          'image/jpeg',
          0.9,
        );
      }
    }
  };

  const handleStopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCapture(
        {
          documentId: 'selfie',
          fileName: file.name,
          fileUrl: URL.createObjectURL(file),
          uploadedAt: new Date().toISOString(),
        },
        file,
      );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {SELFIE_UPLOAD_TEXT.title}
      </h3>

      {isCameraActive ? (
        <div className="mb-6">
          <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-700 bg-black flex items-center justify-center relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Position your face clearly in the circle
          </p>
        </div>
      ) : image ? (
        <div className="mb-6">
          <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-700">
            <Image
              src={image.fileUrl}
              alt="Selfie"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
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

      {/* Hidden file input for fallback upload */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {isCameraActive ? (
          <>
            <button
              type="button"
              onClick={handleTakeSnapshot}
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors cursor-pointer inline-block w-full sm:w-auto"
            >
              Capture Photo
            </button>
            <button
              type="button"
              onClick={handleStopCamera}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer inline-block w-full sm:w-auto"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleCaptureClick}
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors cursor-pointer inline-block w-full sm:w-auto"
            >
              {image ? 'Retake Photo' : SELFIE_UPLOAD_TEXT.buttonText}
            </button>

            {image && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer inline-block w-full sm:w-auto"
              >
                Upload from Files
              </button>
            )}
          </>
        )}
      </div>

      {cameraError && (
        <p className="text-xs text-red-600 mt-2">
          Unable to access camera. Opened file explorer instead.
        </p>
      )}

      <p className="text-xs text-gray-600 mt-4">
        {SELFIE_UPLOAD_TEXT.instructions}
      </p>
    </div>
  );
}
