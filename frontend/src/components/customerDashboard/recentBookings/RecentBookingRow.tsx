import type { RecentBooking } from "@/types/dashboardTypes/customerDashboard/customerDashboard.types";

import { StatusBadge } from "../shared";

type RecentBookingRowProps = {
  booking: RecentBooking;
};

const RecentBookingRow = ({ booking }: RecentBookingRowProps) => {
  return (
    <tr className="group transition-colors hover:bg-slate-50">
      <td className="px-8 py-5 text-sm font-medium">#{booking.id}</td>
      <td className="px-8 py-5 text-sm font-bold">{booking.serviceName}</td>
      <td className="px-8 py-5 text-sm text-slate-500">{booking.bookingDate}</td>
      <td className="px-8 py-5">
        <StatusBadge status={booking.status} />
      </td>
      <td className="px-8 py-5 text-right">
        <button
          type="button"
          className="text-sm font-bold text-emerald-600 hover:underline cursor-pointer"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default RecentBookingRow;

