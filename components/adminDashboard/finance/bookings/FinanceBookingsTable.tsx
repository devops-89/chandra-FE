"use client";

import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminControllers } from "@/api/adminControllers";

const STATUS_CHIP: Record<string, { label: string; backgroundColor: string; color: string }> = {
  COMPLETED: { label: "Completed", backgroundColor: "#d1fae5", color: "#065f46" },
  PENDING:   { label: "Pending",   backgroundColor: "#fef3c7", color: "#d97706" },
  SUCCESS:   { label: "Success",   backgroundColor: "#d1fae5", color: "#065f46" },
  FAILED:    { label: "Failed",    backgroundColor: "#fee2e2", color: "#b91c1c" },
  PAID:      { label: "Paid",      backgroundColor: "#d1fae5", color: "#065f46" },
};

const FinanceBookingsTable = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Call the API with page={page + 1}, limit={rowsPerPage}, status='COMPLETED'
        const res = await AdminControllers.getAdminBookings(page + 1, rowsPerPage, 'COMPLETED');
        setBookings(res.bookings || []);
        setTotalCount(res.pagination?.total || 0);
      } catch (error) {
        console.error("Failed to fetch finance bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [page, rowsPerPage]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={40} sx={{ color: "#059669" }} />
        <Typography sx={{ mt: 2, color: "text.secondary", fontWeight: 500 }}>
          Loading bookings...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Bookings For Payout
        </h1>
        <p className="text-slate-500">View completed bookings and process technician payouts</p>
      </div>

      <Paper elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ p: 2.5, backgroundColor: "#059669", color: "#fff" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Completed Bookings
          </Typography>
        </Box>

        <TableContainer>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>Booking ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>Technician Name</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>Service Name</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>Booking Status</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>Payment Status</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>Payout Status</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>No completed bookings found.</TableCell>
                </TableRow>
              ) : bookings.map((booking) => {
                const paymentStatusConfig = STATUS_CHIP[booking.bookingPaymentStatus] ?? {
                  label: booking.bookingPaymentStatus || "Unknown",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                };

                const payoutStatusConfig = STATUS_CHIP[booking.technicianPayoutStatus] ?? {
                  label: booking.technicianPayoutStatus || "Unknown",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                };

                return (
                  <TableRow key={booking.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                    {/* Booking ID */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>
                      B-{booking.id}
                    </TableCell>

                    {/* Technician Name */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                      {booking.technician ? `${booking.technician.firstName} ${booking.technician.lastName}` : "Not Assigned"}
                    </TableCell>

                    {/* Service Name */}
                    <TableCell sx={{ fontSize: 13, color: "#475569" }}>
                      {booking.service?.name}
                    </TableCell>

                    {/* Amount */}
                    <TableCell sx={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
                      ₹{booking.totalAmount || "0.00"}
                    </TableCell>

                    {/* Booking Status */}
                    <TableCell>
                      <Chip
                        label={booking.status || "Unknown"}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 11, backgroundColor: STATUS_CHIP[booking.status]?.backgroundColor || "#f1f5f9", color: STATUS_CHIP[booking.status]?.color || "#475569" }}
                      />
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell>
                      <Chip
                        label={paymentStatusConfig.label}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 11, backgroundColor: paymentStatusConfig.backgroundColor, color: paymentStatusConfig.color }}
                      />
                    </TableCell>

                    {/* Payout Status */}
                    <TableCell>
                      <Chip
                        label={payoutStatusConfig.label}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 11, backgroundColor: payoutStatusConfig.backgroundColor, color: payoutStatusConfig.color }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <button 
                        onClick={() => router.push(`/admin/finance/bookings/${booking.id}`)}
                        className="text-emerald-600 hover:text-emerald-700 transition-colors p-1 rounded-full hover:bg-emerald-50"
                      >
                        <Eye size={18} />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalCount}
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
      </Paper>
    </div>
  );
};

export default FinanceBookingsTable;
