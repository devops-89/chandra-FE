
import Link from 'next/link';

import type { CustomerBooking } from '@/types/customerBooking.types';

import StatusBadge from './StatusBadge';

interface Props {
  booking: CustomerBooking;
}

function parseIstDate(dateStr: string): Date {
  if (!dateStr) return new Date(NaN);
  const cleanStr = dateStr.trim();
  let date = new Date(cleanStr);
  if (!isNaN(date.getTime())) {
    return date;
  }

  const match = cleanStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[\s,]+(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s+(AM|PM))?)?$/i);
  if (match) {
    const [_, day, month, year, hoursStr, minutesStr, secondsStr, period] = match;
    let hours = hoursStr ? Number(hoursStr) : 0;
    const minutes = minutesStr ? Number(minutesStr) : 0;
    const seconds = secondsStr ? Number(secondsStr) : 0;

    if (period) {
      if (period.toUpperCase() === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
      }
    }

    date = new Date(Number(year), Number(month) - 1, Number(day), hours, minutes, seconds);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  const isoFormat = cleanStr.replace(' ', 'T');
  date = new Date(isoFormat);
  if (!isNaN(date.getTime())) {
    return date;
  }

  return new Date(NaN);
}

export default function BookingRow({
  booking,
}: Props) {
  const parsedDate = parseIstDate(booking.scheduledAtIst);
  const formattedDate = isNaN(parsedDate.getTime())
    ? 'N/A'
    : parsedDate.toLocaleDateString('en-IN', {
        dateStyle: 'medium',
      });

  return (
    <tr className="border-b">
      <td className="px-4 py-4 text-slate-700">
        #{booking.bookingId}
      </td>

      <td className="px-4 py-4 text-slate-700">
        {booking.service?.name ?? 'N/A'}
      </td>

      <td className="px-4 py-4 text-slate-700">
        {formattedDate}
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