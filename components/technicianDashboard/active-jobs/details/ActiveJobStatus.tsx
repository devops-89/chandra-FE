'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { ChevronDown,Loader2 } from 'lucide-react';
import { useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';

import { useJobContext } from '../JobContext';

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  assigned: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Assigned' },
  accepted: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Accepted' },
  enroute: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Enroute' },
  arrived: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Arrived' },
  ongoing: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Ongoing' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
};

const getNextStatuses = (current: string) => {
  switch (current.toLowerCase()) {
    case 'accepted':
      return [
        { value: 'ENROUTE', label: 'Enroute' },
        { value: 'CANCELLED', label: 'Cancelled' },
      ];
    case 'enroute':
      return [
        { value: 'ARRIVED', label: 'Arrived' },
        { value: 'CANCELLED', label: 'Cancelled' },
      ];
    case 'arrived':
      return [
        { value: 'CANCELLED', label: 'Cancelled' },
      ];
    case 'ongoing':
      return [
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
      ];
    default:
      return [];
  }
};

export default function ActiveJobStatus({ onStatusUpdate }: { onStatusUpdate?: (status: string) => void }) {
  const currentJob = useJobContext();
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
  const status = currentJob?.status || 'accepted';
  const config = statusConfig[status.toLowerCase()] || statusConfig.accepted;
  const nextStatuses = getNextStatuses(status);
  const isInteractive = nextStatuses.length > 0;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isInteractive && !isLoading) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    handleClose();
    if (!currentJob?.rawId || newStatus.toLowerCase() === status.toLowerCase()) return;

    if (newStatus === 'CANCELLED') {
      setCancelDialogOpen(true);
      return;
    }

    try {
      setIsLoading(true);
      await BookingControllers.updateBookingStatus(currentJob.rawId, newStatus);
      if (onStatusUpdate) {
        onStatusUpdate(newStatus);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCancel = async () => {
    setCancelDialogOpen(false);
    if (!currentJob?.rawId) return;

    try {
      setIsLoading(true);
      await BookingControllers.cancelBooking({ 
        bookingId: currentJob.rawId,
        cancellationReason: 'Cancelled by technician'
      });
      if (onStatusUpdate) {
        onStatusUpdate('CANCELLED');
      }
      window.dispatchEvent(new Event('refresh_bookings'));
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={!isInteractive || isLoading}
        className={`
          inline-flex items-center gap-1.5
          ${config.bg}
          ${config.text}
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          outline-none
          transition-all
          ${isInteractive && !isLoading ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
          ${isLoading ? 'opacity-70' : ''}
        `}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <span>{config.label}</span>
        )}
        
        {isInteractive && !isLoading && (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            elevation: 2,
            sx: {
              mt: 1,
              minWidth: 140,
              borderRadius: 2,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }
          }
        }}
      >
        {nextStatuses.map((opt) => (
          <MenuItem 
            key={opt.value} 
            onClick={() => handleStatusChange(opt.value)}
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: opt.value === 'CANCELLED' ? '#ef4444' : '#334155',
              '&:hover': {
                backgroundColor: opt.value === 'CANCELLED' ? '#fef2f2' : '#f8fafc',
              }
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} sx={{ '& .MuiDialog-paper': { borderRadius: '16px', padding: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#0f172a', paddingBottom: '8px' }}>
          Cancel Booking
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#475569' }}>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button onClick={() => setCancelDialogOpen(false)} sx={{ color: '#64748b', fontWeight: 600 }}>
            No, keep it
          </Button>
          <Button 
            onClick={handleConfirmCancel} 
            variant="contained" 
            sx={{ 
              backgroundColor: '#ef4444', 
              color: 'white', 
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#dc2626', boxShadow: 'none' } 
            }}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}