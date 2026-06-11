'use client';

import { useState } from 'react';

import { SERVICE_AREA_TEXT } from '@/constants/technicianApplication/serviceAreaOptions';
import {
  getPincodeLocality,
  validatePincode,
} from '@/data/technicianOnboarding/serviceAreaData';
import type { PincodeMappingProps } from '@/types/technicianOnboarding/serviceArea.types';

export default function PincodeMapping({
  pincodes,
  onAddPincode,
  onRemovePincode,
}: PincodeMappingProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleAddPincode = () => {
    const trimmed = inputValue.trim();
    setError('');

    if (!trimmed) {
      setError('Please enter a pincode');
      return;
    }

    if (!validatePincode(trimmed)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    if (pincodes.includes(trimmed)) {
      setError('This pincode is already added');
      return;
    }

    onAddPincode(trimmed);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPincode();
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl border-2 border-orange-400">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <span className="material-symbols-outlined">pin_drop</span>
        {SERVICE_AREA_TEXT.pincodeLabel}
      </h2>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value.replace(/\D/g, '').slice(0, 6));
              setError('');
            }}
            onKeyDown={handleKeyDown}
            maxLength={6}
            placeholder={SERVICE_AREA_TEXT.pincodePlaceholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
          />
          <button
            onClick={handleAddPincode}
            type="button"
            className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium"
          >
            Add
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      {pincodes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {pincodes.map((pincode) => (
            <div
              key={pincode}
              className="flex items-center gap-2 bg-orange-100 text-orange-900 px-3 py-1 rounded-full text-sm"
            >
              <span className="font-medium">{pincode}</span>
              {getPincodeLocality(pincode) && (
                <span className="text-xs text-orange-700">
                  ({getPincodeLocality(pincode)})
                </span>
              )}
              <button
                onClick={() => onRemovePincode(pincode)}
                type="button"
                className="text-orange-700 hover:text-orange-900 ml-1"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
