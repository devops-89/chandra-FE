'use client';
import { AdminControllers } from '@/api/adminControllers';
import { userSecuredApi } from '@/api/config';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import type { AdminBooking } from '@/types/admin/bookings.types';
import { Button, CircularProgress, Dialog, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  open: boolean;
  booking: AdminBooking | any;
  onClose: () => void;
  onAssign: () => void;
}

const AssignTechnicianModal = ({ open, booking, onClose, onAssign }: Props) => {
  const [selected, setSelected] = useState<number | ''>('');
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [isLoadingTechs, setIsLoadingTechs] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      const fetchTechs = async () => {
        setIsLoadingTechs(true);
        try {
          const serviceId = booking?.service?.id || booking?.serviceId;
          const serviceQuery = serviceId ? `&serviceId=${serviceId}` : '';
          
          const response = await userSecuredApi.get(`/users/all?role=TECHNICIAN&page=1&limit=10000&technicianProfileStatus=APPROVED${serviceQuery}`);
          const data = response.data?.data?.data || response.data?.data || [];
          setTechnicians(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingTechs(false);
        }
      };
      fetchTechs();
    }
  }, [open]);

  const handleConfirm = async () => {
    if (!selected) return;
    
    setIsAssigning(true);
    try {
      await AdminControllers.assignTechnicianToBooking({
        bookingId: Number(booking?.bookingId || booking?.id),
        technicianId: Number(selected)
      });
      dispatch(showSnackbar({ message: 'Assigned Technician Successfully', severity: 'success' }));
      onAssign();
      handleClose();
    } catch (err: any) {
      console.error('Failed to assign technician', err);
      dispatch(showSnackbar({ 
        message: err?.response?.data?.message || 'Failed to assign technician. Please try again.', 
        severity: 'error' 
      }));
    } finally {
      setIsAssigning(false);
    }
  };

  const handleClose = () => {
    setSelected('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth 
      sx={{
        '& .MuiDialog-paper': { 
          borderRadius: '1rem',
          m: 2
        }
      }}
    >
      <div className="w-full bg-white flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Assign Technician</h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a technician for Booking <span className="font-medium text-emerald-600">#{booking?.bookingId || booking?.id}</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Technician</InputLabel>
          <Select
            value={selected}
            label="Select Technician"
            onChange={(e) => setSelected(e.target.value as number)}
            disabled={isLoadingTechs}
            MenuProps={{
              slotProps: { paper: { sx: { maxHeight: 250 } } },
              anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
              transformOrigin: { vertical: 'top', horizontal: 'left' },
            }}
          >
            {isLoadingTechs ? (
              <MenuItem value="" disabled>Loading technicians...</MenuItem>
            ) : technicians.length === 0 ? (
              <MenuItem value="" disabled>No approved technicians available</MenuItem>
            ) : (
              technicians.map((tech) => {
                const name = ((tech.firstName || '') + ' ' + (tech.lastName || '')).trim() || tech.username || 'Unknown';
                return (
                  <MenuItem key={tech.id} value={tech.id}>
                    {name} {tech.city ? `(${tech.city})` : ''}
                  </MenuItem>
                );
              })
            )}
          </Select>
        </FormControl>

        <div className="flex justify-end gap-3 mt-2">
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={isAssigning}
            sx={{ borderRadius: 2, textTransform: 'none', borderColor: 'grey.300', color: 'grey.700' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selected || isAssigning}
            variant="contained"
            color="success"
            sx={{ borderRadius: 2, textTransform: 'none', px: 4, bgcolor: '#059669', '&:hover': { bgcolor: '#047857' } }}
          >
            {isAssigning ? <CircularProgress size={24} color="inherit" /> : 'Assign'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AssignTechnicianModal;
