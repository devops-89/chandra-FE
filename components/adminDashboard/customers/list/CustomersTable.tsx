import { customersData } from "@/constants/admin/customerData";

import CustomerCard from "./CustomerCard";

const CustomersTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-emerald-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {customersData.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomersTable;
