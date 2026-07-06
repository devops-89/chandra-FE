'use client';

import { useAppSelector } from '@/redux/hooks';

import AddressCard from './AddressCard';

export default function AddressList() {
  const { profile, isLoading } = useAppSelector((state) => state.customerProfile);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const backendAddresses = profile?.addresses || [];

  if (backendAddresses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-500 font-medium">No saved addresses found.</p>
        <p className="text-slate-400 text-sm mt-1">Click &quot;Add Address&quot; above to save one.</p>
      </div>
    );
  }

  // Map backend Address model to the fields expected by AddressCard component
  const addresses = backendAddresses.map((addr) => ({
    id: addr.id.toString(),
    label: addr.label,
    address: addr.fullAddress,
    isDefault: addr.isDefault,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </div>
  );
}
