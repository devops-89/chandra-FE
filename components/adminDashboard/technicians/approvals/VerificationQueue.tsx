"use client";

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
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import type { Technician } from "@/constants/admin/technicianData";

import ApprovalModal from "./ApprovalModal";
import DocumentViewerModal from "./DocumentViewerModal";
import RejectionModal from "./RejectionModal";
import VerificationDrawer from "./VerificationDrawer";

interface Props {
  pendingTechnicians: Technician[];
  actionLoading?: Record<string, boolean>;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string, notes: string) => void;
}

// ─── Types & Sorting helpers ──────────────────────────────────────────────────

type SortField =
  | "name"
  | "city"
  | "experience"
  | "skills"
  | "status"
  | "email"
  | "phone"
  | "appliedAt";

type SortDir = "asc" | "desc";

function getSortValue(tech: Technician, field: SortField): string | number {
  switch (field) {
    case "name":      return tech.name.toLowerCase();
    case "city":      return tech.city.toLowerCase();
    case "experience":return tech.experience;
    case "skills":    return tech.skills.join(", ").toLowerCase();
    case "status":    return tech.status.toLowerCase();
    case "email":     return tech.email.toLowerCase();
    case "phone":     return tech.phone.toLowerCase();
    case "appliedAt": return tech.appliedAt;
    default:          return "";
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
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
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
  align?: "left" | "right" | "center";
}

function HeadCell({
  field,
  label,
  sortField,
  sortDir,
  onSort,
  align = "left",
}: HeadCellProps) {
  if (!field) {
    return (
      <TableCell
        align={align}
        sx={{
          fontWeight: 700,
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#64748b",
          whiteSpace: "nowrap",
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
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#64748b",
        whiteSpace: "nowrap",
      }}
    >
      <TableSortLabel
        active={sortField === field}
        direction={sortField === field ? sortDir : "asc"}
        onClick={() => onSort(field)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
}

// ─── Status chip config ───────────────────────────────────────────────────────

const STATUS_CHIP: Record<
  string,
  { label: string; color: "success" | "warning" | "error" | "default" }
> = {
  APPROVED:         { label: "Approved",         color: "success" },
  PENDING_APPROVAL: { label: "Pending Approval", color: "warning" },
  REJECTED:         { label: "Rejected",          color: "error" },
  NO_PROFILE:       { label: "No Profile",        color: "default" },
};

const VerificationQueue = ({
  pendingTechnicians,
  actionLoading,
  onApprove,
  onReject,
}: Props) => {
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [approvingTech, setApprovingTech] = useState<Technician | null>(null);
  const [rejectingTech, setRejectingTech] = useState<Technician | null>(null);
  const [viewingDoc, setViewingDoc] = useState<{
    name: string;
    techName: string;
    url?: string;
  } | null>(null);

  // Sorting & Pagination state
  const [sortField, setSortField] = useState<SortField>("appliedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(0);
  };

  const handleOpenDrawer = (tech: Technician) => {
    setSelectedTech(tech);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTech(null);
  };

  const sorted = sortTechnicians(pendingTechnicians, sortField, sortDir);
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const headProps = { sortField, sortDir, onSort: handleSort };

  return (
    <div className="space-y-4">
      {pendingTechnicians.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-400 text-sm font-medium">
            All applications have been reviewed. No pending approvals!
          </p>
        </div>
      ) : (
        <Paper
          elevation={0}
          sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}
        >
          {/* Header */}
          <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Pending Queue ({pendingTechnicians.length})
            </Typography>
          </Box>

          <TableContainer>
            <Table size="small" sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8fafc" }}>
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
                {paginated.map((tech) => {
                  const statusChip = STATUS_CHIP[tech.status] ?? {
                    label: tech.status,
                    color: "default" as const,
                  };
                  const isActionBusy = Boolean(actionLoading?.[tech.id]);
                  const canUpdateStatus = tech.profileUserId !== null && !isActionBusy;

                  return (
                    <TableRow
                      key={tech.id}
                      hover
                      sx={{
                        "&:last-child td": { borderBottom: 0 },
                        cursor: "default",
                      }}
                    >
                      {/* Name + email */}
                      <TableCell sx={{ fontSize: 13 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              backgroundColor: "#fef3c7",
                              color: "#d97706",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
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
                              sx={{ fontWeight: 600, color: "#1e293b" }}
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
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {tech.skills.length > 0 ? (
                            tech.skills.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                size="small"
                                sx={{
                                  fontSize: 11,
                                  height: 20,
                                  backgroundColor: "#f1f5f9",
                                  color: "#475569",
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
                      <TableCell sx={{ fontSize: 13, whiteSpace: "nowrap" }}>
                        {tech.phone || "—"}
                      </TableCell>

                      {/* Applied At */}
                      <TableCell sx={{ fontSize: 13, whiteSpace: "nowrap" }}>
                        {tech.appliedAt || "—"}
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 0.5,
                          }}
                        >
                          {/* Review Application */}
                          <Tooltip title="Review Application">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDrawer(tech)}
                              sx={{
                                color: "#059669",
                                "&:hover": { backgroundColor: "#f0fdf4" },
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

                          {/* Approve */}
                          <Tooltip title="Approve Technician">
                            <span>
                              <IconButton
                                size="small"
                                disabled={!canUpdateStatus}
                                onClick={() => setApprovingTech(tech)}
                                sx={{
                                  color: "#059669",
                                  "&:hover": { backgroundColor: "#f0fdf4" },
                                  "&:disabled": { opacity: 0.4 },
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </IconButton>
                            </span>
                          </Tooltip>

                          {/* Reject */}
                          <Tooltip title="Reject Technician">
                            <span>
                              <IconButton
                                size="small"
                                disabled={!canUpdateStatus}
                                onClick={() => setRejectingTech(tech)}
                                sx={{
                                  color: "#ef4444",
                                  "&:hover": { backgroundColor: "#fef2f2" },
                                  "&:disabled": { opacity: 0.4 },
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
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                </svg>
                              </IconButton>
                            </span>
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
          {pendingTechnicians.length > 0 && (
            <TablePagination
              component="div"
              count={pendingTechnicians.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ borderTop: "1px solid #e2e8f0", fontSize: 13 }}
            />
          )}
        </Paper>
      )}

      {/* Verification Detail Slide-in Drawer */}
      <VerificationDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        technician={selectedTech}
        onApprove={(tech) => {
          handleCloseDrawer();
          setApprovingTech(tech);
        }}
        onReject={(tech) => {
          handleCloseDrawer();
          setRejectingTech(tech);
        }}
        onViewDoc={(docName, techName, docUrl) =>
          setViewingDoc({ name: docName, techName, url: docUrl })
        }
      />

      <AnimatePresence>
        {/* Document Viewer Modal */}
        {viewingDoc && (
          <DocumentViewerModal
            open={!!viewingDoc}
            onClose={() => setViewingDoc(null)}
            documentName={viewingDoc.name}
            technicianName={viewingDoc.techName}
            documentUrl={viewingDoc.url}
          />
        )}

        {/* Approval Checklist Modal */}
        {approvingTech && (
          <ApprovalModal
            open={!!approvingTech}
            onClose={() => setApprovingTech(null)}
            technicianName={approvingTech.name}
            onConfirm={() => onApprove(approvingTech.id)}
          />
        )}

        {/* Rejection Cause Modal */}
        {rejectingTech && (
          <RejectionModal
            open={!!rejectingTech}
            onClose={() => setRejectingTech(null)}
            technicianName={rejectingTech.name}
            onConfirm={(reason, notes) => onReject(rejectingTech.id, reason, notes)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerificationQueue;
