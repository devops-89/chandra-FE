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
          <tr className="bg-emerald-600">
            <th className="px-4 py-4 text-left text-white">
              Booking ID
            </th>

            <th className="px-4 py-4 text-left text-white">
              Service
            </th>

            <th className="px-4 py-4 text-left text-white">
              Date
            </th>

            <th className="px-4 py-4 text-left text-white">
              Amount
            </th>

            <th className="px-4 py-4 text-left text-white">
              Status
            </th>

            <th className="px-4 py-4 text-left text-white">
              Action
            </th>
          </tr>
        </thead>

        <tbody
          className="text-slate-500">
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