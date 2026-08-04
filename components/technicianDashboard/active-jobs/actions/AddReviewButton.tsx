'use client';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField, Typography } from '@mui/material';
import { Loader2, Star } from 'lucide-react';
import { useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';
import { useAppDispatch } from '@/redux/hooks';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

import { useJobContext } from '../JobContext';

export default function AddReviewButton() {
  const currentJob = useJobContext();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Basic local state to hide button after submission if needed
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!currentJob || hasSubmitted) return null;

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
    
    if (!currentJob.rawId) {
      dispatch(showSnackbar({ message: 'Booking ID not found', severity: 'error' }));
      return;
    }

    try {
      setIsSubmitting(true);
      await BookingControllers.submitReview({
        bookingId: currentJob.rawId,
        rating,
        review: reviewText
      });
      
      setHasSubmitted(true);
      dispatch(showSnackbar({ message: 'Review submitted successfully!', severity: 'success' }));
      handleClose();
    } catch (error: any) {
      dispatch(showSnackbar({ message: error.message || 'Failed to submit review', severity: 'error' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="
          flex items-center justify-center gap-2
          px-4 py-2.5
          rounded-xl
          border border-emerald-200
          text-emerald-700
          bg-emerald-50 hover:bg-emerald-100
          transition-colors
          font-semibold text-sm
          shadow-sm
        "
      >
        <Star size={18} />
        Add Review
      </button>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth 
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 600, borderBottom: '1px solid #e2e8f0', pb: 2 }}>
          Rate Customer
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#475569', fontWeight: 500 }}>
              How was your experience with the customer?
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
            placeholder="Tell us about your experience with this customer..."
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
    </>
  );
}
