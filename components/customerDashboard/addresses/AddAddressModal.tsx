'use client';

import { Check, Loader2, MapPin, X } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { createAddress, fetchCustomerAddresses } from '@/redux/slices/customerProfileSlice';

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAddressModal({ isOpen, onClose }: AddAddressModalProps) {
  const [label, setLabel] = useState('Home');
  const [customLabel, setCustomLabel] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset form fields
    setFullAddress('');
    setCity('');
    setState('');
    setPincode('');
    setLabel('Home');
    setCustomLabel('');
    setCoords(null);
    setIsLocating(false);
    setLocationSuccess(false);
    setLocationError(null);
    setIsDefault(false);
    setError(null);
    setSuccess(false);
    onClose();
  };

  const handleGetCurrentLocation = () => {
    setLocationError(null);
    setLocationSuccess(false);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLocating(false);
        setLocationSuccess(true);
      },
      (geoError) => {
        setIsLocating(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setLocationError(
            'Location permission was denied. Please enable location access or enter your address manually.'
          );
        } else {
          setLocationError('Unable to retrieve your location. Please try again or check settings.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    // Validation
    if (!fullAddress.trim()) {
      setError('Street address is required');
      return;
    }

    if (!city.trim()) {
      setError('City is required');
      return;
    }

    if (!state.trim()) {
      setError('State is required');
      return;
    }

    if (!pincode.trim()) {
      setError('Pincode is required');
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setError('Pincode must be exactly a 6-digit number');
      return;
    }

    if (!coords) {
      setError('Please use Current Location before saving this address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalLabel =
        label === 'Other'
          ? customLabel.trim() || 'Other'
          : label;

      await dispatch(
        createAddress({
          latitude: coords.latitude,
          longitude: coords.longitude,
          fullAddress: fullAddress.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          label: finalLabel,
          isDefault,
        })
      ).unwrap();

      // Re-fetch the profile so the list always reflects the latest backend state
      dispatch(fetchCustomerAddresses());

      setSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to add address'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelOptions = ['Home', 'Office', 'Other'];

  const inputClasses = "mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Add New Address</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Save a new location for service bookings.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col min-h-0">
          <div className="px-6 py-4 space-y-4 flex-1">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-600 font-medium">
                Address saved successfully! Closing...
              </div>
            )}

            {/* Location Button & Status */}
            <div>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium text-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    Fetching location...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    📍 Use Current Location
                  </>
                )}
              </button>

              {locationSuccess && (
                <p className="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  ✓ Current location detected
                </p>
              )}

              {locationError && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {locationError}
                </p>
              )}
            </div>

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
                    onClick={() => setLabel(opt)}
                    className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-xl border transition-all cursor-pointer ${
                      label === opt
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {label === 'Other' && (
                <input
                  type="text"
                  placeholder="e.g. Parents' House, Gym, Friend's Place"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
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
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className={inputClasses}
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 px-1 py-3 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Set as default</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Address'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

