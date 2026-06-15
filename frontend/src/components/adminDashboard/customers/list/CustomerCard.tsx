import type { Customer } from "@/constants/admin/customerData";

interface Props {
  customer: Customer;
}

const CustomerCard = ({ customer }: Props) => {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white text-base font-semibold shrink-0">
            {customer.name[0]}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 leading-snug">
              {customer.name}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 max-w-[150px] truncate">
              {customer.email}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            customer.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 my-4 py-3 text-slate-700">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Phone</p>
          <p className="text-xs font-semibold text-slate-800 mt-1">{customer.phone}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">City</p>
          <p className="text-xs font-semibold text-slate-800 mt-1">{customer.city}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Bookings</p>
          <p className="text-xs font-semibold text-slate-800 mt-1">{customer.totalBookings}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Total Spent</p>
          <p className="text-xs font-bold text-emerald-600 mt-1">₹{customer.totalSpent}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline cursor-pointer">
          View
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
