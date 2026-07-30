'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

export default function ServiceAreaTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    city: '',
    state: '',
    pincode: '',
    fullAddress: '',
  });

  useEffect(() => {
    if (technician?.technicianProfile?.locations && technician.technicianProfile.locations.length > 0) {
      const loc = technician.technicianProfile.locations[0];
      setLocation({
        city: loc.city || '',
        state: loc.state || '',
        pincode: loc.pincode || '',
        fullAddress: loc.fullAddress || '',
      });
    }
  }, [technician]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loc = technician?.technicianProfile?.locations?.[0];
    const hasChanged = 
      location.city !== (loc?.city || '') ||
      location.state !== (loc?.state || '') ||
      location.pincode !== (loc?.pincode || '') ||
      location.fullAddress !== (loc?.fullAddress || '');

    if (!hasChanged) {
      dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
      return;
    }

    try {
      setLoading(true);
      const payload: any = {
        technicianProfile: {
          locations: [location]
        }
      };
      await TechnicianControllers.updateTechnicianProfile(payload);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Service Area updated successfully', severity: 'success' }));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Service Area & Location</h3>
        <p className="text-sm text-slate-500 mt-1">Update your primary service location and address.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="City"
          name="city"
          value={location.city}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="State"
          name="state"
          value={location.state}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Pincode"
          name="pincode"
          value={location.pincode}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Full Address"
          name="fullAddress"
          value={location.fullAddress}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={{ gridColumn: '1 / -1' }}
        />
      </div>

      <div className="pt-4 flex justify-end border-t border-slate-100">
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Location'}
        </Button>
      </div>
    </form>
  );
}
