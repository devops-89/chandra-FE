'use client';

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import type { Technician } from '@/constants/admin/technicianData';

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField =
  | 'name'
  | 'city'
  | 'experience'
  | 'skills'
  | 'status'
  | 'email'
  | 'phone'
  | 'appliedAt';

type SortDir = 'asc' | 'desc';

type StatusTab = 'All Status' | 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED';

interface TabConfig {
  id: StatusTab;
  label: string;
  dotColor: string;
}

interface Props {
  technicians: Technician[];
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  actionLoading?: Record<string, boolean>;
  onChangeStatus?: (id: string, newStatus: string) => void;
  onViewDetails?: (technician: Technician) => void;
  isLoading?: boolean;
  error?: string | null;
}

const STATUS_CHIP: Record<string, { label: string; bg: string; text: string }> = {
  APPROVED:         { label: 'Approved',         bg: '#d1fae5', text: '#047857' },
  PENDING_APPROVAL: { label: 'Pending Approval', bg: '#fef3c7', text: '#b45309' },
  REJECTED:         { label: 'Rejected',          bg: '#fee2e2', text: '#b91c1c' },
  NO_PROFILE:       { label: 'No Profile',        bg: '#f8fafc', text: '#64748b' },
};

function StatusDropdown({
  currentStatus,
  onStatusChange,
  disabled
}: {
  currentStatus: string;
  onStatusChange: (newStatus: 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED') => void;
  disabled: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmStatus, setConfirmStatus] = useState<null | 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED'>(null);
  
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!disabled && currentStatus !== 'NO_PROFILE') setAnchorEl(e.currentTarget);
  };
  const handleClose = (e?: React.MouseEvent | Event | React.SyntheticEvent) => {
    e?.stopPropagation?.();
    setAnchorEl(null);
  };

  const handleSelect = (e: React.MouseEvent, status: 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED') => {
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

  const handleCancelConfirm = (e?: React.MouseEvent | Event | React.SyntheticEvent) => {
    e?.stopPropagation?.();
    setConfirmStatus(null);
  };

  const statusObj = STATUS_CHIP[currentStatus] ?? { label: currentStatus, bg: '#f8fafc', text: '#64748b' };
  
  const availableStatuses = currentStatus === 'REJECTED' 
    ? ['APPROVED'] 
    : currentStatus === 'APPROVED' 
      ? ['REJECTED']
      : ['APPROVED', 'PENDING_APPROVAL', 'REJECTED'];

  return (
    <>
      <Chip
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {statusObj.label}
            {!disabled && currentStatus !== 'NO_PROFILE' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
          </Box>
        }
        size="small"
        onClick={handleOpen}
        sx={{
          fontWeight: 700, 
          fontSize: 11,
          bgcolor: statusObj.bg,
          color: statusObj.text,
          border: 'none',
          borderRadius: '6px',
          cursor: disabled || currentStatus === 'NO_PROFILE' ? 'default' : 'pointer',
          '&:hover': { bgcolor: disabled || currentStatus === 'NO_PROFILE' ? statusObj.bg : undefined }
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
          },
          '& .MuiList-root': { p: 1 }
        }}
      >
        {availableStatuses.map((s) => {
           if (s === currentStatus) return null;
           const sObj = STATUS_CHIP[s];
           return (
             <MenuItem key={s} onClick={(e) => handleSelect(e, s as 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED')} sx={{ fontSize: 13, borderRadius: 1, mb: 0.5 }}>
               {sObj.label}
             </MenuItem>
           );
        })}
      </Menu>

      <Dialog 
        open={Boolean(confirmStatus)} 
        onClose={() => handleCancelConfirm()}
        onClick={(e) => e.stopPropagation()}
        sx={{ '& .MuiDialog-paper': { borderRadius: '12px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the technician&apos;s status to <strong>{confirmStatus ? STATUS_CHIP[confirmStatus].label : ''}</strong>?
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

// ─── Tab definitions ──────────────────────────────────────────────────────────

const STATUS_TABS: TabConfig[] = [
  { id: 'All Status',       label: 'All',             dotColor: '#059669' },
  { id: 'APPROVED',         label: 'Approved',        dotColor: '#4ade80' },
  { id: 'PENDING_APPROVAL', label: 'Pending Approval', dotColor: '#facc15' },
  { id: 'REJECTED',         label: 'Rejected',        dotColor: '#f87171' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSortValue(tech: Technician, field: SortField): string | number {
  switch (field) {
    case 'name':      return tech.name.toLowerCase();
    case 'city':      return tech.city.toLowerCase();
    case 'experience':return tech.experience;
    case 'skills':    return tech.skills.join(', ').toLowerCase();
    case 'status':    return tech.status.toLowerCase();
    case 'email':     return tech.email.toLowerCase();
    case 'phone':     return tech.phone.toLowerCase();
    case 'appliedAt': return tech.appliedAt;
    default:          return '';
  }
}

function sortTechnicians(
  technicians: Technician[],
  field: SortField,
  dir: SortDir,
): Technician[] {
  return [...technicians].sort((a, b) => {
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

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <TableRow>
      <TableCell colSpan={8} align="center" sx={{ py: 10 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

interface TabsBarProps {
  statusFilter: string;
  onChange: (val: StatusTab) => void;
}

function TabsBar({
  statusFilter,
  onChange,
}: TabsBarProps) {

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

// ─── Main component ───────────────────────────────────────────────────────────

const TechniciansTable = ({
  technicians,
  statusFilter,
  setStatusFilter,
  actionLoading,
  onChangeStatus,
  onViewDetails,
  isLoading = false,
  error = null,
}: Props) => {
  const [sortField, setSortField] = useState<SortField>('appliedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
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

  const handleTabChange = (val: StatusTab) => {
    setStatusFilter(val);
    setPage(0);
  };

  const sorted = sortTechnicians(technicians, sortField, sortDir);
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const headProps = { onSort: handleSort };

  return (
    <>
      <TabsBar
        statusFilter={statusFilter}
        onChange={handleTabChange}
      />

      <Paper
        elevation={0}
        sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}
      >

      <TableContainer>
        <Table size="small" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <HeadCell field="name"       label="Technician"   {...headProps} />
              <HeadCell field="city"       label="City"         {...headProps} />
              <HeadCell field="experience" label="Experience"   {...headProps} align="right" />
              <HeadCell field="skills"     label="Skills"       {...headProps} />
              <HeadCell field="status"     label="Status"       {...headProps} />
              <HeadCell field="phone"      label="Phone"        {...headProps} />
              <HeadCell field="appliedAt"  label="Applied At"   {...headProps} />
              <HeadCell field={null}       label="Actions"      {...headProps} align="center" />
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 10 }}>
                  <CircularProgress size={32} sx={{ color: '#059669' }} />
                </TableCell>
              </TableRow>
            )}

            {/* Error */}
            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!isLoading && !error && paginated.length === 0 && (
              <EmptyState
                message={
                  technicians.length === 0
                    ? 'No technicians found.'
                    : 'No technicians match this filter.'
                }
              />
            )}

            {/* Rows */}
            {!isLoading &&
              !error &&
              paginated.map((tech) => {

                const isActionBusy = Boolean(actionLoading?.[tech.id]);
                const canUpdateStatus = tech.profileUserId !== null;
                const isPending = tech.status === 'PENDING_APPROVAL';


                return (
                  <TableRow
                    key={tech.id}
                    hover
                    sx={{
                      '&:last-child td': { borderBottom: 0 },
                      cursor: 'default',
                    }}
                  >
                    {/* Technician name + email */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            backgroundColor: '#d1fae5',
                            color: '#065f46',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 14,
                            flexShrink: 0,
                          }}
                        >
                          {tech.name[0]?.toUpperCase()}
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: '#1e293b' }}
                          >
                            {tech.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {tech.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* City */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Typography variant="body2">{tech.city}</Typography>
                    </TableCell>

                    {/* Experience */}
                    <TableCell align="right" sx={{ fontSize: 13, fontWeight: 600 }}>
                      {tech.experience} Yrs
                    </TableCell>

                    {/* Skills */}
                    <TableCell sx={{ fontSize: 13 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {tech.skills.length > 0 ? (
                          tech.skills.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{
                                fontSize: 11,
                                height: 20,
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                              }}
                            />
                          ))
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            —
                          </Typography>
                        )}
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusDropdown 
                        currentStatus={tech.status} 
                        disabled={isActionBusy || !canUpdateStatus}
                        onStatusChange={(newStatus) => onChangeStatus?.(tech.id, newStatus)}
                      />
                    </TableCell>

                    {/* Phone */}
                    <TableCell sx={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                      {tech.phone || '—'}
                    </TableCell>

                    {/* Applied At */}
                    <TableCell sx={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                      {tech.appliedAt || '—'}
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 0.5,
                        }}
                      >
                        {/* View profile */}
                        <Tooltip title={isPending ? 'Review Application' : 'View Profile'}>
                          <IconButton
                            size="small"
                            onClick={() => onViewDetails?.(tech)}
                            sx={{
                              color: '#059669',
                              '&:hover': { backgroundColor: '#f0fdf4' },
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
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

      {/* Pagination */}
      {!isLoading && !error && technicians.length > 0 && (
        <TablePagination
          component="div"
          count={technicians.length}
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
    </>
  );
};

export default TechniciansTable;
