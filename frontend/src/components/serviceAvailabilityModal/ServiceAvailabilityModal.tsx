'use client';

import { useEffect, useState } from 'react';

import { SERVICEABLE_PIN_PREFIXES } from '@/constants/serviceAvailability/availability.constants';
import type { AvailabilityFormData, AvailabilityStatus } from '@/types/serviceAvailability.types';

import { AvailabilityForm } from './AvailabilityForm';
import { AvailabilitySuccess } from './AvailabilitySuccess';
import { AvailabilityUnavailable } from './AvailabilityUnavailable';
import { ModalBackdrop } from './ModalBackdrop';

const STORAGE_KEY = 'availabilityChecked';

export function ServiceAvailabilityModal() {
  const [showModal, setShowModal] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>('idle');

  // Show modal on first visit only
  useEffect(() => {
    const alreadyChecked = localStorage.getItem(STORAGE_KEY);
    if (!alreadyChecked) {
      setShowModal(true);
    }
  }, []);

  const handleSubmit = (data: AvailabilityFormData) => {
    const isServiceable = SERVICEABLE_PIN_PREFIXES.some((prefix) =>
      data.pincode.startsWith(prefix)
    );

    localStorage.setItem(STORAGE_KEY, 'true');
    setAvailabilityStatus(isServiceable ? 'available' : 'unavailable');
  };

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShowModal(false);
    setAvailabilityStatus('idle');
  };

  if (!showModal) return null;

  return (
    <ModalBackdrop>
      <div
        className="
          relative w-full max-w-md
          rounded-3xl bg-[#F7F2E8]
          p-8 shadow-2xl
        "
      >
        {/* Close button — always visible */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="
            absolute right-5 top-5
            flex h-8 w-8 items-center justify-center
            rounded-full text-slate-400
            transition-colors hover:bg-slate-200 hover:text-slate-700
            cursor-pointer
          "
        >
          ✕
        </button>

        {availabilityStatus === 'idle' && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Check Service Availability
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Enter your details to see if HiChandra services are available in your area.
              </p>
            </div>

            <AvailabilityForm onSubmit={handleSubmit} />
          </>
        )}

        {availabilityStatus === 'available' && (
          <AvailabilitySuccess onClose={handleClose} />
        )}

        {availabilityStatus === 'unavailable' && (
          <AvailabilityUnavailable onClose={handleClose} />
        )}
      </div>
    </ModalBackdrop>
  );
}
