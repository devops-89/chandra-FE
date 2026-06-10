import { bookingsData } from "@/constants/admin/bookingData";

import BookingRow from "./BookingRow";

const BookingsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
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