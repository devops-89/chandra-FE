"use client";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField, Typography } from '@mui/material';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';
import { useAppDispatch } from '@/redux/hooks';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import type { CustomerBooking } from '@/types/customerBooking.types';

interface Props {
  booking: CustomerBooking;
}
export default function ReviewFeedbackCard({ booking }: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Local state to immediately reflect the submitted review
  const [localRating, setLocalRating] = useState<number | null>(booking.customerRating ?? booking.myRating ?? null);
  const [localReview, setLocalReview] = useState<string | null>(booking.customerReview ?? booking.myReview ?? null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      setRating(0);
      setReviewText('');
    }
  };

  const handleSubmit = async () => {
    if (!rating || rating === 0) {
      dispatch(showSnackbar({ message: 'Please provide a star rating', severity: 'error' }));
      return;
    }
    
    const bId = booking.id || booking.bookingId;
    if (!bId) {
      dispatch(showSnackbar({ message: 'Booking ID not found', severity: 'error' }));
      return;
    }

    try {
      setIsSubmitting(true);
      await BookingControllers.submitReview({
        bookingId: bId,
        rating,
        review: reviewText
      });
      
      setLocalRating(rating);
      setLocalReview(reviewText);
      dispatch(showSnackbar({ message: 'Review submitted successfully!', severity: 'success' }));
      handleClose();
    } catch (error: any) {
      dispatch(showSnackbar({ message: error.message || 'Failed to submit review', severity: 'error' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-950">
          Review &amp; Feedback
        </h3>
        {!localRating && (
          <button 
            onClick={handleOpen}
            className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            <Plus size={16} />
            Add Review
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Your Rating</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-slate-950">
              {localRating ?? 'Not rated'}
            </span>
            {localRating && (
              <Rating value={localRating} readOnly size="small" />
            )}
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {localReview ?? 'No review submitted yet.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            Technician Rating
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-slate-950">
              {booking.technicianRating ?? 'Not rated'}
            </span>
            {booking.technicianRating && (
              <Rating value={booking.technicianRating} readOnly size="small" />
            )}
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {booking.technicianReview ?? 'No technician feedback yet.'}
          </p>
        </div>
      </div>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth 
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', pb: 2 }}>
          Rate Your Experience
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#475569', fontWeight: 500 }}>
              How was the service?
            </Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
              sx={{ fontSize: '3rem', color: '#f59e0b' }}
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Tell us about your experience with this booking..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            variant="outlined"
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e2e8f0' }}>
          <Button 
            onClick={handleClose} 
            disabled={isSubmitting}
            sx={{ color: '#64748b', fontWeight: 600, textTransform: 'none', borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !rating}
            variant="contained"
            sx={{ 
              backgroundColor: '#059669', 
              '&:hover': { backgroundColor: '#047857' },
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '8px',
              px: 3
            }}
            startIcon={isSubmitting && <Loader2 className="animate-spin" size={16} />}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
