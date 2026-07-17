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

import { transactionsData } from "@/constants/admin/financeData";

const STATUS_CHIP: Record<
  string,
  { label: string; backgroundColor: string; color: string }
> = {
  Success: { label: "Success", backgroundColor: "#d1fae5", color: "#065f46" },
  Pending: { label: "Pending", backgroundColor: "#fef3c7", color: "#d97706" },
  Failed:  { label: "Failed",  backgroundColor: "#fee2e2", color: "#b91c1c" },
};

const TransactionsTable = () => {
  return (
    <Paper
      elevation={0}
      sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}
    >
      <Box sx={{ p: 2.5, backgroundColor: "#059669", color: "#fff" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Transactions
        </Typography>
      </Box>

      <TableContainer>
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Transaction ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Customer
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Booking ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Amount
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Method
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactionsData.map((transaction) => {
              const statusConfig = STATUS_CHIP[transaction.status] ?? {
                label: transaction.status,
                backgroundColor: "#f1f5f9",
                color: "#475569",
              };

              return (
                <TableRow
                  key={transaction.id}
                  hover
                  sx={{
                    "&:last-child td": { borderBottom: 0 },
                    cursor: "default",
                  }}
                >
                  <TableCell sx={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>
                    #{transaction.id}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                    {transaction.customer}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, color: "#475569" }}>
                    {transaction.bookingId}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                    ₹{transaction.amount}
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                    {transaction.method}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, color: "#475569", whiteSpace: "nowrap" }}>
                    {transaction.date}
                  </TableCell>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionsTable;
