'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerBookings } from '@/redux/slices/customerBookingSlice';
import { BOOKING_STATUS } from '@/types/enums';

const STATUS_CHIP: Record<BOOKING_STATUS | string, { label: string; bg: string; text: string }> = {
  [BOOKING_STATUS.PENDING]: { label: 'Pending', bg: '#fef3c7', text: '#b45309' },
  [BOOKING_STATUS.ACCEPTED]: { label: 'Accepted', bg: '#e0f2fe', text: '#0369a1' },
  [BOOKING_STATUS.ENROUTE]: { label: 'En Route', bg: '#e0f2fe', text: '#0369a1' },
  [BOOKING_STATUS.ARRIVED]: { label: 'Arrived', bg: '#e0f2fe', text: '#0369a1' },
  [BOOKING_STATUS.ONGOING]: { label: 'In Progress', bg: '#f3e8ff', text: '#6b21a8' },
  [BOOKING_STATUS.COMPLETED]: { label: 'Completed', bg: '#d1fae5', text: '#047857' },
  [BOOKING_STATUS.CANCELLED]: { label: 'Cancelled', bg: '#fee2e2', text: '#b91c1c' },
};

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

function formatDate(raw: string): string {
  try {
    const date = parseIstDate(raw);
    if (isNaN(date.getTime())) return raw;
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return raw;
  }
}

function formatTime(raw: string): string {
  try {
    const date = parseIstDate(raw);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  } catch {
    return raw;
  }
}

export default function BookingTable() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const {
    bookings,
    pagination,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.customerBookings
  );

  useEffect(() => {
    dispatch(fetchCustomerBookings({ page, limit: itemsPerPage }));
  }, [dispatch, page, itemsPerPage]);

  if (isLoading && bookings.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">
          No bookings found
        </h3>

        <p className="mt-2 text-slate-500">
          Your bookings will appear here once you book a service.
        </p>
      </div>
    );
  }

  const totalItems = pagination?.total || 0;

  return (
    <div className="flex flex-col gap-6">
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 4, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
        <TableContainer>
          <Table sx={{ minWidth: 720 }}>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>
                  Booking ID
                </TableCell>

                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>
                  Technician
                </TableCell>

                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>
                  Service
                </TableCell>

                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>
                  Date
                </TableCell>

                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>
                  Amount
                </TableCell>

                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>
                  Status
                </TableCell>

                <TableCell sx={{ fontWeight: 600, color: '#475569' }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.map((booking) => (
                <BookingRow
                  key={booking.id || booking.bookingId}
                  booking={booking}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {totalItems > 0 && (
          <TablePagination
            component="div"
            count={totalItems}
            page={page - 1}
            onPageChange={(_, newPage) => setPage(newPage + 1)}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[10]}
            sx={{
              borderTop: '1px solid #f1f5f9',
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                margin: 0,
              }
            }}
          />
        )}
      </Paper>
    </div>
  );
}