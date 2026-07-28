'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

export default function PersonalInfoTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    emergencyContact: '',
  });

  useEffect(() => {
    if (technician) {
      setFormData({
        firstName: technician.firstName || '',
        lastName: technician.lastName || '',
        username: technician.username || '',
        phone: technician.phone || '',
        emergencyContact: technician.emergencyContact || '',
      });
    }
  }, [technician]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if anything actually changed
    const hasChanged = 
      formData.firstName !== (technician?.firstName || '') ||
      formData.lastName !== (technician?.lastName || '') ||
      formData.username !== (technician?.username || '') ||
      formData.phone !== (technician?.phone || '') ||
      formData.emergencyContact !== (technician?.emergencyContact || '');
      
    if (!hasChanged) {
      dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
      return;
    }

    try {
      setLoading(true);
      await TechnicianControllers.updateTechnicianProfile(formData as any);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Personal info updated successfully', severity: 'success' }));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Personal Details</h3>
        <p className="text-sm text-slate-500 mt-1">Update your basic information and contact details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          disabled
          helperText="Username cannot be changed"
        />
        <TextField
          label="Emergency Contact"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          fullWidth
        />
        
        <TextField
          label="Email Address"
          value={technician?.email || ''}
          fullWidth
          disabled
          helperText="Email cannot be changed"
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={technician?.phone || ''}
          fullWidth
          disabled
          helperText="Phone number cannot be changed"
        />
      </div>

      <div className="pt-4 flex justify-end border-t border-slate-100">
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Personal Info'}
        </Button>
      </div>
    </form>
  );
}
