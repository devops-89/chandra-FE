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
  allTechnicians: Technician[];
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  actionLoading?: Record<string, boolean>;
  onToggleSuspend: (id: string) => void;
  onViewDetails?: (technician: Technician) => void;
  isLoading?: boolean;
  error?: string | null;
}

// ─── Status chip config ───────────────────────────────────────────────────────

const STATUS_CHIP: Record<
  string,
  { label: string; color: 'success' | 'warning' | 'error' | 'default' }
> = {
  APPROVED:         { label: 'Approved',         color: 'success' },
  PENDING_APPROVAL: { label: 'Pending Approval', color: 'warning' },
  REJECTED:         { label: 'Rejected',          color: 'error' },
  NO_PROFILE:       { label: 'No Profile',        color: 'default' },
};

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

// ─── Tabs bar ─────────────────────────────────────────────────────────────────

interface TabsBarProps {
  statusFilter: string;
  allCount: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  onChange: (val: StatusTab) => void;
}

function TabsBar({
  statusFilter,
  allCount,
  approvedCount,
  pendingCount,
  rejectedCount,
  onChange,
}: TabsBarProps) {
  const counts: Record<StatusTab, number> = {
    'All Status': allCount,
    APPROVED: approvedCount,
    PENDING_APPROVAL: pendingCount,
    REJECTED: rejectedCount,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        pb: '2px',
      }}
    >
      {STATUS_TABS.map((tab) => {
        const isActive = statusFilter === tab.id;
        return (
          <Box
            key={tab.id}
            component="button"
            onClick={() => onChange(tab.id)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '12px',
              px: '14px',
              py: '8px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              backgroundColor: isActive ? '#059669' : 'transparent',
              color: isActive ? '#fff' : '#64748b',
              boxShadow: isActive ? '0 1px 4px rgba(5,150,105,0.3)' : 'none',
              '&:hover': {
                backgroundColor: isActive ? '#047857' : '#f1f5f9',
                color: isActive ? '#fff' : '#1e293b',
              },
            }}
          >
            {/* dot */}
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: isActive
                  ? 'rgba(255,255,255,0.7)'
                  : tab.dotColor,
                transition: 'background-color 0.2s ease',
              }}
            />
            {tab.label}
            {/* count badge */}
            <span
              style={{
                borderRadius: '999px',
                padding: '1px 6px',
                fontSize: '0.6875rem',
                fontWeight: 700,
                lineHeight: 1.4,
                backgroundColor: isActive
                  ? 'rgba(255,255,255,0.2)'
                  : '#f1f5f9',
                color: isActive ? '#fff' : '#64748b',
                transition: 'all 0.2s ease',
              }}
            >
              {counts[tab.id]}
            </span>
          </Box>
        );
      })}
    </Box>
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
  actionLoading,
  onToggleSuspend,
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

  const headProps = { sortField, sortDir, onSort: handleSort };

  return (
    <Paper
      elevation={0}
      sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}
    >
      {/* Header: title + tabs */}
      <Box
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 1.5,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1.2rem' }}
          >
            Current Technicians
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total of{' '}
            <Box
              component="span"
              sx={{ color: '#059669', fontWeight: 600 }}
            >
              {technicians.length} technician
            </Box>{' '}
            records found
          </Typography>
        </Box>

        <TabsBar
          statusFilter={statusFilter}
          allCount={allTechnicians.length}
          approvedCount={approvedCount}
          pendingCount={pendingCount}
          rejectedCount={rejectedCount}
          onChange={handleTabChange}
        />
      </Box>

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
                const statusChip =
                  STATUS_CHIP[tech.status] ?? {
                    label: tech.status,
                    color: 'default' as const,
                  };
                const isActionBusy = Boolean(actionLoading?.[tech.id]);
                const canUpdateStatus = tech.profileUserId !== null;
                const isPending = tech.status === 'PENDING_APPROVAL';
                const isRejected = tech.status === 'REJECTED';

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
                      <Chip
                        label={statusChip.label}
                        color={statusChip.color}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 11 }}
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

                        {/* Reject / Reactivate toggle */}
                        {canUpdateStatus && !tech.status.includes('APPROVED') && (
                          <Tooltip
                            title={
                              isRejected
                                ? 'Reactivate Technician'
                                : 'Reject Technician'
                            }
                          >
                            <span>
                              <IconButton
                                size="small"
                                disabled={isActionBusy}
                                onClick={() => onToggleSuspend(tech.id)}
                                sx={{
                                  color: isRejected ? '#059669' : '#ef4444',
                                  '&:hover': {
                                    backgroundColor: isRejected
                                      ? '#f0fdf4'
                                      : '#fef2f2',
                                  },
                                  '&:disabled': { opacity: 0.4 },
                                }}
                              >
                                {isRejected ? (
                                  /* reactivate icon */
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
                                    <polyline points="23 4 23 10 17 10" />
                                    <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                                  </svg>
                                ) : (
                                  /* reject / ban icon */
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
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                  </svg>
                                )}
                              </IconButton>
                            </span>
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
  );
};

export default TechniciansTable;
