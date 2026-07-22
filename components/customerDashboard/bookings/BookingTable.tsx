'use client';

import {
  Box,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const router = useRouter();

  const { bookings, isLoading, error } = useAppSelector((state) => state.customerBookings);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchCustomerBookings());
  }, [dispatch]);

  const paginatedBookings = bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ boxShadow: "0px 0px 1px 1px #eee", border: "1px solid #eeeeee", py: 2, mt: 2 }}>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>BOOKING ID</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>SERVICE</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>DATE</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>TIME</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>STATUS</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                  <CircularProgress size={32} sx={{ color: '#059669' }} />
                </TableCell>
              </TableRow>
            )}

            {/* Error */}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !error && bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>No bookings found</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>Your bookings will appear here once you book a service.</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {/* Rows */}
            {!isLoading && !error && paginatedBookings.map((booking) => {
              const status = STATUS_CHIP[booking.status] ?? { label: booking.status, bg: '#f8fafc', text: '#64748b' };
              const dateStr = booking.scheduledAtIst || (booking as any).scheduledAt;
              
              return (
                <TableRow
                  key={booking.bookingId}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/dashboard/customer/bookings/${booking.bookingId}`)}
                >
                  <TableCell sx={{ fontSize: 13 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>
                      #{booking.bookingId}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontSize: 13 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      {booking.service?.name ?? 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                    {formatDate(dateStr)}
                  </TableCell>

                  <TableCell sx={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                    {formatTime(dateStr)}
                  </TableCell>

                  <TableCell align="right" sx={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    ₹{booking.totalAmount ?? '0.00'}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: 11,
                        bgcolor: status.bg,
                        color: status.text,
                        border: 'none',
                        borderRadius: '6px'
                      }}
                    />
                  </TableCell>

                  <TableCell align="center" onClick={(e) => e.stopPropagation()} sx={{ width: 100 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <Tooltip title="View details">
                        <IconButton
                          size="small"
                          onClick={() => router.push(`/dashboard/customer/bookings/${booking.bookingId}`)}
                          sx={{ color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}