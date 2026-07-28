import Link from 'next/link';
import { Eye } from 'lucide-react';
import { TableRow, TableCell, IconButton } from '@mui/material';

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
  const dateToParse = booking.scheduledAt || booking.scheduledAtIst || '';
  const parsedDate = parseIstDate(dateToParse);
  const formattedDate = isNaN(parsedDate.getTime())
    ? 'N/A'
    : parsedDate.toLocaleDateString('en-IN', {
        dateStyle: 'medium',
      });

  return (
    <TableRow hover>
      <TableCell className="font-medium">
        B-{booking.id || booking.bookingId}
      </TableCell>

      <TableCell>
        {booking.technician
          ? `${booking.technician.firstName || ''} ${booking.technician.lastName || ''}`.trim() || booking.technician.name || booking.technician.username || 'N/A'
          : 'Pending Assignment'}
      </TableCell>

      <TableCell>
        {booking.service?.name ?? 'N/A'}
      </TableCell>

      <TableCell>
        {formattedDate}
      </TableCell>

      <TableCell>
        ₹{booking.totalAmount ?? '0.00'}
      </TableCell>

      <TableCell>
        <StatusBadge
          status={booking.status}
        />
      </TableCell>

      <TableCell align="right">
        <Link
          href={`/customer/bookings/${booking.id || booking.bookingId}`}
          title="View Details"
        >
          <IconButton size="small" sx={{ color: '#059669' }}>
            <Eye size={18} />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
}