'use client';

import {
  Box,
  Card,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Download } from 'lucide-react';
import { useState } from 'react';

import { invoices } from '@/constants/dashboard/invoices';

const STATUS_CHIP: Record<string, { label: string; bg: string; text: string }> = {
  PAID: { label: 'Paid', bg: '#d1fae5', text: '#047857' },
  PENDING: { label: 'Pending', bg: '#fef3c7', text: '#b45309' },
  FAILED: { label: 'Failed', bg: '#fee2e2', text: '#b91c1c' },
};

export default function InvoiceTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedInvoices = invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ boxShadow: "0px 0px 1px 1px #eee", border: "1px solid #eeeeee", py: 2, mt: 2 }}>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>INVOICE</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>SERVICE</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>DATE</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>STATUS</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>ACTION</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>No invoices found</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>Your invoices will appear here.</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {paginatedInvoices.map((invoice) => {
              const status = STATUS_CHIP[invoice.status?.toUpperCase?.()] ?? { label: invoice.status, bg: '#f8fafc', text: '#64748b' };
              
              return (
                <TableRow
                  key={invoice.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ fontSize: 13 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>
                      {invoice.invoiceNumber}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontSize: 13 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      {invoice.serviceName ?? 'N/A'}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                    {invoice.date}
                  </TableCell>

                  <TableCell align="right" sx={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    ₹{invoice.amount ?? '0.00'}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: 11,
                        bgcolor: status.bg,
                        color: status.text,
                        border: 'none',
                        borderRadius: '6px'
                      }}
                    />
                  </TableCell>

                  <TableCell align="center" onClick={(e) => e.stopPropagation()} sx={{ width: 120 }}>
                    <Tooltip title="Download invoice">
                      <IconButton
                        size="small"
                        sx={{ color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
                      >
                        <Download size={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}