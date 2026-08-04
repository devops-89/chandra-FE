'use client';

import { Dialog,IconButton, TableCell, TableRow } from '@mui/material';
import { Edit, Loader2, MapPin,Trash2, X } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteAddress, updateAddress } from '@/redux/slices/customerProfileSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import type { Address } from '@/types/address.types';

interface AddressTableRowProps {
  address: Address;
}

export default function AddressTableRow({
  address,
}: AddressTableRowProps) {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.customerProfile);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Form state — pre-filled from the backend address
  const [label, setLabel] = useState(address.label ?? 'Home');
  const [customLabel, setCustomLabel] = useState('');
  const [fullAddress, setFullAddress] = useState(address.fullAddress);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [pincode, setPincode] = useState(address.pincode);
  const [latitude, setLatitude] = useState(address.latitude?.toString() ?? '28.6139');
  const [longitude, setLongitude] = useState(address.longitude?.toString() ?? '77.2090');

  const labelOptions = ['Home', 'Office', 'Other'];
  const inputClasses =
    'mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all';

  const handleOpenEdit = () => {
    // Re-sync form with latest backend values each time the modal opens
    setLabel(address.label ?? 'Home');
    setCustomLabel('');
    setFullAddress(address.fullAddress);
    setCity(address.city);
    setState(address.state);
    setPincode(address.pincode);
    setLatitude(address.latitude?.toString() ?? '28.6139');
    setLongitude(address.longitude?.toString() ?? '77.2090');
    setError(null);
    setSuccess(false);
    setIsEditOpen(true);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!fullAddress.trim()) { setError('Street address is required'); return; }
    if (!city.trim())        { setError('City is required'); return; }
    if (!state.trim())       { setError('State is required'); return; }
    if (!pincode.trim())     { setError('Pincode is required'); return; }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setError('Pincode must be exactly 6 digits');
      return;
    }

    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    if (isNaN(latNum) || isNaN(lngNum)) {
      setError('Latitude and Longitude must be valid numbers');
      return;
    }

    const finalLabel = label === 'Other' ? (customLabel.trim() || 'Other') : label;

    setIsSubmitting(true);
    try {
      await dispatch(
        updateAddress({
          id: Number(address.id),
          latitude: latNum,
          longitude: lngNum,
          fullAddress: fullAddress.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          label: finalLabel,
        })
      ).unwrap();

      setSuccess(true);
      setTimeout(() => handleClose(), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update address');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <>
      <TableRow hover>
        <TableCell>{address.id}</TableCell>
        <TableCell>
          <div className="text-slate-600 max-w-xs md:max-w-md lg:max-w-lg">
            {address.fullAddress}
          </div>
        </TableCell>
        <TableCell>{address.city}</TableCell>
        <TableCell>{address.state}</TableCell>
        <TableCell>{address.pincode}</TableCell>
        <TableCell>{new Date(address.createdAt).toLocaleDateString()}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenEdit} size="small" sx={{ mr: 1, color: '#059669' }} title="Edit">
            <Edit size={18} />
          </IconButton>
          <IconButton 
            onClick={() => {
              setDeleteError(null);
              setDeleteSuccess(false);
              setIsDeleteOpen(true);
            }} 
            size="small" 
            color="error" 
            title="Delete"
          >
            <Trash2 size={18} />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* ── Edit Modal ── */}
      <Dialog open={isEditOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <div
          className="w-full bg-white flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Edit Address</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Update the details for this saved location.
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
                    Address updated successfully! Closing...
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

                {/* Label */}
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

                {/* Pincode */}
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
                </div>

                {/* Coordinates (collapsible) */}
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
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
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
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  </details>
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
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
      </Dialog>

      {/* ── Delete Modal ── */}
      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} maxWidth="sm" fullWidth>
        <div
          className="w-full bg-white flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Delete Address</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  This action cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setIsDeleteOpen(false)}
                disabled={isDeleting || deleteSuccess}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              {deleteError && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600 font-medium">
                  {deleteError}
                </div>
              )}

              {deleteSuccess && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-600 font-medium">
                  Address deleted successfully! Closing...
                </div>
              )}

              {!deleteSuccess && (
                <p className="text-sm text-slate-700">
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-slate-900">&ldquo;{address.label}&rdquo;</span>?
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                disabled={isDeleting || deleteSuccess}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting || deleteSuccess}
                onClick={async () => {
                  setDeleteError(null);
                  setIsDeleting(true);
                  try {
                    await dispatch(deleteAddress(Number(address.id))).unwrap();
                    setDeleteSuccess(true);
                    setTimeout(() => setIsDeleteOpen(false), 1500);
                  } catch (err) {
                    setDeleteError(
                      err instanceof Error ? err.message : 'Failed to delete address'
                    );
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
      </Dialog>
    </>
  );
}