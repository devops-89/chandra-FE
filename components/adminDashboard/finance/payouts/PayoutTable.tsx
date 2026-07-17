"use client";

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

import type { Payout } from "@/constants/admin/financeData";
import { payoutsData } from "@/constants/admin/financeData";

import ReleasePayoutModal from "./ReleasePayoutModal";

const STATUS_CHIP: Record<
  string,
  { label: string; backgroundColor: string; color: string }
> = {
  Released: { label: "Released", backgroundColor: "#d1fae5", color: "#065f46" },
  Pending:  { label: "Pending",  backgroundColor: "#fef3c7", color: "#d97706" },
};

const PayoutTable = () => {
  const [open, setOpen] = useState(false);
  const [_selectedPayout, _setSelectedPayout] = useState<Payout | null>(null);

  const handleOpenReleaseModal = (payout: Payout) => {
    _setSelectedPayout(payout);
    setOpen(true);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}
      >
        <Box sx={{ p: 2.5, backgroundColor: "#059669", color: "#fff" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Technician Payouts
          </Typography>
        </Box>

        <TableContainer>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Payout ID
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Technician
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Payout Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Payout Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payoutsData.map((payout) => {
                const statusConfig = STATUS_CHIP[payout.status] ?? {
                  label: payout.status,
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                };

                return (
                  <TableRow
                    key={payout.id}
                    hover
                    sx={{
                      "&:last-child td": { borderBottom: 0 },
                      cursor: "default",
                    }}
                  >
                    {/* Payout ID */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>
                      #{payout.id}
                    </TableCell>

                    {/* Technician */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                      {payout.technician}
                    </TableCell>

                    {/* Payout Date */}
                    <TableCell sx={{ fontSize: 13, color: "#475569" }}>
                      {payout.date}
                    </TableCell>

                    {/* Payout Amount */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                      ₹{payout.amount}
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
                    <TableCell align="center">
                      <button
                        onClick={() => handleOpenReleaseModal(payout)}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ReleasePayoutModal
        open={open}
        onClose={() => {
          setOpen(false);
          _setSelectedPayout(null);
        }}
      />
    </>
  );
};

export default PayoutTable;
