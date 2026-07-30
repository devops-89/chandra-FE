'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerBookings } from '@/redux/slices/customerBookingSlice';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';

import BookingRow from './BookingRow';

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