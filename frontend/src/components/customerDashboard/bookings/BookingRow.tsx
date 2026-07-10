
import Link from 'next/link';

import type { CustomerBooking } from '@/types/customerBooking.types';

import StatusBadge from './StatusBadge';

interface Props {
  booking: CustomerBooking;
}

export default function BookingRow({
  booking,
}: Props) {
  return (
    <tr className="border-b">
      <td className="px-4 py-4 text-slate-700">
        #{booking.bookingId}
      </td>

      <td className="px-4 py-4 text-slate-700">
        {booking.service?.name ?? 'N/A'}
      </td>

      <td className="px-4 py-4 text-slate-700">
        {new Date(booking.scheduledAtIst).toLocaleDateString()}
      </td>

      <td className="px-4 py-4 text-slate-700">
        ₹{booking.totalAmount ?? '0.00'}
      </td>

      <td className="px-4 py-4">
        <StatusBadge
          status={booking.status}
        />
      </td>

      <td className="px-4 py-4">
        <Link
          href={`/dashboard/customer/bookings/${booking.bookingId}`}
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