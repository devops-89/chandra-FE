'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState, useEffect } from 'react';
import { fetchCustomerAddresses } from '@/redux/slices/customerProfileSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Card,
  Typography
} from '@mui/material';

import AddressTableRow from './AddressTableRow';

export default function AddressList() {
  const dispatch = useAppDispatch();
  const { profile, addressesPagination, isLoading } = useAppSelector((state) => state.customerProfile);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchCustomerAddresses({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const backendAddresses = profile?.addresses || [];

  if (backendAddresses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-500 font-medium">No saved addresses found.</p>
        <p className="text-slate-400 text-sm mt-1">Click &quot;Add Address&quot; above to save one.</p>
      </div>
    );
  }

  const addresses = backendAddresses;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const totalItems = addressesPagination?.total || addresses.length;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 4, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
      <>
        <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
          <Table sx={{ minWidth: 650 }} aria-label="addresses table">
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>City</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>State</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Pincode</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.map((address) => (
                <AddressTableRow key={address.id} address={address} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2, p: 2, bgcolor: '#f8fafc' }}>
          {addresses.map((address: any) => (
            <Card key={address.id} variant="outlined" sx={{ borderRadius: 3, p: 2, bgcolor: 'white', borderColor: '#e2e8f0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  ID: #{address.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(address.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, whiteSpace: 'pre-line' }}>
                {address.fullAddress}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {address.city && (
                  <Typography variant="body2" sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1 }}>
                    {address.city}
                  </Typography>
                )}
                {address.state && (
                  <Typography variant="body2" sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1 }}>
                    {address.state}
                  </Typography>
                )}
                {address.pincode && (
                  <Typography variant="body2" sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1 }}>
                    {address.pincode}
                  </Typography>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
