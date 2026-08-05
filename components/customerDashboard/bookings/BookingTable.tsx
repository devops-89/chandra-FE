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
  TableRow,
  Box,
  Card,
  Typography,
  Chip,
  Button
} from '@mui/material';
import Link from 'next/link';
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
        <>
          <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
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

          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2, p: 2, bgcolor: '#f8fafc' }}>
            {bookings.map((booking: any) => (
              <Card key={booking.id || booking.bookingId} variant="outlined" sx={{ borderRadius: 3, p: 2, bgcolor: 'white', borderColor: '#e2e8f0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    B-{booking.id || booking.bookingId}
                  </Typography>
                  <Chip 
                    label={booking.status} 
                    size="small"
                    color={
                      booking.status?.toLowerCase() === 'completed' ? 'success' :
                      booking.status?.toLowerCase() === 'cancelled' ? 'error' :
                      booking.status?.toLowerCase() === 'pending' ? 'warning' : 'info'
                    }
                    sx={{ fontWeight: 600, borderRadius: 1 }}
                  />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {booking.service?.name || booking.serviceName || "Service"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Date: {booking.scheduledAt 
                    ? new Date(booking.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : booking.bookingDate || "-"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Amount: ₹{booking.totalAmount || booking.price || 0}
                </Typography>
                <Button 
                  component={Link}
                  href={`/customer/bookings/${booking.id || booking.bookingId}`}
                  size="small"
                  color="success"
                  variant="outlined"
                  fullWidth
                  sx={{ fontWeight: 600 }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </Box>
        </>

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