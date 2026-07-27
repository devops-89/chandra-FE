'use client';

import { DashboardCard, EmptyState } from '@/components/customerDashboard/shared';
import { useAppSelector } from '@/redux/hooks';

import AddressCard from './AddressCard';

export default function AddressList() {
  const { profile, isLoading } = useAppSelector((state) => state.customerProfile);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const backendAddresses = profile?.addresses || [];

  if (backendAddresses.length === 0) {
    return (
      <DashboardCard className="p-0 overflow-hidden">
        <EmptyState
          title="No saved addresses found"
          description="Click &quot;Add Address&quot; above to save your first location."
        />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-slate-200 bg-slate-100 text-emerald-600">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Label</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">City / State</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Pincode</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {backendAddresses.map((addr) => (
              <AddressCard key={addr.id} backendAddress={addr} />
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}

