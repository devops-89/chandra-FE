"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { commissionHistoryData } from "@/constants/admin/commissionHistoryData";

const CommissionHistory = () => {
  return (
    <Paper
      elevation={0}
      sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}
    >
      <Box sx={{ p: 2.5, backgroundColor: "#059669", color: "#fff" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Commission History
        </Typography>
        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 0.5, display: "block" }}>
          Track all commission changes made by admins.
        </Typography>
      </Box>

      <TableContainer>
        <Table size="small" sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Service
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Previous Rate
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                New Rate
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Updated By
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Updated At
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {commissionHistoryData.map((history) => (
              <TableRow
                key={history.id}
                hover
                sx={{
                  "&:last-child td": { borderBottom: 0 },
                  cursor: "default",
                }}
              >
                <TableCell sx={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                  {history.serviceName}
                </TableCell>
                <TableCell sx={{ fontSize: 13 }}>
                  <span className="inline-block rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                    {history.oldCommission}%
                  </span>
                </TableCell>
                <TableCell sx={{ fontSize: 13 }}>
                  <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                    {history.newCommission}%
                  </span>
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: "#475569" }}>
                  By {history.updatedBy}
                </TableCell>
                <TableCell sx={{ fontSize: 13, color: "#475569" }}>
                  {history.updatedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CommissionHistory;
