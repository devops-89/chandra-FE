'use client';

import { Loader2,X } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { createAddress, fetchCustomerAddresses, } from '@/redux/slices/customerProfileSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

import { AddressForm } from '../../common/AddressForm';

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
  const [latitude, setLatitude] = useState('28.6139'); // prefilled Delhi lat
  const [longitude, setLongitude] = useState('77.2090'); // prefilled Delhi lng
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
    setLatitude('28.6139');
    setLongitude('77.2090');
    setIsDefault(false);
    setError(null);
    setSuccess(false);
    onClose();
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
            <AddressForm
              data={{
                fullAddress,
                city,
                state,
                pincode,
                latitude,
                longitude,
                label,
                customLabel,
                isDefault,
              }}
              onChange={(updates) => {
                if (updates.fullAddress !== undefined) setFullAddress(updates.fullAddress);
                if (updates.city !== undefined) setCity(updates.city);
                if (updates.state !== undefined) setState(updates.state);
                if (updates.pincode !== undefined) setPincode(updates.pincode);
                if (updates.latitude !== undefined) setLatitude(updates.latitude);
                if (updates.longitude !== undefined) setLongitude(updates.longitude);
                if (updates.label !== undefined) setLabel(updates.label);
                if (updates.customLabel !== undefined) setCustomLabel(updates.customLabel);
                if (updates.isDefault !== undefined) setIsDefault(updates.isDefault);
              }}
              onFetchLocation={handleFetchLocation}
              isFetchingLocation={isFetchingLocation}
              error={error}
              success={success ? 'Address saved successfully! Closing...' : null}
            />
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
