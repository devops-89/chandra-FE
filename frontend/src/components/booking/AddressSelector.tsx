'use client';

import Radio from '@mui/material/Radio';

import { useAppSelector } from '@/redux/hooks';

interface AddressSelectorProps {
  selectedAddressId: number | null;
  onAddressSelect: (id: number) => void;
}

export default function AddressSelector({
  selectedAddressId,
  onAddressSelect,
}: AddressSelectorProps) {
  const addresses = useAppSelector(
    (state) => state.customerProfile.profile?.addresses ?? []
  );

  if (addresses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          No Address Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Please add an address before booking a service.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Select Address
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Choose where you want the technician to visit.
      </p>

      <div className="mt-6 space-y-4">
        {addresses.map((address) => (
          <label
            key={address.id}
            className={`
              flex cursor-pointer items-start gap-4 rounded-3xl border-2 p-6 transition-all duration-200
              ${
                selectedAddressId === address.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:border-emerald-200'
              }
            `}
          >
            <Radio
              checked={selectedAddressId === address.id}
              onChange={() => onAddressSelect(address.id)}
              color="success"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900">
                  {address.label}
                </h3>

                {address.isDefault && (
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                    Default
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-slate-600">
                {address.fullAddress}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}