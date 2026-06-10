import { customersData } from "@/constants/admin/customerData";

import CustomerRow from "./CustomerRow";

const CustomersTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              City
            </th>

            <th className="p-4 text-left">
              Bookings
            </th>

            <th className="p-4 text-left">
              Total Spent
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customersData.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;