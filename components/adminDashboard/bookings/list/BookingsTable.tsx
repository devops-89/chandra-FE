'use client';

import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
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
import { useState } from 'react';

import type { AdminBooking } from '@/types/admin/bookings.types';

import BookingDetailsDrawer from '../details/BookingDetailsDrawer';
import ManualAssignmentPanel from './ManualAssignmentPanel';
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

interface Props {
  bookings: AdminBooking[];
  isLoading?: boolean;
  error?: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CHIP: Record<string, { label: string; color: 'warning' | 'info' | 'success' | 'error' | 'default' }> = {
  PENDING:     { label: 'Pending',     color: 'warning' },
  ASSIGNED:    { label: 'Assigned',    color: 'info' },
  IN_PROGRESS: { label: 'In Progress', color: 'info' },
  COMPLETED:   { label: 'Completed',   color: 'success' },
  CANCELLED:   { label: 'Cancelled',   color: 'error' },
};

const PAYMENT_CHIP: Record<string, { label: string; color: 'success' | 'warning' | 'error' | 'default' }> = {
  PAID:    { label: 'Paid',    color: 'success' },
  PENDING: { label: 'Pending', color: 'warning' },
  FAILED:  { label: 'Failed',  color: 'error' },
};

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return raw;
  }
}

function getSortValue(booking: AdminBooking, field: SortField): string | number {
  switch (field) {
    case 'bookingId':    return booking.bookingId;
    case 'customer':     return booking.customer.name.toLowerCase();
    case 'service':      return (booking.service?.name ?? '').toLowerCase();
    case 'technician':   return (booking.technician?.name ?? '').toLowerCase();
    case 'scheduledAt':  return new Date(booking.scheduledAt).getTime();
    case 'totalAmount':  return parseFloat(booking.totalAmount ?? '0');
    case 'status':       return booking.status.toLowerCase();
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

function filterByTab(bookings: AdminBooking[], tab: BookingTab): AdminBooking[] {
  switch (tab) {
    case 'pending':   return bookings.filter((b) => b.status === 'PENDING');
    case 'active':    return bookings.filter((b) => b.status === 'ASSIGNED' || b.status === 'IN_PROGRESS');
    case 'completed': return bookings.filter((b) => b.status === 'COMPLETED');
    case 'manual':    return bookings.filter((b) => b.technician === null);
    default:          return bookings;
  }
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
      <TableSortLabel
        active={sortField === field}
        direction={sortField === field ? sortDir : 'asc'}
        onClick={() => onSort(field)}
      >
        {label}
      </TableSortLabel>
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

const BookingsTable = ({ bookings, isLoading = false, error = null }: Props) => {
  const [activeTab, setActiveTab] = useState<BookingTab>('all');
  const [sortField, setSortField] = useState<SortField>('scheduledAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerBooking, setDrawerBooking] = useState<AdminBooking | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  };

  const handleTabChange = (tab: BookingTab) => {
    setActiveTab(tab);
    setPage(0);
  };

  const tabFiltered = filterByTab(bookings, activeTab);
  const sorted = sortBookings(tabFiltered, sortField, sortDir);
  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const headProps = { sortField, sortDir, onSort: handleSort };

  // Manual assignment tab renders its own panel
  if (activeTab === 'manual') {
    return (
      <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ px: 2, pt: 2 }}>
          <BookingTabs active={activeTab} bookings={bookings} onChange={handleTabChange} />
        </Box>
        <Box sx={{ p: 2 }}>
          <ManualAssignmentPanel bookings={tabFiltered} />
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
        {/* Tabs */}
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <BookingTabs active={activeTab} bookings={bookings} onChange={handleTabChange} />
        </Box>

        <TableContainer>
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
                <HeadCell field="paymentStatus" label="Payment"        {...headProps} />
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

              {/* Empty */}
              {!isLoading && !error && paginated.length === 0 && (
                <EmptyState message={bookings.length === 0 ? 'No bookings found.' : 'No bookings match this filter.'} />
              )}

              {/* Rows */}
              {!isLoading && !error && paginated.map((booking) => {
                const status = STATUS_CHIP[booking.status] ?? { label: booking.status, color: 'default' as const };
                const payment = PAYMENT_CHIP[booking.paymentStatus?.toUpperCase?.()] ?? { label: booking.paymentStatus ?? '—', color: 'default' as const };
                const needsAssign = booking.technician === null;

                return (
                  <TableRow
                    key={booking.bookingId}
                    hover
                    sx={{ '&:last-child td': { borderBottom: 0 }, cursor: 'default' }}
                  >
                    {/* Booking ID */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>
                        #{booking.bookingId}
                      </Typography>
                    </TableCell>

                    {/* Customer */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {booking.customer.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.customer.phone}
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
                            {booking.technician.name}
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
                      {formatDate(booking.scheduledAtIst || booking.scheduledAt)}
                    </TableCell>

                    {/* Amount */}
                    <TableCell align="right" sx={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                      ₹{booking.totalAmount ?? '0'}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 11 }}
                      />
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell>
                      <Chip
                        label={payment.label}
                        color={payment.color}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600, fontSize: 11 }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        {/* View */}
                        <Tooltip title="View details">
                          <IconButton
                            size="small"
                            onClick={() => setDrawerBooking(booking)}
                            sx={{ color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </IconButton>
                        </Tooltip>

                        {/* Assign shortcut for unassigned */}
                        {needsAssign && (
                          <Tooltip title="Assign technician">
                            <IconButton
                              size="small"
                              onClick={() => setDrawerBooking(booking)}
                              sx={{ color: '#f59e0b', '&:hover': { backgroundColor: '#fffbeb' } }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                                <line x1="19" y1="8" x2="23" y2="8" />
                                <line x1="21" y1="6" x2="21" y2="10" />
                              </svg>
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {!isLoading && !error && tabFiltered.length > 0 && (
          <TablePagination
            component="div"
            count={tabFiltered.length}
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
      </Paper>

      {/* Details drawer */}
      {drawerBooking && (
        <BookingDetailsDrawer
          open
          booking={drawerBooking}
          onClose={() => setDrawerBooking(null)}
        />
      )}
    </>
  );
};

export default BookingsTable;
