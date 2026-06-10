import type { Customer } from "@/constants/admin/customerData";

interface Props {
  customer: Customer;
}

const CustomerRow = ({ customer }: Props) => {
  return (
    <tr className="border-b border-slate-400">
      <td className="p-4 ">
        <div>
          <p className="font-medium text-slate-700">
            {customer.name}
          </p>

          <p className="text-sm text-slate-500">
            {customer.email}
          </p>
        </div>
      </td>

      <td className="p-4 text-slate-700">
        {customer.phone}
      </td>

      <td className="p-4 text-slate-700">
        {customer.city}
      </td>

      <td className="p-4 text-slate-700">
        {customer.totalBookings}
      </td>

      <td className="p-4 text-slate-700">
        ₹{customer.totalSpent}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            customer.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.status}
        </span>
      </td>

      <td className="p-4">
        <button className="text-emerald-600">
          View
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;
