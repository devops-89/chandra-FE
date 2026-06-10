import { bookingsData } from "@/constants/admin/bookingData";

import BookingRow from "./BookingRow";

const BookingsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-500 bg-white">
      <table className="w-full">
        <thead className="bg-emerald-600">
          <tr className="text-white">
            <th className="p-4 text-left">
              Booking ID
            </th>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Service
            </th>

            <th className="p-4 text-left">
              Technician
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {bookingsData.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;