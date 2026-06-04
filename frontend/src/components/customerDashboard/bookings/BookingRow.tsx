import Link from 'next/link';

import { Booking } from '@/types/bookingTypes/booking.types';

import StatusBadge from './StatusBadge';

interface Props {
  booking: Booking;
}

export default function BookingRow({
  booking,
}: Props) {
  return (
    <tr className="border-b">
      <td className="px-4 py-4">
        {booking.id}
      </td>

      <td className="px-4 py-4">
        {booking.serviceName}
      </td>

      <td className="px-4 py-4">
        {booking.bookingDate}
      </td>

      <td className="px-4 py-4">
        ₹{booking.amount}
      </td>

      <td className="px-4 py-4">
        <StatusBadge
          status={booking.status}
        />
      </td>

      <td className="px-4 py-4">
        <Link
          href={`/dashboard/customer/bookings/${booking.id}`}
          className="
            text-emerald-700
            hover:underline
          "
        >
          View Details
        </Link>
      </td>
    </tr>
  );
}