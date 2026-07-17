import type { Customer } from '@/constants/admin/customerData';

import CustomerProfile from './CustomerProfile';

interface Props {
  open: boolean;
  onClose: () => void;
  customer: Customer;
}

const CustomerProfileDrawer = ({ open, onClose, customer }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div
        className="absolute right-0 h-full w-full max-w-3xl overflow-y-auto bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Customer Profile</h2>
            <p className="text-slate-500">{customer.email}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <CustomerProfile />
      </div>
    </div>
  );
};

export default CustomerProfileDrawer;
