import type { Booking } from "@/constants/admin/bookingData";

interface Props {
  booking: Booking;
}

const BookingRow = ({ booking }: Props) => {
  const statusColors = {
    Pending:
      "bg-yellow-100 text-yellow-700",
    Assigned:
      "bg-blue-100 text-blue-700",
    "In Progress":
      "bg-emerald-100 text-emerald-700",
    Completed:
      "bg-green-100 text-green-700",
    Cancelled:
      "bg-red-100 text-red-700",
  };

  return (
    <tr>
      <td className="p-4 text-slate-700">{booking.id}</td>

      <td className="p-4 text-slate-700">
        {booking.customer}
      </td>

      <td className="p-4 text-slate-700">
        {booking.service}
      </td>

      <td className="p-4 text-slate-700">
        {booking.technician}
      </td>

      <td className="p-4 text-slate-700">
        ₹{booking.amount}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[booking.status]
          }`}
        >
          {booking.status}
        </span>
      </td>

      <td className="p-4 text-slate-700">
        {booking.date}
      </td>

      <td className="p-4">
        <button className="text-emerald-600 cursor-pointer hover:underline">
          View
        </button>
      </td>
    </tr>
  );
};

export default BookingRow;