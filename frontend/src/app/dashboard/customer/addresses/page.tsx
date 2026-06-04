import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

import AddressList from '@/components/customerDashboard/addresses/AddressList';
import AddAddressButton from '@/components/customerDashboard/addresses/AddAddressButton';

export default function AddressesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="
                text-3xl
                font-bold
              "
            >
              Addresses
            </h1>

            <p className="text-slate-500">
              Manage your saved locations.
            </p>
          </div>

          <AddAddressButton />
        </div>

        <AddressList />
      </div>
    </DashboardLayout>
  );
}