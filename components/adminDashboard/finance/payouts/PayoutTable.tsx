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
import { useEffect, useState } from "react";

import { AdminControllers } from "@/api/adminControllers";

import ReleasePayoutModal from "./ReleasePayoutModal";

const STATUS_CHIP: Record<
  string,
  { label: string; backgroundColor: string; color: string }
> = {
  Released: { label: "Released", backgroundColor: "#d1fae5", color: "#065f46" },
  Pending:  { label: "Pending",  backgroundColor: "#fef3c7", color: "#d97706" },
  SUCCESS:  { label: "Success", backgroundColor: "#d1fae5", color: "#065f46" },
  COMPLETED: { label: "Completed", backgroundColor: "#d1fae5", color: "#065f46" },
  PAID: { label: "Paid", backgroundColor: "#d1fae5", color: "#065f46" },
};

const PayoutTable = () => {
  const [open, setOpen] = useState(false);
  const [_selectedPayout, _setSelectedPayout] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await AdminControllers.getPayments();
        if (res.success) {
          setPayments(res.data.payments || []);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleOpenReleaseModal = (payout: any) => {
    _setSelectedPayout(payout);
    setOpen(true);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}
      >
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
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Payment Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Loading...</TableCell>
                </TableRow>
              ) : payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">No payouts found.</TableCell>
                </TableRow>
              ) : payments.map((payout) => {
                const paymentStatusConfig = STATUS_CHIP[payout.status] ?? {
                  label: payout.status || "Unknown",
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
                      {payout.technician?.firstName} {payout.technician?.lastName}
                    </TableCell>

                    {/* Payout Date */}
                    <TableCell sx={{ fontSize: 13, color: "#475569" }}>
                      {new Date(payout.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    {/* Payout Amount */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                      ₹{payout.amount}
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell>
                      <Chip
                        label={paymentStatusConfig.label}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          backgroundColor: paymentStatusConfig.backgroundColor,
                          color: paymentStatusConfig.color,
                        }}
                      />
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
