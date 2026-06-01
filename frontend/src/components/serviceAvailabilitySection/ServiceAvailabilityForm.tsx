'use client';

import { useState } from 'react';

import { AVAILABILITY_MESSAGES } from '@/constants/serviceAvailability/availabilityData';
import { validatePincode } from '@/lib/validator/pincode.validator';
import type { AvailabilityResult } from '@/types/serviceAvailability.types';

import { AvailabilityStatus } from './AvailabilityStatus';

export const ServiceAvailabilityForm = () => {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  const [result, setResult] = useState<AvailabilityResult | null>(null);

  const handleCheckAvailability = () => {
    const validationError = validatePincode(pincode);

    if (validationError) {
      return setError(validationError);
    }

    setResult({
      type: pincode.startsWith('11') ? 'success' : 'error',
      message: pincode.startsWith('11')
        ? AVAILABILITY_MESSAGES.success
        : AVAILABILITY_MESSAGES.error,
    });
  };

  return (
    <>
      <section
        className="
          bg-zinc-
          px-6
          py-8
          md:px-10
          md:py-10
        "
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="
            mx-auto
            flex
            max-w-xl
            flex-col
            gap-6
          "
        >
          <div className="flex flex-col gap-2">
            <input
              value={pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPincode(value);

                if (error) setError('');
              }}
              placeholder="Enter pincode"
              maxLength={6}
              className={`
              h-16
              text-black
              rounded-xl
              bg-zinc-
              px-6
              border
              border-gray-300
              text-lg
              outline-none
              transition-all
              ${error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-green-500'}
            `}
            />
            {error && (
              <p
                className="
                text-sm
                font-medium
                text-red-500
              "
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleCheckAvailability}
            className="
              h-14
              rounded-full
              bg-green-600
              text-xl
              font-medium
              text-white
              transition-colors
              hover:bg-green-700
            "
          >
            Check Availability
          </button>

          <AvailabilityStatus result={result} />
        </form>
      </section>
    </>
  );
};
