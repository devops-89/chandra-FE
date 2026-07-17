'use client';

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteAdminComplaint, fetchAdminComplaints } from '@/redux/slices/adminComplaintSlice';
import type { AdminComplaintListItem } from '@/types/admin/complaints.types';

// â”€â”€â”€ Types & Sorting helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type SortField = 'id' | 'customer' | 'title' | 'createdAt' | 'status';
type SortDir = 'asc' | 'desc';

function getSortValue(complaint: AdminComplaintListItem, field: SortField): string | number {
  switch (field) {
    case 'id':        return complaint.id;
    case 'customer':  return complaint.createdBy.name.toLowerCase();
    case 'title':     return complaint.title.toLowerCase();
    case 'createdAt': return complaint.createdAt;
    case 'status':    return complaint.status.toLowerCase();
    default:          return '';
  }
}

function sortComplaints(
  complaints: AdminComplaintListItem[],
  field: SortField,
  dir: SortDir,
): AdminComplaintListItem[] {
  return [...complaints].sort((a, b) => {
    const av = getSortValue(a, field);
    const bv = getSortValue(b, field);
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });
}

// â”€â”€â”€ Head cell with sort â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface HeadCellProps {
  field: SortField | null;
  label: string;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
  align?: 'left' | 'right' | 'center';
}

function HeadCell({
  field,
  label,
  sortField,
  sortDir,
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

// â”€â”€â”€ Status Chip config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STATUS_CHIP: Record<
  string,
  { label: string; backgroundColor: string; color: string }
> = {
  PENDING:     { label: 'Pending',     backgroundColor: '#fef3c7', color: '#d97706' },
  IN_PROGRESS: { label: 'In Progress', backgroundColor: '#e0f2fe', color: '#0369a1' },
  RESOLVED:    { label: 'Resolved',    backgroundColor: '#d1fae5', color: '#065f46' },
  REJECTED:    { label: 'Rejected',    backgroundColor: '#fee2e2', color: '#b91c1c' },
};

const ComplaintsTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { complaints, isLoading, error } = useAppSelector(
    (state) => state.adminComplaint
  );

  // Sorting & Pagination state
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchAdminComplaints());
  }, [dispatch]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteAdminComplaint(id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center flex items-center justify-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />
        <span className="text-sm text-slate-500 font-medium">Loading complaints...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 font-medium">
        No complaints found.
      </div>
    );
  }

  const sorted = sortComplaints(complaints, sortField, sortDir);
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const headProps = { sortField, sortDir, onSort: handleSort };

  return (
    <Paper
      elevation={0}
      sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}
    >
      <TableContainer>
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <HeadCell field="id"        label="Complaint ID" {...headProps} />
              <HeadCell field="customer"  label="Customer"     {...headProps} />
              <HeadCell field="title"     label="Issue"        {...headProps} />
              <HeadCell field="createdAt" label="Created On"   {...headProps} />
              <HeadCell field="status"    label="Status"       {...headProps} />
              <HeadCell field={null}      label="Actions"      {...headProps} />
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((complaint) => {
              const statusConfig = STATUS_CHIP[complaint.status] ?? {
                label: complaint.status,
                backgroundColor: '#f1f5f9',
                color: '#475569',
              };

              return (
                <TableRow
                  key={complaint.id}
                  hover
                  sx={{
                    '&:last-child td': { borderBottom: 0 },
                    cursor: 'default',
                  }}
                >
                  {/* Complaint ID */}
                  <TableCell sx={{ fontSize: 13, fontWeight: 700, color: '#ef4444' }}>
                    #{complaint.id}
                  </TableCell>

                  {/* Customer Name */}
                  <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                    {complaint.createdBy?.name || 'â€”'}
                  </TableCell>

                  {/* Title (Issue) */}
                  <TableCell sx={{ fontSize: 13, color: '#475569', maxWidth: 300 }}>
                    <Typography variant="body2" noWrap sx={{ fontSize: 13 }}>
                      {complaint.title}
                    </Typography>
                  </TableCell>

                  {/* Created On */}
                  <TableCell sx={{ fontSize: 13, color: '#475569', whiteSpace: 'nowrap' }}>
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={statusConfig.label}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: 11,
                        backgroundColor: statusConfig.backgroundColor,
                        color: statusConfig.color,
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <button
                        type="button"
                        onClick={() => router.push(`/admin/complaints/${complaint.id}`)}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(complaint.id)}
                        className="text-red-600 hover:text-red-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {complaints.length > 0 && (
        <TablePagination
          component="div"
          count={complaints.length}
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
  );
};

export default ComplaintsTable;
