'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Pagination, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import { Visibility as ViewIcon, Add as AddIcon } from '@mui/icons-material';
import { BookingControllers } from '@/api/bookingControllers';
import TicketStatusBadge from './TicketStatusBadge';

export default function TicketList() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Details Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Raise Ticket Modal state
  const [isRaiseTicketOpen, setIsRaiseTicketOpen] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await BookingControllers.getComplaints(page, 10);
      
      if (res?.data?.data) {
        const fetchedData = res.data.data;
        const mappedTickets = fetchedData.map((complaint: any) => {
          let dateStr = complaint.createdAt;
          if (complaint.createdAt) {
            const d = new Date(complaint.createdAt);
            dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
          }

          return {
            rawId: complaint.id,
            id: `SUP-${complaint.id}`,
            bookingId: complaint.booking?.id,
            subject: complaint.title || 'Support Ticket',
            category: complaint.service?.name || 'General Service',
            status: complaint.status || 'OPEN',
            createdAt: dateStr,
          };
        });
        setTickets(mappedTickets);

        const totalItems = res.data.pagination?.total || mappedTickets.length;
        setTotalPages(res.data.pagination?.totalPages || Math.ceil(totalItems / 10) || 1);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleTicketClick = async (rawId: number) => {
    try {
      setIsModalOpen(true);
      setModalLoading(true);
      const res = await BookingControllers.getComplaintById(rawId);
      if (res?.data?.data) {
        setSelectedComplaint(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching complaint details:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleRaiseTicket = async () => {
    if (!newTicketTitle.trim() || !newTicketDesc.trim()) {
      setSnackbar({ open: true, message: 'Please fill out all fields', severity: 'error' });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await BookingControllers.createComplaint({
        title: newTicketTitle,
        description: newTicketDesc,
      });
      setSnackbar({ open: true, message: 'Support ticket raised successfully!', severity: 'success' });
      setIsRaiseTicketOpen(false);
      setNewTicketTitle('');
      setNewTicketDesc('');
      fetchComplaints(); // Refresh list
    } catch (error: any) {
      setSnackbar({ open: true, message: error.message || 'Failed to raise ticket', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm mb-6">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-900">
            Support Tickets
          </h3>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsRaiseTicketOpen(true)}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              backgroundColor: '#10b981',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              padding: '8px 16px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#059669',
                boxShadow: 'none',
              }
            }}
          >
            Raise Ticket
          </Button>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
          </div>
        ) : tickets.length > 0 ? (
          <>
            <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
              <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>TICKET ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>BOOKING ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>SUBJECT</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>SERVICE</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>DATE</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>STATUS</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                          {ticket.id}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                          {ticket.bookingId ? ticket.bookingId : '-'}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#475569', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ticket.subject}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                          {ticket.category}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: '#475569' }}>
                          {ticket.createdAt}
                        </TableCell>
                        <TableCell>
                          <TicketStatusBadge status={ticket.status} />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleTicketClick(ticket.rawId)}
                            sx={{ color: '#0ea5e9', '&:hover': { bgcolor: 'rgba(14, 165, 233, 0.1)' } }}
                            title="View Details"
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
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
            No support tickets found.
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedComplaint(null);
        }}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': { borderRadius: '24px', p: 1 }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Ticket Details</span>
          <IconButton
            onClick={() => {
              setIsModalOpen(false);
              setSelectedComplaint(null);
            }}
            sx={{ color: '#94a3b8' }}
          >
            <span className="material-symbols-outlined">close</span>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {modalLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
            </div>
          ) : selectedComplaint ? (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {selectedComplaint.service?.name || 'General Service'}
                  </span>
                  {selectedComplaint.bookingId || selectedComplaint.booking?.id ? (
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Booking {selectedComplaint.bookingId || selectedComplaint.booking?.id}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{selectedComplaint.title}</h3>
                <p className="text-sm text-slate-500 mt-1">Ticket ID: SUP-{selectedComplaint.id}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Description</h4>
                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                    {selectedComplaint.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Status</p>
                    <p className="font-semibold text-slate-900">{selectedComplaint.status}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Created At</p>
                    <p className="font-semibold text-slate-900">
                      {new Date(selectedComplaint.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Failed to load details.
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Raise Ticket Modal */}
      <Dialog
        open={isRaiseTicketOpen}
        onClose={() => {
          if (!isSubmitting) setIsRaiseTicketOpen(false);
        }}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': { borderRadius: '24px', p: 1 }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Raise Support Ticket</span>
          <IconButton
            onClick={() => {
              if (!isSubmitting) setIsRaiseTicketOpen(false);
            }}
            disabled={isSubmitting}
            sx={{ color: '#94a3b8' }}
          >
            <span className="material-symbols-outlined">close</span>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <div className="space-y-4 pt-2">
            <div>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                Subject
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. Account issue"
                size="small"
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                }}
              />
            </div>

            <div>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                Description
              </Typography>
              <TextField
                fullWidth
                placeholder="Describe your issue in detail..."
                multiline
                rows={4}
                value={newTicketDesc}
                onChange={(e) => setNewTicketDesc(e.target.value)}
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setIsRaiseTicketOpen(false)}
            disabled={isSubmitting}
            sx={{
              color: '#475569',
              borderColor: '#cbd5e1',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#94a3b8',
                backgroundColor: '#f8fafc'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleRaiseTicket}
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#10b981',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#059669',
                boxShadow: 'none',
              }
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}