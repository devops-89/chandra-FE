import { bookings } from '@/constants/dashboard/bookings';

import BookingRow from './BookingRow';

export default function BookingTable() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-sm
      "
    >
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-4 py-4 text-left">
              Booking ID
            </th>

            <th className="px-4 py-4 text-left">
              Service
            </th>

            <th className="px-4 py-4 text-left">
              Date
            </th>

            <th className="px-4 py-4 text-left">
              Amount
            </th>

            <th className="px-4 py-4 text-left">
              Status
            </th>

            <th className="px-4 py-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}