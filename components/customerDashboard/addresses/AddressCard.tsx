'use client';

import { Loader2, X } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteAddress, updateAddress } from '@/redux/slices/customerProfileSlice';
import type { Props } from '@/types/addressTypes/address.types';

export default function AddressCard({
  address,
  onEdit,
  onDelete,
}: Props) {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.customerProfile);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Resolve the full backend address by matching on id
  const backendAddress = profile?.addresses?.find(
    (a) => a.id.toString() === address.id
  );

  // Form state — pre-filled from the backend address (or card fields as fallback)
  const [label, setLabel] = useState(backendAddress?.label ?? address.label);
  const [customLabel, setCustomLabel] = useState('');
  const [fullAddress, setFullAddress] = useState(backendAddress?.fullAddress ?? address.address);
  const [city, setCity] = useState(backendAddress?.city ?? '');
  const [state, setState] = useState(backendAddress?.state ?? '');
  const [pincode, setPincode] = useState(backendAddress?.pincode ?? '');
  const [latitude, setLatitude] = useState(backendAddress?.latitude?.toString() ?? '28.6139');
  const [longitude, setLongitude] = useState(backendAddress?.longitude?.toString() ?? '77.2090');

  const labelOptions = ['Home', 'Office', 'Other'];
  const inputClasses =
    'mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all';

  const handleOpenEdit = () => {
    // Re-sync form with latest backend values each time the modal opens
    const latest = profile?.addresses?.find(
      (a) => a.id.toString() === address.id
    );
    setLabel(latest?.label ?? address.label);
    setCustomLabel('');
    setFullAddress(latest?.fullAddress ?? address.address);
    setCity(latest?.city ?? '');
    setState(latest?.state ?? '');
    setPincode(latest?.pincode ?? '');
    setLatitude(latest?.latitude?.toString() ?? '28.6139');
    setLongitude(latest?.longitude?.toString() ?? '77.2090');
    setError(null);
    setSuccess(false);
    setIsEditOpen(true);
    onEdit?.(address);
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

  return (
    <>
      {/* ── Address Card ── */}
      <div
        className="
          rounded-3xl
          bg-white
          p-6
          shadow-md
          hover:shadow-lg
          hover:border
          hover:border-emerald-600
          transition-all
          duration-100
        "
      >
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-950">
            {address.label}
          </h3>

          {address.isDefault && (
            <span
              className="
                rounded-full
                bg-emerald-100
                px-3
                py-1
                text-xs
                text-emerald-700
              "
            >
              Default
            </span>
          )}
        </div>

        <p className="mt-4 text-slate-700">
          {address.address}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleOpenEdit}
            className="
              rounded-xl
              border
              px-4
              py-2
              bg-emerald-600
              text-slate-50
              cursor-pointer
              hover:bg-emerald-700
            "
          >
            Edit
          </button>

          <button
            onClick={() => {
              setDeleteError(null);
              setDeleteSuccess(false);
              setIsDeleteOpen(true);
              onDelete?.(address);
            }}
            className="
              rounded-xl
              border
              bg-red-500
              px-4
              py-2
              text-slate-50
              hover:bg-red-700
              cursor-pointer
            "
          >
            Delete
          </button>
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {isEditOpen && (
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
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {isDeleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => !isDeleting && !deleteSuccess && setIsDeleteOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white shadow-2xl flex flex-col"
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
        </div>
      )}
    </>
  );
}