'use client';

import { 
  Pagination, 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
} from '@mui/material';
import { useCallback,useEffect, useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';

const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'SUCCESS':
      return 'bg-emerald-100 text-emerald-700';
    case 'PENDING':
    case 'PROCESSING':
      return 'bg-amber-100 text-amber-700';
    case 'FAILED':
    case 'REVERSED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export default function TransactionsTable() {
  const [payments, setPayments] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await BookingControllers.getPayments(page, 10);
      
      if (res?.data?.payments) {
        setPayments(res.data.payments);
        const totalItems = res.data.total || res.data.payments.length;
        setTotalPages(res.data.totalPages || Math.ceil(totalItems / 10) || 1);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm mb-6 mt-8">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900">
          Transaction History
        </h3>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
          </div>
        ) : payments.length > 0 ? (
          <>
            <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden' }}>
              <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>PAYMENT ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>BOOKING ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>CUSTOMER</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>DATE</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>AMOUNT</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>STATUS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((payment) => {
                      const dateStr = new Date(payment.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const customerName = payment.customer ? `${payment.customer.firstName} ${payment.customer.lastName}` : 'N/A';
                      
                      return (
                        <TableRow key={payment.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                          <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                            PAY-{payment.id}
                          </TableCell>
                          <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                            {payment.bookingId}
                          </TableCell>
                          <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                            {customerName}
                          </TableCell>
                          <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                            {dateStr}
                          </TableCell>
                          <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                            ₹{payment.amount}
                          </TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                              {payment.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#0f172a',
                      fontFamily: 'inherit',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#10b981 !important',
                      color: '#ffffff',
                    },
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-slate-500 border border-slate-200 rounded-3xl">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}