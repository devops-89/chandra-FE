'use client';

import { useState } from 'react';
import { TextField, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Switch, FormControlLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup.string().required('Pincode is required').matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  fullAddress: yup.string().required('Full address is required'),
  serviceRadiusKm: yup.number().required('Service radius is required').min(5, 'Minimum 5 km').max(50, 'Maximum 50 km'),
});

export default function ServiceAreaTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const locations = technician?.technicianProfile?.locations || [];
  
  const [loading, setLoading] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLocId, setEditingLocId] = useState<number | null>(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);
  
  const initialFormValues = {
    city: '',
    state: '',
    pincode: '',
    fullAddress: '',
    serviceRadiusKm: 15,
    latitude: 28.6139,
    longitude: 77.2090,
    isActive: true,
    isDefault: true,
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (editingLocId) {
          await TechnicianControllers.updateTechnicianLocation(editingLocId, values);
          dispatch(showSnackbar({ message: 'Location updated successfully', severity: 'success' }));
        } else {
          await TechnicianControllers.addTechnicianLocation(values);
          dispatch(showSnackbar({ message: 'Location added successfully', severity: 'success' }));
        }
        dispatch(fetchTechnicianProfile());
        setModalOpen(false);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleOpenAdd = () => {
    formik.resetForm({ values: initialFormValues });
    setEditingLocId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (loc: any) => {
    formik.resetForm({
      values: {
        city: loc.city || '',
        state: loc.state || '',
        pincode: loc.pincode || '',
        fullAddress: loc.fullAddress || '',
        serviceRadiusKm: loc.serviceRadiusKm || 15,
        latitude: loc.latitude || 28.6139,
        longitude: loc.longitude || 77.2090,
        isActive: loc.isActive ?? true,
        isDefault: loc.isDefault ?? true,
      }
    });
    setEditingLocId(loc.id);
    setModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setLocationToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!locationToDelete) return;
    try {
      setLoading(true);
      await TechnicianControllers.deleteTechnicianLocation(locationToDelete);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Location deleted successfully', severity: 'success' }));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setLocationToDelete(null);
    }
  };

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      dispatch(showSnackbar({ message: 'Geolocation is not supported by your browser', severity: 'error' }));
      return;
    }
    
    setIsFetchingLocation(true);
    
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      formik.setFieldValue('latitude', lat);
      formik.setFieldValue('longitude', lng);
      
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        if (!response.ok) throw new Error('Failed to fetch address');
        const data = await response.json();
        
        if (data.address) {
          formik.setValues((prev) => ({
            ...prev,
            city: data.address.city || data.address.town || data.address.village || prev.city,
            state: data.address.state || prev.state,
            pincode: data.address.postcode || prev.pincode,
            fullAddress: data.display_name || prev.fullAddress
          }));
          dispatch(showSnackbar({ message: 'Location details automatically filled!', severity: 'success' }));
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
        dispatch(showSnackbar({ message: 'Failed to auto-detect address details. Please fill them manually.', severity: 'error' }));
      } finally {
        setIsFetchingLocation(false);
      }
    }, (err) => {
      dispatch(showSnackbar({ message: `Location error: ${err.message}`, severity: 'error' }));
      setIsFetchingLocation(false);
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Service Areas</h3>
          <p className="text-sm text-slate-500 mt-1">Manage the areas and addresses you are comfortable serving.</p>
        </div>
        <Button 
          variant="contained" 
          onClick={handleOpenAdd}
          startIcon={<span className="material-symbols-outlined text-sm">add</span>}
          sx={{ borderRadius: '8px', backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' }, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
        >
          Add Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {locations.map((loc: any) => (
          <div key={loc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative transition-all hover:shadow-md">
            <div className="absolute top-4 right-4 flex gap-1">
              <IconButton size="small" onClick={() => handleOpenEdit(loc)} sx={{ color: '#0ea5e9', backgroundColor: '#f0f9ff' }}>
                <span className="material-symbols-outlined text-lg">edit</span>
              </IconButton>
              <IconButton size="small" onClick={() => confirmDelete(loc.id)} sx={{ color: '#ef4444', backgroundColor: '#fef2f2' }}>
                <span className="material-symbols-outlined text-lg">delete</span>
              </IconButton>
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-emerald-700">
              <span className="material-symbols-outlined">location_on</span>
              <h4 className="font-semibold text-lg text-slate-800">{loc.city}{loc.state ? `, ${loc.state}` : ''}</h4>
            </div>
            
            <div className="text-sm text-slate-600 space-y-3">
              <p className="flex flex-col gap-1">
                <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">Address</span>
                <span className="text-slate-700 font-medium">{loc.fullAddress}</span>
              </p>
              <div className="flex justify-between items-end">
                <p className="flex flex-col gap-1">
                  <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">Pincode</span>
                  <span className="text-slate-700 font-medium">{loc.pincode}</span>
                </p>
                <p className="flex flex-col items-end gap-1">
                  <span className="font-medium text-slate-400 text-xs uppercase tracking-wider">Radius</span>
                  <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md font-bold">{loc.serviceRadiusKm} km</span>
                </p>
              </div>
            </div>
          </div>
        ))}
        {locations.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">location_off</span>
            No locations found. Add your primary service location.
          </div>
        )}
      </div>

      <Dialog 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        maxWidth="md" 
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
      >
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogTitle sx={{ fontWeight: 700, color: '#0f172a' }}>
            {editingLocId ? 'Edit Location' : 'Add New Location'}
          </DialogTitle>
          <DialogContent dividers className="space-y-6" sx={{ p: 4 }}>
            <button
              type="button"
              onClick={handleFetchLocation}
              disabled={isFetchingLocation}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-emerald-200"
            >
              {isFetchingLocation ? <CircularProgress size={16} color="inherit" /> : <span className="material-symbols-outlined text-[18px]">my_location</span>}
              {isFetchingLocation ? 'Locating...' : 'Use Current Location'}
            </button>

            <div className="space-y-4 mb-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between">
                <label htmlFor="areaSlider" className="text-gray-700 font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600">radar</span>
                  Service Radius
                </label>
                <div className="text-2xl font-bold text-emerald-700">{formik.values.serviceRadiusKm} km</div>
              </div>

              <input
                id="areaSlider"
                name="serviceRadiusKm"
                type="range"
                min="5"
                max="50"
                step="5"
                value={formik.values.serviceRadiusKm}
                onChange={formik.handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 mt-2"
                style={{
                  background: `linear-gradient(to right, rgb(5, 150, 105) 0%, rgb(5, 150, 105) ${((formik.values.serviceRadiusKm - 5) / 45) * 100}%, rgb(229, 231, 235) ${((formik.values.serviceRadiusKm - 5) / 45) * 100}%, rgb(229, 231, 235) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>5 km</span>
                <span>50 km</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={(formik.touched.city && formik.errors.city) as string}
                fullWidth
                required
              />
              <TextField
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={(formik.touched.state && formik.errors.state) as string}
                fullWidth
                required
              />
              <TextField
                label="Pincode"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={(formik.touched.pincode && formik.errors.pincode) as string}
                fullWidth
                required
              />
              <TextField
                label="Full Address"
                name="fullAddress"
                value={formik.values.fullAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullAddress && Boolean(formik.errors.fullAddress)}
                helperText={(formik.touched.fullAddress && formik.errors.fullAddress) as string}
                fullWidth
                multiline
                rows={3}
                sx={{ gridColumn: '1 / -1' }}
                required
              />
            </div>
            
            <div className="flex gap-6 pt-4 border-t border-slate-100">
              <FormControlLabel 
                control={<Switch checked={formik.values.isActive} onChange={(e) => formik.setFieldValue('isActive', e.target.checked)} color="success" />} 
                label={<span className="text-sm font-medium text-slate-700">Active Location</span>} 
              />
              <FormControlLabel 
                control={<Switch checked={formik.values.isDefault} onChange={(e) => formik.setFieldValue('isDefault', e.target.checked)} color="success" />} 
                label={<span className="text-sm font-medium text-slate-700">Set as Default</span>} 
              />
            </div>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, borderTop: '1px solid #f1f5f9' }}>
            <Button onClick={() => setModalOpen(false)} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading || !formik.isValid} 
              sx={{ borderRadius: '10px', px: 3, py: 1, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' }, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Location'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog 
        open={deleteModalOpen} 
        onClose={() => !loading && setDeleteModalOpen(false)}
        maxWidth="xs"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0f172a', textAlign: 'center', pb: 1 }}>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
          </div>
          Delete Location
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <p className="text-sm text-slate-500">
            Are you sure you want to delete this service location? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, pt: 1, gap: 2 }}>
          <Button 
            onClick={() => setDeleteModalOpen(false)} 
            disabled={loading}
            sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600, border: '1px solid #e2e8f0', borderRadius: '10px', px: 4 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="contained" 
            disabled={loading} 
            sx={{ borderRadius: '10px', px: 4, py: 1, backgroundColor: '#ef4444', '&:hover': { backgroundColor: '#dc2626' }, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
