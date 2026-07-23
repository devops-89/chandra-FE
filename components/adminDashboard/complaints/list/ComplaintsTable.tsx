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
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteAdminComplaint, fetchAdminComplaints, resolveAdminComplaint } from '@/redux/slices/adminComplaintSlice';
import type { AdminComplaintListItem } from '@/types/admin/complaints.types';
import { AdminControllers } from '@/api/adminControllers';

// ─── Types & Sorting helpers ──────────────────────────────────────────────────

type SortField = 'id' | 'customer' | 'title' | 'createdAt' | 'status';
type SortDir = 'asc' | 'desc';

function getSortValue(complaint: AdminComplaintListItem, field: SortField): string | number {
  switch (field) {
    case 'id':        return complaint.id;
    case 'customer':  return `${complaint.createdBy?.firstName || ''} ${complaint.createdBy?.lastName || ''}`.trim().toLowerCase();
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

// ─── Head cell with sort ──────────────────────────────────────────────────────

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
      <div 
        onClick={() => onSort(field)} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {label}
      </div>
    </TableCell>
  );
}

// ─── Status Dropdown and Tabs ──────────────────────────────────────────────

const STATUS_CHIP: Record<
  string,
  { label: string; backgroundColor: string; color: string }
> = {
  PENDING:     { label: 'Pending',     backgroundColor: '#fef3c7', color: '#d97706' },
  RESOLVED:    { label: 'Resolved',    backgroundColor: '#d1fae5', color: '#065f46' },
  REJECTED:    { label: 'Rejected',    backgroundColor: '#fee2e2', color: '#b91c1c' },
};

function StatusDropdown({
  currentStatus,
  onStatusChange,
}: {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmStatus, setConfirmStatus] = useState<null | string>(null);
  
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e?: any) => {
    e?.stopPropagation?.();
    setAnchorEl(null);
  };

  const handleSelect = (e: React.MouseEvent, status: string) => {
    e.stopPropagation();
    handleClose();
    setConfirmStatus(status);
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmStatus) {
      onStatusChange(confirmStatus);
    }
    setConfirmStatus(null);
  };

  const handleCancelConfirm = (e?: any) => {
    e?.stopPropagation?.();
    setConfirmStatus(null);
  };

  const statusObj = STATUS_CHIP[currentStatus] ?? { label: currentStatus, backgroundColor: '#f8fafc', color: '#64748b' };
  
  if (currentStatus === 'RESOLVED') {
    return (
      <Chip
        label={statusObj.label}
        size="small"
        sx={{
          fontWeight: 700, 
          fontSize: 11,
          bgcolor: statusObj.backgroundColor,
          color: statusObj.color,
          border: 'none',
          borderRadius: '6px',
        }}
      />
    );
  }

  const availableStatuses = currentStatus === 'PENDING' ? ['RESOLVED'] : [];

  return (
    <>
      <Chip
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {statusObj.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Box>
        }
        size="small"
        onClick={handleOpen}
        sx={{
          fontWeight: 700, 
          fontSize: 11,
          bgcolor: statusObj.backgroundColor,
          color: statusObj.color,
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
          },
          '& .MuiList-root': { p: 1 }
        }}
      >
        {availableStatuses.map((s) => {
           const sObj = STATUS_CHIP[s];
           return (
             <MenuItem key={s} onClick={(e) => handleSelect(e, s)} sx={{ fontSize: 13, borderRadius: 1, mb: 0.5 }}>
               {sObj.label}
             </MenuItem>
           );
        })}
      </Menu>

      <Dialog 
        open={Boolean(confirmStatus)} 
        onClose={handleCancelConfirm}
        onClick={(e) => e.stopPropagation()}
        sx={{ '& .MuiDialog-paper': { borderRadius: '12px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change this complaint's status to <strong>{confirmStatus ? STATUS_CHIP[confirmStatus].label : ''}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConfirm} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' }, textTransform: 'none', fontWeight: 600, borderRadius: '8px', boxShadow: 'none' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const STATUS_TABS = [
  { id: 'All Status', label: 'All' },
  { id: 'PENDING', label: 'Pending' },
  { id: 'RESOLVED', label: 'Resolved' },
];

function TabsBar({ statusFilter, onChange }: { statusFilter: string; onChange: (val: string) => void }) {
  return (
    <Tabs
      value={statusFilter}
      onChange={(_, newValue) => onChange(newValue)}
      sx={{
        minHeight: 48,
        '& .MuiTabs-indicator': {
          backgroundColor: '#059669',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
        borderBottom: '1px solid #e2e8f0',
        mb: 2,
        px: 2,
      }}
    >
      {STATUS_TABS.map((tab) => (
        <Tab
          key={tab.id}
          value={tab.id}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: statusFilter === tab.id ? 700 : 500 }}
              >
                {tab.label}
              </Typography>
            </Box>
          }
          sx={{
            textTransform: 'none',
            minWidth: 'auto',
            px: 3,
            color: '#64748b',
            '&.Mui-selected': { color: '#059669' },
          }}
        />
      ))}
    </Tabs>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ComplaintsTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { complaints, isLoading, error } = useAppSelector(
    (state) => state.adminComplaint
  );

  // Sorting & Pagination state
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Modal state
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminComplaints(statusFilter));
  }, [dispatch, statusFilter]);

  const handleTabChange = (val: string) => {
    setStatusFilter(val);
    setPage(0);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await dispatch(deleteAdminComplaint(deleteConfirmId)).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleViewDetails = async (id: number) => {
    try {
      setIsFetchingDetails(true);
      const details = await AdminControllers.getAdminComplaintById(id);
      // Fallback to the list item if API fails or doesn't return data as expected, but usually details is correct
      setSelectedComplaint(details || complaints.find(c => c.id === id));
    } catch (error) {
      console.error('Failed to fetch complaint details', error);
      // Fallback
      setSelectedComplaint(complaints.find(c => c.id === id) || null);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleChangeStatus = async (id: number, status: string) => {
    try {
      await dispatch(resolveAdminComplaint({ id, status: status as any })).unwrap();
    } catch (error) {
      console.error('Failed to change status:', error);
    }
  };

  // The API already filters the list, so we can just use complaints directly
  const filteredComplaints = complaints;

  const sorted = sortComplaints(filteredComplaints, sortField, sortDir);
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const headProps = { sortField, sortDir, onSort: handleSort };

  return (
    <>
      <TabsBar statusFilter={statusFilter} onChange={handleTabChange} />

      <Paper
        elevation={0}
        sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}
      >
        <TableContainer>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <HeadCell field="id"        label="Complaint ID" {...headProps} />
                <HeadCell field="customer"  label="Name"         {...headProps} />
                <HeadCell field={null}      label="Role"         {...headProps} />
                <HeadCell field="title"     label="Issue"        {...headProps} />
                <HeadCell field="createdAt" label="Created On"   {...headProps} />
                <HeadCell field="status"    label="Status"       {...headProps} />
                <HeadCell field={null}      label="Actions"      {...headProps} align="center" />
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />
                      <span className="text-sm text-slate-500 font-medium">Loading complaints...</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && error && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !error && filteredComplaints.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </svg>
                      <Typography variant="body2" color="text.secondary">
                        {complaints.length === 0 ? 'No complaints found.' : 'No complaints match this filter.'}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !error && paginated.map((complaint) => {
                const customerName = `${complaint.createdBy?.firstName || ''} ${complaint.createdBy?.lastName || ''}`.trim() || 'Unknown';
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

                    {/* Customer Name Avatar format */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {customerName}
                      </Typography>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <Chip 
                        label={complaint.createdBy?.role || 'UNKNOWN'} 
                        size="small" 
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: 11, 
                          bgcolor: complaint.createdBy?.role === 'CUSTOMER' ? '#e0f2fe' : complaint.createdBy?.role === 'TECHNICIAN' ? '#f3e8ff' : '#f1f5f9', 
                          color: complaint.createdBy?.role === 'CUSTOMER' ? '#0369a1' : complaint.createdBy?.role === 'TECHNICIAN' ? '#6b21a8' : '#64748b',
                          borderRadius: '6px'
                        }} 
                      />
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

                    {/* Status Dropdown */}
                    <TableCell>
                      <StatusDropdown 
                        currentStatus={complaint.status} 
                        onStatusChange={(newStatus) => handleChangeStatus(complaint.id, newStatus)} 
                      />
                    </TableCell>

                    {/* Actions with IconButtons */}
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(complaint.id)}
                            disabled={isFetchingDetails}
                            sx={{ color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
                          >
                            {isFetchingDetails && selectedComplaint?.id === complaint.id ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="2" x2="12" y2="6"></line>
                                  <line x1="12" y1="18" x2="12" y2="22"></line>
                                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                  <line x1="2" y1="12" x2="6" y2="12"></line>
                                  <line x1="18" y1="12" x2="22" y2="12"></line>
                                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                </svg>
                              </Box>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            )}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Complaint">
                          <IconButton
                            size="small"
                            onClick={() => setDeleteConfirmId(complaint.id)}
                            sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fef2f2' } }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
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

        {/* Pagination */}
        {!isLoading && !error && filteredComplaints.length > 0 && (
          <TablePagination
            component="div"
            count={filteredComplaints.length}
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

      {/* Details Modal */}
      <Dialog
        open={Boolean(selectedComplaint)}
        onClose={() => setSelectedComplaint(null)}
        maxWidth="sm"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px', p: 1 } }}
      >
        {selectedComplaint && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a' }}>
                Complaint Details
              </Typography>
              <IconButton onClick={() => setSelectedComplaint(null)} size="small" sx={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: '#e2e8f0', py: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                {/* Header Info */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', mb: 0.5 }}>
                      Complaint #{selectedComplaint.id}
                    </Typography>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                      {selectedComplaint.title}
                    </Typography>
                  </Box>
                  <Chip
                    label={STATUS_CHIP[selectedComplaint.status]?.label || selectedComplaint.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: 11,
                      bgcolor: STATUS_CHIP[selectedComplaint.status]?.backgroundColor || '#f8fafc',
                      color: STATUS_CHIP[selectedComplaint.status]?.color || '#64748b',
                      borderRadius: '6px',
                    }}
                  />
                </Box>

                {/* Description */}
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', mb: 1 }}>
                    DESCRIPTION
                  </Typography>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #f1f5f9' }}>
                    <Typography sx={{ fontSize: '0.95rem', color: '#334155', whiteSpace: 'pre-wrap' }}>
                      {selectedComplaint.description}
                    </Typography>
                  </Paper>
                </Box>

                <Divider />

                {/* Meta Info Grid */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                      RAISED BY
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                      {(() => {
                        const creator = selectedComplaint.createdByUser || (typeof selectedComplaint.createdBy === 'object' ? selectedComplaint.createdBy : null);
                        return creator ? `${creator.firstName || ''} ${creator.lastName || ''}`.trim() || 'Unknown' : 'Unknown';
                      })()}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Role: {selectedComplaint.createdByRole || selectedComplaint.createdByUser?.role || selectedComplaint.createdBy?.role || 'N/A'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                      BOOKING
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                      #{selectedComplaint.booking?.id || 'N/A'}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Status: {selectedComplaint.booking?.status || 'N/A'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                      CREATED AT
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', color: '#1e293b' }}>
                      {new Date(selectedComplaint.createdAt).toLocaleString()}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                      UPDATED AT
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', color: '#1e293b' }}>
                      {new Date(selectedComplaint.updatedAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                onClick={() => setSelectedComplaint(null)} 
                variant="contained" 
                sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' }, textTransform: 'none', fontWeight: 600, borderRadius: '8px', boxShadow: 'none' }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        maxWidth="xs"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Confirm Deletion</DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#e2e8f0', py: 3 }}>
          <DialogContentText sx={{ color: '#475569' }}>
            Are you sure you want to permanently delete this complaint? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmId(null)} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" sx={{ bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' }, textTransform: 'none', fontWeight: 600, borderRadius: '8px', boxShadow: 'none' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ComplaintsTable;
