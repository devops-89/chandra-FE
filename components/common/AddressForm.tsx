'use client';

import { Loader2, MapPin } from 'lucide-react';
import React from 'react';

export interface AddressData {
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  label: string;
  customLabel: string;
  isDefault: boolean;
}

export const initialAddressData: AddressData = {
  fullAddress: '',
  city: '',
  state: '',
  pincode: '',
  latitude: '28.6139',
  longitude: '77.2090',
  label: 'Home',
  customLabel: '',
  isDefault: false,
};

interface AddressFormProps {
  data: AddressData;
  onChange: (updates: Partial<AddressData>) => void;
  onFetchLocation?: () => void;
  isFetchingLocation?: boolean;
  error?: string | null;
  success?: string | null;
  hideDefaultCheckbox?: boolean;
}

const inputClasses =
  'mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all';
const labelOptions = ['Home', 'Office', 'Other'];

export function AddressForm({
  data,
  onChange,
  onFetchLocation,
  isFetchingLocation,
  error,
  success,
  hideDefaultCheckbox,
}: AddressFormProps) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-600 font-medium">
          {success}
        </div>
      )}

      {/* Fetch Location Full Width Button */}
      {onFetchLocation && (
        <button
          type="button"
          onClick={onFetchLocation}
          disabled={isFetchingLocation}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-emerald-200"
        >
          {isFetchingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
          {isFetchingLocation ? 'Locating...' : 'Use Current Location'}
        </button>
      )}

      {/* Label Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
          Label As
        </label>
        <div className="flex gap-2">
          {labelOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ label: opt })}
              className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-xl border transition-all cursor-pointer ${
                data.label === opt
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {data.label === 'Other' && (
          <input
            type="text"
            placeholder="e.g. Parents' House, Gym, Friend's Place"
            value={data.customLabel}
            onChange={(e) => onChange({ customLabel: e.target.value })}
            className={`${inputClasses} mt-2`}
            required
          />
        )}
      </div>

      {/* Full Address */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
          Street Address
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Flat/House No, Building, Area, Street Address"
          value={data.fullAddress}
          onChange={(e) => onChange({ fullAddress: e.target.value })}
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* City & State */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
            City
          </label>
          <input
            type="text"
            placeholder="e.g. Gurgaon"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
            State
          </label>
          <input
            type="text"
            placeholder="e.g. Haryana"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Pincode & Defaults */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
            Pincode
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="e.g. 122001"
            value={data.pincode}
            onChange={(e) => onChange({ pincode: e.target.value.replace(/\D/g, '') })}
            className={inputClasses}
          />
        </div>

        {!hideDefaultCheckbox && (
          <div className="flex items-end">
            <label className="flex items-center gap-2 px-1 py-3 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={data.isDefault}
                onChange={(e) => onChange({ isDefault: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="text-sm font-medium text-slate-700">Set as default</span>
            </label>
          </div>
        )}
      </div>

      {/* Latitude & Longitude inputs (Collapsible) */}
      <div className="border-t border-slate-100 pt-3">
        <details className="group">
          <summary className="list-none flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none hover:text-slate-800">
            <span>Geographic Coordinates (Optional)</span>
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-[10px] font-medium text-slate-500 uppercase">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={data.latitude}
                onChange={(e) => onChange({ latitude: e.target.value })}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-slate-500 uppercase">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={data.longitude}
                onChange={(e) => onChange({ longitude: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
