'use client';

import {
  Avatar,
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
import { Eye, RefreshCw, UserCheck } from 'lucide-react';
import { useState } from 'react';

import type { Technician } from '@/constants/admin/technicianData';

import AdminBreadcrumbTabs from '../../shared/AdminBreadcrumbTabs';

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusTab = 'All Status' | 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED';
type SortField = 'name' | 'city' | 'experience' | 'rating' | 'status' | 'appliedAt';
type SortDir = 'asc' | 'desc';

interface TabConfig {
  id: StatusTab;
  label: string;
  dotColor: string;
}

interface Props {
  technicians: Technician[];
  allTechnicians: Technician[];
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  actionLoading?: Record<string, boolean>;
  onToggleSuspend: (id: string) => void;
  onViewDetails?: (technician: Technician) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_TABS: TabConfig[] = [
  { id: 'All Status',      label: 'All',             dotColor: '#059669' },
  { id: 'APPROVED',        label: 'APPROVED',        dotColor: '#4ade80' },
  { id: 'PENDING_APPROVAL',label: 'PENDING_APPROVAL',dotColor: '#facc15' },
  { id: 'REJECTED',        label: 'REJECTED',        dotColor: '#f87171' },
];

const STATUS_CHIP: Record<string, { label: string; color: 'success' | 'warning' | 'error' | 'default' }> = {
  APPROVED:        { label: 'Approved',        color: 'success' },
  PENDING_APPROVAL:{ label: 'Pending Approval',color: 'warning' },
  REJECTED:        { label: 'Rejected',        color: 'error'   },
  NO_PROFILE:      { label: 'No Profile',      color: 'default' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSortValue(t: Technician, field: SortField): string | number {
  switch (field) {
    case 'name':       return t.name.toLowerCase();
    case 'city':       return t.city.toLowerCase();
    case 'experience': return t.experience;
    case 'rating':     return t.rating;
    case 'status':     return t.status.toLowerCase();
    case 'appliedAt':  return t.appliedAt;
    default:           return '';
  }
}

function sortTechnicians(list: Technician[], field: SortField, dir: SortDir): Technician[] {
  return [...list].sort((a, b) => {
    const av = getSortValue(a, field);
    const bv = getSortValue(b, field);
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

// ─── Head cell ────────────────────────────────────────────────────────────────

interface HeadCellProps {
  field: SortField | null;
  label: string;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (f: SortField) => void;
  align?: 'left' | 'right' | 'center';
}

function HeadCell({ field, label, sortField, sortDir, onSort, align = 'left' }: HeadCellProps) {
  const sx = { fontWeight: 700, fontSize: 12, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#64748b', whiteSpace: 'nowrap' as const };
  if (!field) return <TableCell align={align} sx={sx}>{label}</TableCell>;
  return (
    <TableCell align={align} sx={sx}>
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

// ─── Main component ───────────────────────────────────────────────────────────

const TechniciansTable = ({
  technicians,
  allTechnicians,
  approvedCount,
  pendingCount,
  rejectedCount,
  statusFilter,
  setStatusFilter,
  actionLoading = {},
  onToggleSuspend,
  onViewDetails,
}: Props) => {
  const [sortField, setSortField] = useState<SortField>('appliedAt');
  const [sortDir,   setSortDir]   = useState<SortDir>('desc');
  const [page,      setPage]      = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
    setPage(0);
  };

  const handleTabChange = (id: StatusTab) => {
    setStatusFilter(id);
    setPage(0);
  };

  const getCount = (id: StatusTab) => {
    if (id === 'All Status')       return allTechnicians.length;
    if (id === 'APPROVED')         return approvedCount;
    if (id === 'PENDING_APPROVAL') return pendingCount;
    if (id === 'REJECTED')         return rejectedCount;
    return 0;
  };

  const sorted    = sortTechnicians(technicians, sortField, sortDir);
  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const headProps = { sortField, sortDir, onSort: handleSort };

  return (
    <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>

      {/* ── Header ── */}
      <Box sx={{ px: 3, pt: 3, pb: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
            Current Technicians
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total of{' '}
            <Box component="span" sx={{ color: '#059669', fontWeight: 600 }}>
              {technicians.length} technician
            </Box>{' '}
            records found
          </Typography>
        </Box>

        {/* ── Shared breadcrumb status filter ── */}
        <AdminBreadcrumbTabs
          tabs={STATUS_TABS.map((tab) => ({
            id: tab.id,
            label: tab.label,
            count: getCount(tab.id),
            dotColor: tab.dotColor,
          }))}
          active={statusFilter}
          onChange={(id) => handleTabChange(id as StatusTab)}
        />
      </Box>

      {/* ── Table ── */}
      <TableContainer>
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <HeadCell field="name"       label="Technician"  {...headProps} />
              <HeadCell field="city"       label="City"        {...headProps} />
              <HeadCell field="experience" label="Experience"  {...headProps} align="center" />
              <HeadCell field={null}       label="Skills"      {...headProps} />
              <HeadCell field="rating"     label="Rating"      {...headProps} align="center" />
              <HeadCell field="status"     label="Status"      {...headProps} />
              <HeadCell field="appliedAt"  label="Applied"     {...headProps} />
              <HeadCell field={null}       label="Actions"     {...headProps} align="center" />
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 10 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <Typography variant="body2" color="text.secondary">No technicians match this filter.</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((tech) => {
                const isLoading = Boolean(actionLoading[tech.id]);
                const isPending = tech.status === 'PENDING_APPROVAL';
                const isRejected = tech.status === 'REJECTED';
                const canUpdate = tech.profileUserId !== null;
                const chipConfig = STATUS_CHIP[tech.status] ?? { label: tech.status, color: 'default' as const };

                return (
                  <TableRow key={tech.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>

                    {/* Technician name + avatar */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#059669', fontSize: 13, fontWeight: 700 }}>
                          {initials(tech.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            {tech.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {tech.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* City */}
                    <TableCell>
                      <Typography variant="body2">{tech.city}</Typography>
                    </TableCell>

                    {/* Experience */}
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {tech.experience} yr{tech.experience !== 1 ? 's' : ''}
                      </Typography>
                    </TableCell>

                    {/* Skills */}
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {tech.skills.length > 0
                          ? tech.skills.slice(0, 3).map((s) => (
                              <Chip key={s} label={s} size="small" sx={{ fontSize: 11, height: 22 }} />
                            ))
                          : <Typography variant="caption" color="text.disabled">—</Typography>
                        }
                        {tech.skills.length > 3 && (
                          <Chip label={`+${tech.skills.length - 3}`} size="small" sx={{ fontSize: 11, height: 22, bgcolor: '#f1f5f9' }} />
                        )}
                      </Box>
                    </TableCell>

                    {/* Rating */}
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {tech.rating > 0 ? `⭐ ${tech.rating.toFixed(1)}` : '—'}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label={chipConfig.label}
                        color={chipConfig.color}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 11 }}
                      />
                    </TableCell>

                    {/* Applied date */}
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {tech.appliedAt || '—'}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        {/* View / Review */}
                        <Tooltip title={isPending ? 'Review Application' : 'View Profile'}>
                          <IconButton
                            size="small"
                            onClick={() => onViewDetails?.(tech)}
                            sx={{ color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
                          >
                            {isPending ? <UserCheck size={16} /> : <Eye size={16} />}
                          </IconButton>
                        </Tooltip>

                        {/* Suspend / Reactivate toggle */}
                        {canUpdate && !tech.status.includes('APPROVED') && (
                          <Tooltip title={isRejected ? 'Reactivate' : 'Reject'}>
                            <IconButton
                              size="small"
                              disabled={isLoading}
                              onClick={() => onToggleSuspend(tech.id)}
                              sx={{
                                color: isRejected ? '#059669' : '#ef4444',
                                '&:hover': { backgroundColor: isRejected ? '#f0fdf4' : '#fef2f2' },
                              }}
                            >
                              {isLoading
                                ? <CircularProgress size={14} />
                                : <RefreshCw size={15} />
                              }
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>

                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Pagination ── */}
      {technicians.length > 0 && (
        <TablePagination
          component="div"
          count={technicians.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{ borderTop: '1px solid #e2e8f0', fontSize: 13 }}
        />
      )}
    </Paper>
  );
};

export default TechniciansTable;
