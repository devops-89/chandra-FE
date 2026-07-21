'use client';

import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DeleteServiceModal from '@/components/adminDashboard/services/manageService/DeleteServiceModal';
import { useServiceManager } from '@/hooks/useServiceManager';
import type { AdminService } from '@/types/admin/service.types';

// Inline SVG data URI — no network request, never 404s
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='8' fill='%23e2e8f0'/%3E%3Cpath d='M16 30 Q24 18 32 30' stroke='%2394a3b8' stroke-width='2' fill='none'/%3E%3Ccircle cx='20' cy='22' r='3' fill='%2394a3b8'/%3E%3C/svg%3E";

// ─── Types & Sorting helpers ──────────────────────────────────────────────────

type SortField = 'name' | 'price' | 'status' | 'bookings';
type SortDir = 'asc' | 'desc';

function getSortValue(service: AdminService, field: SortField): string | number {
  switch (field) {
    case 'name':     return service.name.toLowerCase();
    case 'price':    return service.price;
    case 'status':   return service.status.toLowerCase();
    case 'bookings': return service.bookings;
    default:         return '';
  }
}

function sortServices(
  services: AdminService[],
  field: SortField,
  dir: SortDir,
): AdminService[] {
  return [...services].sort((a, b) => {
    const av = getSortValue(a, field);
    const bv = getSortValue(b, field);
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });
}

// ─── Head cell with sort ──────────────────────────────────────────────────────

interface HeadCellProps {
  field: SortField | null;
  label: string;
  onSort: (field: SortField) => void;
  align?: 'left' | 'right' | 'center';
}

function HeadCell({
  field,
  label,
  onSort,
  align = 'left',
}: HeadCellProps) {
  if (!field) {
    return (
      <TableCell
        align={align}
        sx={{
          fontWeight: 700,
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#64748b',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </TableCell>
    );
  }
  return (
    <TableCell
      align={align}
      sx={{
        fontWeight: 700,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#64748b',
        whiteSpace: 'nowrap',
      }}
    >
      <div 
        onClick={() => onSort(field)} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {label}
      </div>
    </TableCell>
  );
}

const ServicesTable = () => {
  const router = useRouter();
  const {
    services,
    deleteTarget, openDelete, closeDelete, confirmDelete,
  } = useServiceManager();

  // Sorting & Pagination state
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  };

  const sorted = sortServices(services, sortField, sortDir);
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const headProps = { onSort: handleSort };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}
      >
        <TableContainer>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <HeadCell field={null}       label="Image"      {...headProps} />
                <HeadCell field="name"       label="Service"    {...headProps} />
                <HeadCell field="price"      label="Price"      {...headProps} />
                <HeadCell field="status"     label="Status"     {...headProps} />
                <HeadCell field="bookings"   label="Bookings"   {...headProps} />
                <HeadCell field={null}       label="Actions"    {...headProps} />
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                    <Typography variant="body2" color="text.secondary">
                      No services found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((service) => (
                  <TableRow
                    key={service.id}
                    hover
                    sx={{
                      '&:last-child td': { borderBottom: 0 },
                      cursor: 'default',
                    }}
                  >
                    {/* Image */}
                    <TableCell>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        width={48}
                        height={48}
                        src={service.image || PLACEHOLDER}
                        alt={service.name}
                        className="h-12 w-12 rounded-lg object-cover bg-slate-100"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.onerror = null;
                          img.src = PLACEHOLDER;
                        }}
                      />
                    </TableCell>

                    {/* Service Name */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                      {service.name}
                    </TableCell>

                    {/* Price */}
                    <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                      ₹{service.price}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label={service.status}
                        color={service.status === 'Active' ? 'success' : 'default'}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          backgroundColor: service.status === 'Active' ? '#d1fae5' : '#f1f5f9',
                          color: service.status === 'Active' ? '#065f46' : '#475569',
                        }}
                      />
                    </TableCell>

                    {/* Bookings */}
                    <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                      {service.bookings}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={() => router.push(`/admin/services/${service.id}`)}
                          sx={{ color: '#64748b', '&:hover': { bgcolor: 'rgba(100, 116, 139, 0.1)' } }}
                          title="View Details"
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          onClick={() => router.push(`/admin/services/edit/${service.id}`)}
                          sx={{ color: '#0ea5e9', '&:hover': { bgcolor: 'rgba(14, 165, 233, 0.1)' } }}
                          title="Edit Service"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          onClick={() => openDelete(service)}
                          sx={{ color: '#ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {services.length > 0 && (
          <TablePagination
            component="div"
            count={services.length}
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

      {/* Delete confirmation modal */}
      <DeleteServiceModal
        service={deleteTarget}
        onClose={closeDelete}
        onDelete={confirmDelete}
      />
    </>
  );
};

export default ServicesTable;
