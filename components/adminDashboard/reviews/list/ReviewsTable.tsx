'use client';

import {
Box, Button,   CircularProgress,   Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
Grid,
IconButton, MenuItem, Paper, Rating, Select, Tab,   Table, TableBody, TableCell, TableContainer, TableHead, 
TablePagination,   TableRow,   Tabs, Typography} from '@mui/material';
import { useEffect, useState } from 'react';

import { AdminControllers } from '@/api/adminControllers';

const STATUS_TABS = [
  { id: 'ALL', label: 'All Reviews' },
  { id: 'PUBLISHED', label: 'Published' },
  { id: 'DRAFT', label: 'Draft' },
];

function TabsBar({ currentTab, onChange }: { currentTab: string; onChange: (val: any) => void }) {
  return (
    <Tabs
      value={currentTab}
      onChange={(_, newValue) => onChange(newValue)}
      sx={{
        minHeight: 48,
        '& .MuiTabs-indicator': {
          backgroundColor: '#059669',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
        borderBottom: '1px solid #e2e8f0',
        mb: 3,
      }}
    >
      {STATUS_TABS.map((tab) => (
        <Tab
          key={tab.id}
          value={tab.id}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: currentTab === tab.id ? 700 : 500 }}
              >
                {tab.label}
              </Typography>
            </Box>
          }
          sx={{
            textTransform: 'none',
            minWidth: 'auto',
            px: 3,
            color: '#64748b',
            '&.Mui-selected': { color: '#059669' },
          }}
        />
      ))}
    </Tabs>
  );
}

const ReviewsTable = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [pendingStatusChange, setPendingStatusChange] = useState<{ bookingId: number; newStatus: string } | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const revStatus = currentTab === 'ALL' ? undefined : currentTab;
      // Fetch up to 1000 bookings to filter them locally and have accurate pagination
      const response = await AdminControllers.getAdminBookings(1, 1000, 'COMPLETED', undefined, revStatus);
      
      if (response.bookings) {
        const filteredBookings = response.bookings.filter(
          (b: any) => b.customerReview || b.customerRating || b.technicianReview || b.technicianRating
        );
        setReviews(filteredBookings);
        setTotalCount(filteredBookings.length);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setError('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentTab]);

  const confirmStatusChange = async () => {
    if (!pendingStatusChange) return;
    
    const { bookingId, newStatus } = pendingStatusChange;
    try {
      await AdminControllers.updateReviewStatus(bookingId, newStatus);
      // Optimistic update
      setReviews(reviews.map(r => r.id === bookingId ? { ...r, reviewStatus: newStatus } : r));
    } catch (err) {
      console.error('Failed to update review status', err);
    } finally {
      setPendingStatusChange(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CircularProgress sx={{ color: '#059669' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10 font-medium">
        {error}
      </div>
    );
  }

  const paginatedReviews = reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="overflow-hidden rounded-2xl text-slate-800">
      <TabsBar currentTab={currentTab} onChange={(val) => { setCurrentTab(val); setPage(0); }} />

      <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Booking ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Technician</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: 12, color: '#64748b', textTransform: 'uppercase' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      No reviews found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedReviews.map((review) => {
                  const customerName = `${review.customer?.firstName || ''} ${review.customer?.lastName || ''}`.trim() || 'Unknown Customer';
                  const technicianName = `${review.technician?.firstName || ''} ${review.technician?.lastName || ''}`.trim() || 'Unassigned';
                  return (
                    <TableRow key={review.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      {/* Booking ID */}
                      <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                        #{review.id}
                      </TableCell>

                      {/* Customer */}
                      <TableCell sx={{ fontSize: 13 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {customerName}
                        </Typography>
                      </TableCell>
                      
                      {/* Service Name */}
                      <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                        {review.service?.name || 'Unknown'}
                      </TableCell>

                      {/* Technician */}
                      <TableCell sx={{ fontSize: 13 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: review.technician ? '#1e293b' : '#94a3b8' }}>
                          {technicianName}
                        </Typography>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
                          <Select
                            value={review.reviewStatus || 'DRAFT'}
                            onChange={(e) => setPendingStatusChange({ bookingId: review.id, newStatus: e.target.value })}
                            sx={{ 
                              fontSize: 12, 
                              fontWeight: 700,
                              height: 32,
                              backgroundColor: review.reviewStatus === 'PUBLISHED' ? '#d1fae5' : '#fef3c7',
                              color: review.reviewStatus === 'PUBLISHED' ? '#047857' : '#b45309',
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiSelect-icon': { color: review.reviewStatus === 'PUBLISHED' ? '#047857' : '#b45309' }
                            }}
                          >
                            <MenuItem value="PUBLISHED" sx={{ fontSize: 13, fontWeight: 600 }}>PUBLISHED</MenuItem>
                            <MenuItem value="DRAFT" sx={{ fontSize: 13, fontWeight: 600 }}>DRAFT</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        <IconButton 
                          size="small" 
                          onClick={() => setSelectedBooking(review)}
                          sx={{ color: '#059669', '&:hover': { bgcolor: '#f0fdf4' } }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalCount > 0 && (
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
        )}
      </Paper>

      {/* Details Modal */}
      <Dialog
        open={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        maxWidth="md"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px', p: 1 } }}
      >
        {selectedBooking && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>
                  Review Details
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, fontWeight: 500 }}>
                  Booking ID: <Box component="span" sx={{ color: '#0f172a', fontWeight: 700 }}>#{selectedBooking.id}</Box> | Service: <Box component="span" sx={{ color: '#059669', fontWeight: 700 }}>{selectedBooking.service?.name || 'Unknown'}</Box>
                </Typography>
              </Box>
              <IconButton onClick={() => setSelectedBooking(null)} size="small" sx={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: '#e2e8f0', py: 3 }}>
              <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                {/* Customer Review */}
                {(selectedBooking.customerReview || selectedBooking.customerRating) && (
                  <Grid size={{ xs: 12, md: (selectedBooking.technicianReview || selectedBooking.technicianRating) ? 6 : 8 }}>
                    <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        Customer Review - {`${selectedBooking.customer?.firstName || ''} ${selectedBooking.customer?.lastName || ''}`.trim() || 'Unknown'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={selectedBooking.customerRating || 0} readOnly size="small" sx={{ color: '#f59e0b' }} />
                        <Typography variant="body2" sx={{ ml: 1, fontWeight: 600, color: '#334155' }}>
                          {selectedBooking.customerRating || 0}/5
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: '#1e293b', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {selectedBooking.customerReview ? `"${selectedBooking.customerReview}"` : 'No text provided.'}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                
                {/* Technician Review */}
                {(selectedBooking.technicianReview || selectedBooking.technicianRating) && (
                  <Grid size={{ xs: 12, md: (selectedBooking.customerReview || selectedBooking.customerRating) ? 6 : 8 }}>
                    <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        Technician Review - {`${selectedBooking.technician?.firstName || ''} ${selectedBooking.technician?.lastName || ''}`.trim() || 'Unknown'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={selectedBooking.technicianRating || 0} readOnly size="small" sx={{ color: '#f59e0b' }} />
                        <Typography variant="body2" sx={{ ml: 1, fontWeight: 600, color: '#334155' }}>
                          {selectedBooking.technicianRating || 0}/5
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: '#1e293b', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {selectedBooking.technicianReview ? `"${selectedBooking.technicianReview}"` : 'No text provided.'}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                onClick={() => setSelectedBooking(null)} 
                variant="contained" 
                sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' }, textTransform: 'none', fontWeight: 600, borderRadius: '8px', boxShadow: 'none' }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      {/* Confirmation Dialog */}
      <Dialog
        open={Boolean(pendingStatusChange)}
        onClose={() => setPendingStatusChange(null)}
        maxWidth="xs"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0f172a' }}>
          Confirm Status Change
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#e2e8f0', py: 3 }}>
          <Typography variant="body1" sx={{ color: '#475569' }}>
            Are you sure you want to change the review status to <Box component="span" sx={{ fontWeight: 700, color: '#0f172a' }}>{pendingStatusChange?.newStatus}</Box>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setPendingStatusChange(null)} 
            variant="outlined" 
            sx={{ color: '#64748b', borderColor: '#cbd5e1', '&:hover': { bgcolor: '#f1f5f9', borderColor: '#94a3b8' }, textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmStatusChange} 
            variant="contained" 
            sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' }, textTransform: 'none', fontWeight: 600, borderRadius: '8px', boxShadow: 'none' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewsTable;
