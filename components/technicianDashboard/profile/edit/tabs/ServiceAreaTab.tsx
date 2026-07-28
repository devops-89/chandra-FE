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
    serviceRadiusKm: 15,
  });

  useEffect(() => {
    if (technician?.technicianProfile?.locations && technician.technicianProfile.locations.length > 0) {
      const loc = technician.technicianProfile.locations[0];
      setLocation({
        city: loc.city || '',
        state: loc.state || '',
        pincode: loc.pincode || '',
        fullAddress: loc.fullAddress || '',
        serviceRadiusKm: loc.serviceRadiusKm || 15,
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
      location.fullAddress !== (loc?.fullAddress || '') ||
      location.serviceRadiusKm !== (loc?.serviceRadiusKm || 15);

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
        <h3 className="text-xl font-bold text-slate-900">Service Area</h3>
        <p className="text-sm text-slate-500 mt-1">Let us know the areas you are comfortable serving. This helps us match you with the right opportunities.</p>
      </div>

      <div className="space-y-6 p-6 bg-white rounded-xl border border-slate-200 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">location_on</span>
            Service Area
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="areaSlider" className="text-gray-700 font-medium">
              Service Area
            </label>
            <div className="text-2xl font-bold text-emerald-700">{location.serviceRadiusKm} km</div>
          </div>

          <input
            id="areaSlider"
            type="range"
            min="5"
            max="50"
            step="5"
            value={location.serviceRadiusKm}
            onChange={(e) => setLocation(prev => ({ ...prev, serviceRadiusKm: Number(e.target.value) }))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            style={{
              background: `linear-gradient(to right, rgb(5, 150, 105) 0%, rgb(5, 150, 105) ${((location.serviceRadiusKm - 5) / 45) * 100}%, rgb(229, 231, 235) ${((location.serviceRadiusKm - 5) / 45) * 100}%, rgb(229, 231, 235) 100%)`,
            }}
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>5 km</span>
            <span>50 km</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-sm text-emerald-900">
            You can serve customers within <span className="font-semibold">{location.serviceRadiusKm} km</span> area from your location.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Service Area & Location</h3>
        <p className="text-sm text-slate-500 mt-1">Update your primary service location and address.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-white rounded-xl border border-slate-200">
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
