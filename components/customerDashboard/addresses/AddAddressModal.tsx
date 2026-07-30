'use client';

import { Loader2, X, MapPin } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { createAddress, fetchCustomerAddresses, } from '@/redux/slices/customerProfileSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

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
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

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
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoords({ latitude: lat, longitude: lng });

        // Reverse geocode using Nominatim (no API key required)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const addr = data?.address ?? {};

          // Build street address from available components
          const streetParts = [
            addr.house_number,
            addr.road || addr.pedestrian || addr.street,
            addr.neighbourhood || addr.suburb || addr.quarter,
          ].filter(Boolean);
          const derivedFullAddress = streetParts.join(', ');

          // City: try multiple Nominatim keys
          const derivedCity =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.county ||
            addr.district ||
            '';

          // State
          const derivedState = addr.state || '';

          // Pincode
          const derivedPincode = (addr.postcode || '').replace(/\D/g, '').slice(0, 6);

          // Only pre-fill if currently empty so we don't overwrite manual edits
          if (derivedFullAddress) setFullAddress(derivedFullAddress);
          if (derivedCity) setCity(derivedCity);
          if (derivedState) setState(derivedState);
          if (derivedPincode) setPincode(derivedPincode);
        } catch {
          // Reverse geocode failed — coords are still set, user fills manually
        }

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

    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lngNum)) {
      setError('Latitude and Longitude must be valid numbers');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalLabel =
        label === 'Other'
          ? customLabel.trim() || 'Other'
          : label;

      const finalPayload = {
        latitude: latNum,
        longitude: lngNum,
        fullAddress: fullAddress.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        label: finalLabel,
        isDefault,
      };

      await dispatch(createAddress(finalPayload)).unwrap();

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

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsFetchingLocation(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLatitude(lat.toString());
      setLongitude(lng.toString());

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        if (!response.ok) throw new Error('Failed to fetch address');
        const data = await response.json();

        if (data.address) {
          if (data.address.city || data.address.town || data.address.village) {
            setCity(data.address.city || data.address.town || data.address.village);
          }
          if (data.address.state) {
            setState(data.address.state);
          }
          if (data.address.postcode) {
            setPincode(data.address.postcode);
          }
          if (data.display_name) {
            setFullAddress(data.display_name);
          }
          dispatch(showSnackbar({ message: 'Location details automatically filled!', severity: 'success' }));
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
        setError('Failed to auto-detect address details. Please fill them manually.');
      } finally {
        setIsFetchingLocation(false);
      }
    }, (err) => {
      setError(`Location error: ${err.message}`);
      setIsFetchingLocation(false);
    });
  };

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

            {/* Fetch Location Full Width Button */}
            <button
              type="button"
              onClick={handleFetchLocation}
              disabled={isFetchingLocation}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-emerald-200"
            >
              {isFetchingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
              {isFetchingLocation ? 'Locating...' : 'Use Current Location'}
            </button>

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
                    className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-xl border transition-all cursor-pointer ${label === opt
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

