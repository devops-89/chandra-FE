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
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAdminBookings } from '@/redux/slices/adminBookingSlice';
import { useTablePagination } from '@/hooks/useTablePagination';
import type { AdminBooking } from '@/types/admin/bookings.types';
import { BOOKING_PAYMENT_STATUS, BOOKING_STATUS } from '@/types/enums';

import AssignTechnicianModal from '../actions/AssignTechnicianModal';
import BookingTabs, { type BookingTab } from './BookingTabs';

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField =
  | 'bookingId'
  | 'customer'
  | 'service'
  | 'technician'
  | 'scheduledAt'
  | 'totalAmount'
  | 'status'
  | 'paymentStatus';

type SortDir = 'asc' | 'desc';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CHIP: Record<BOOKING_STATUS | string, { label: string; bg: string; text: string }> = {
  [BOOKING_STATUS.PENDING]:     { label: 'Pending',     bg: '#fef3c7', text: '#b45309' }, // Amber
  [BOOKING_STATUS.ACCEPTED]:    { label: 'Accepted',    bg: '#e0f2fe', text: '#0369a1' }, // Sky Blue
  [BOOKING_STATUS.ENROUTE]:     { label: 'En Route',    bg: '#e0f2fe', text: '#0369a1' }, // Sky Blue
  [BOOKING_STATUS.ARRIVED]:     { label: 'Arrived',     bg: '#e0f2fe', text: '#0369a1' }, // Sky Blue
  [BOOKING_STATUS.ONGOING]:     { label: 'In Progress', bg: '#f3e8ff', text: '#6b21a8' }, // Purple
  [BOOKING_STATUS.COMPLETED]:   { label: 'Completed',   bg: '#d1fae5', text: '#047857' }, // Emerald
  [BOOKING_STATUS.CANCELLED]:   { label: 'Cancelled',   bg: '#fee2e2', text: '#b91c1c' }, // Red
};

const PAYMENT_CHIP: Record<BOOKING_PAYMENT_STATUS | string, { label: string; bg: string; text: string }> = {
  [BOOKING_PAYMENT_STATUS.PAID]:    { label: 'Paid',    bg: '#d1fae5', text: '#047857' },
  [BOOKING_PAYMENT_STATUS.PENDING]: { label: 'Pending', bg: '#fef3c7', text: '#b45309' },
  [BOOKING_PAYMENT_STATUS.FAILED]:  { label: 'Failed',  bg: '#fee2e2', text: '#b91c1c' },
};

function formatDateTime(raw: string): string {
  try {
    return new Date(raw).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return raw;
  }
}

function getSortValue(booking: AdminBooking, field: SortField): string | number {
  switch (field) {
    case 'bookingId':    return booking.bookingId || (booking as any).id || '';
    case 'customer':     return ((booking.customer?.firstName || '') + ' ' + (booking.customer?.lastName || '')).trim().toLowerCase() || booking.customer?.name?.toLowerCase() || '';
    case 'service':      return (booking.service?.name ?? '').toLowerCase();
    case 'technician':   return booking.technician ? ((booking.technician.firstName || '') + ' ' + (booking.technician.lastName || '')).trim().toLowerCase() || (booking.technician.name || '').toLowerCase() : '';
    case 'scheduledAt':  return new Date(booking.scheduledAt).getTime();
    case 'totalAmount':  return parseFloat(booking.totalAmount ?? '0');
    case 'status':       return (booking.status || '').toLowerCase();
    case 'paymentStatus':return (booking.paymentStatus ?? '').toLowerCase();
    default:             return '';
  }
}

function sortBookings(bookings: AdminBooking[], field: SortField, dir: SortDir): AdminBooking[] {
  return [...bookings].sort((a, b) => {
    const av = getSortValue(a, field);
    const bv = getSortValue(b, field);
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });
}

// ─── Column header cell with sort ─────────────────────────────────────────────

interface HeadCellProps {
  field: SortField | null;
  label: string;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
  align?: 'left' | 'right' | 'center';
}

function HeadCell({ field, label, sortField, sortDir, onSort, align = 'left' }: HeadCellProps) {
  if (!field) {
    return (
      <TableCell align={align} sx={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', whiteSpace: 'nowrap' }}>
        {label}
      </TableCell>
    );
  }
  return (
    <TableCell align={align} sx={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', whiteSpace: 'nowrap' }}>
      <div 
        onClick={() => onSort(field)} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {label}
      </div>
    </TableCell>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <TableRow>
      <TableCell colSpan={9} align="center" sx={{ py: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <Typography variant="body2" color="text.secondary">{message}</Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const BookingsTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { bookings, pagination, isLoading, error } = useAppSelector((state) => state.adminBookings);

  const [activeTab, setActiveTab] = useState<BookingTab>('all');
  const [sortField, setSortField] = useState<SortField>('scheduledAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  
  // Backend pagination is 1-indexed, MUI is 0-indexed
  const { page, setPage, rowsPerPage, setRowsPerPage } = useTablePagination('admin_bookings', 0, 10);
  const [assignModalBooking, setAssignModalBooking] = useState<AdminBooking | null>(null);

  useEffect(() => {
    let statusFilter: string | undefined = activeTab.toUpperCase();
    
    if (activeTab === 'all') {
      statusFilter = undefined;
    }

    dispatch(fetchAdminBookings({ page: page + 1, limit: rowsPerPage, status: statusFilter }));
  }, [dispatch, page, rowsPerPage, activeTab]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleTabChange = (tab: BookingTab) => {
    setActiveTab(tab);
    setPage(0); // Reset page on tab change
  };

  const sorted = sortBookings(bookings, sortField, sortDir);
  const totalCount = pagination?.total || 0;

  const headProps = { sortField, sortDir, onSort: handleSort };

  return (
    <>
      <Card sx={{ boxShadow: "0px 0px 1px 1px #eee", border: "1px solid #eeeeee", py: 2, mt: 2 }}>
        {/* Tabs */}
        <Box sx={{ pb: 1 }}>
          <BookingTabs active={activeTab} onChange={handleTabChange} />
        </Box>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <HeadCell field="bookingId"     label="Booking ID"     {...headProps} />
                <HeadCell field="customer"      label="Customer"       {...headProps} />
                <HeadCell field="service"       label="Service"        {...headProps} />
                <HeadCell field="technician"    label="Technician"     {...headProps} />
                <HeadCell field="scheduledAt"   label="Booking Date"   {...headProps} />
                <HeadCell field="totalAmount"   label="Amount"         {...headProps} align="right" />
                <HeadCell field="status"        label="Status"         {...headProps} />
                <HeadCell field={null}          label="Actions"        {...headProps} align="center" />
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Loading */}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 10 }}>
                    <CircularProgress size={32} sx={{ color: '#059669' }} />
                  </TableCell>
                </TableRow>
              )}

              {/* Error */}
              {!isLoading && error && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !error && sorted.length === 0 && (
                <EmptyState message={bookings.length === 0 ? 'No bookings found.' : 'No bookings match this filter.'} />
              )}

              {/* Rows */}
              {!isLoading && !error && sorted.map((booking, index) => {
                const status = STATUS_CHIP[booking.status] ?? { label: booking.status, bg: '#f8fafc', text: '#64748b' };
                const payment = PAYMENT_CHIP[booking.paymentStatus?.toUpperCase?.()] ?? { label: booking.paymentStatus ?? '—', bg: '#f8fafc', text: '#64748b' };
                const needsAssign = booking.technician === null && booking.status !== BOOKING_STATUS.COMPLETED && booking.status !== BOOKING_STATUS.CANCELLED;

                return (
                  <TableRow
                    key={booking.bookingId || (booking as any).id || index}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/admin/bookings/${booking.bookingId || (booking as any).id}`)}
                  >
                    {/* Booking ID */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>
                        B-{booking.bookingId || booking.id}
                      </Typography>
                    </TableCell>

                    {/* Customer */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {((booking.customer?.firstName || '') + ' ' + (booking.customer?.lastName || '')).trim() || booking.customer?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.customer?.phone}
                      </Typography>
                    </TableCell>

                    {/* Service */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Typography variant="body2" noWrap>
                        {booking.service?.name ?? '—'}
                      </Typography>
                    </TableCell>

                    {/* Technician */}
                    <TableCell sx={{ fontSize: 13 }}>
                      {booking.technician ? (
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {((booking.technician.firstName || '') + ' ' + (booking.technician.lastName || '')).trim() || booking.technician.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {booking.technician.phone}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#f59e0b', fontStyle: 'italic' }}>
                          Unassigned
                        </Typography>
                      )}
                    </TableCell>

                    {/* Date */}
                    <TableCell sx={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                      {formatDateTime(booking.scheduledAt)}
                    </TableCell>

                    {/* Amount */}
                    <TableCell align="right" sx={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                      ₹{booking.totalAmount ?? '0'}
                    </TableCell>

                    {/* Status */}
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

                    {/* Actions */}
                    <TableCell align="center" onClick={(e) => e.stopPropagation()} sx={{ width: 100 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        {/* View */}
                        <Tooltip title="View details">
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/admin/bookings/${booking.bookingId || (booking as any).id}`)}
                            sx={{ color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </IconButton>
                        </Tooltip>

                        {/* Assign shortcut for unassigned */}
                        <Tooltip title={needsAssign ? "Assign technician" : ""}>
                          <IconButton
                            size="small"
                            onClick={() => needsAssign && setAssignModalBooking(booking)}
                            sx={{ 
                              color: '#f59e0b', 
                              '&:hover': { backgroundColor: '#fffbeb' },
                              visibility: needsAssign ? 'visible' : 'hidden'
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                              <line x1="19" y1="8" x2="23" y2="8" />
                              <line x1="21" y1="6" x2="21" y2="10" />
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

        {pagination && (
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ borderTop: '1px solid #e2e8f0', fontSize: 13 }}
          />
        )}
      </Card>

      {/* Assign Technician Modal */}
      {assignModalBooking && (
        <AssignTechnicianModal
          open={!!assignModalBooking}
          booking={assignModalBooking}
          onClose={() => setAssignModalBooking(null)}
          onAssign={() => {
            dispatch(fetchAdminBookings({ page: page + 1, limit: rowsPerPage, status: activeTab === 'all' ? undefined : activeTab.toUpperCase() }));
          }}
        />
      )}
    </>
  );
};

export default BookingsTable;
