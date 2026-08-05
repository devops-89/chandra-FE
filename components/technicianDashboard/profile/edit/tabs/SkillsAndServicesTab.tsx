'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, FormGroup, OutlinedInput, Chip, Box, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText, ListItemButton, FormHelperText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { ServiceControllers } from '@/api/serviceControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu',
  'Kannada', 'Malayalam', 'Marathi', 'Bengali',
];

const BRANDS = [
  'Samsung', 'LG', 'Daikin', 'Voltas', 'Hitachi', 'Panasonic', 'Whirlpool', 'Carrier', 'Blue Star'
];

const validationSchema = yup.object({
  yearsOfExperience: yup.number().required('Years of experience is required').min(0, 'Cannot be negative').max(60, 'Max 60 years allowed'),
  languages: yup.array().of(yup.string()),
  brandExpertise: yup.array().of(yup.string()),
  hasLadder: yup.boolean(),
  hasACGauges: yup.boolean(),
  hasSafetyEquipment: yup.boolean(),
  hasVehicle: yup.boolean(),
});

export default function SkillsAndServicesTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  
  const [loading, setLoading] = useState(false);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  
  const formik = useFormik({
    initialValues: {
      yearsOfExperience: 0,
      languages: [] as string[],
      brandExpertise: [] as string[],
      hasLadder: false,
      hasACGauges: false,
      hasSafetyEquipment: false,
      hasVehicle: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const tp = technician?.technicianProfile;
      const arrayEquals = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i]);
      const oldBrands = tp?.brandExpertise?.map(b => b.brandName) || [];
      
      const hasMainProfileChanged = 
        values.yearsOfExperience !== (tp?.yearsOfExperience || 0) ||
        values.hasLadder !== (tp?.hasLadder || false) ||
        values.hasACGauges !== (tp?.hasACGauges || false) ||
        values.hasSafetyEquipment !== (tp?.hasSafetyEquipment || false) ||
        values.hasVehicle !== (tp?.hasVehicle || false) ||
        !arrayEquals(values.languages, tp?.languages || []);
        
      const hasBrandExpertiseChanged = !arrayEquals(values.brandExpertise, oldBrands);
        
      if (!hasMainProfileChanged && !hasBrandExpertiseChanged) {
        dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
        return;
      }

      try {
        setLoading(true);
        const apiCalls = [];
        
        if (hasBrandExpertiseChanged) {
          apiCalls.push(TechnicianControllers.updateBrandExpertise(values.brandExpertise));
        }
        
        if (hasMainProfileChanged) {
          const data = new FormData();
          const technicianProfilePayload = {
            yearsOfExperience: values.yearsOfExperience,
            languages: values.languages,
            hasLadder: values.hasLadder,
            hasACGauges: values.hasACGauges,
            hasSafetyEquipment: values.hasSafetyEquipment,
            hasVehicle: values.hasVehicle,
          };
          data.append('technicianProfile', JSON.stringify(technicianProfilePayload));
          
          apiCalls.push(TechnicianControllers.updateTechnicianProfileWithFiles(data));
        }
        
        await Promise.all(apiCalls);
        
        dispatch(fetchTechnicianProfile());
        dispatch(showSnackbar({ message: 'Skills updated successfully', severity: 'success' }));
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    if (technician?.technicianProfile) {
      formik.setValues({
        yearsOfExperience: technician.technicianProfile.yearsOfExperience || 0,
        languages: technician.technicianProfile.languages || [],
        brandExpertise: technician.technicianProfile.brandExpertise?.map(b => b.brandName) || [],
        hasLadder: technician.technicianProfile.hasLadder || false,
        hasACGauges: technician.technicianProfile.hasACGauges || false,
        hasSafetyEquipment: technician.technicianProfile.hasSafetyEquipment || false,
        hasVehicle: technician.technicianProfile.hasVehicle || false,
      });
      setSelectedServiceIds(technician.technicianProfile.services?.map((s: any) => s.serviceId) || []);
    }
  }, [technician]);

  useEffect(() => {
    if (servicesModalOpen && allServices.length === 0) {
      ServiceControllers.getAllServices().then(res => setAllServices(res)).catch(console.error);
    }
  }, [servicesModalOpen]);

  const handleSaveServices = async () => {
    try {
      setLoading(true);
      // Filter out any stale/inactive service IDs that might still be in the profile
      const validServiceIds = selectedServiceIds.filter(id => allServices.some(s => s.id === id));
      await TechnicianControllers.updateTechnicianServices(validServiceIds);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Services updated successfully', severity: 'success' }));
      setServicesModalOpen(false);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMultiSelectChange = (event: any) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900">Skills & Professional Details</h3>
          <p className="text-sm text-slate-500 mt-1">Update your experience, skills, and equipment availability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formik.values.yearsOfExperience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
            helperText={(formik.touched.yearsOfExperience && formik.errors.yearsOfExperience) as string}
            fullWidth
          />
          <FormControl fullWidth error={formik.touched.languages && Boolean(formik.errors.languages)}>
            <InputLabel>Languages Known</InputLabel>
            <Select
              multiple
              name="languages"
              value={formik.values.languages}
              onChange={handleMultiSelectChange}
              onBlur={formik.handleBlur}
              input={<OutlinedInput label="Languages Known" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={{
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                transformOrigin: { vertical: 'top', horizontal: 'left' },
                slotProps: { paper: { style: { maxHeight: 300 } } },
              }}
            >
              {LANGUAGES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.languages && formik.errors.languages && (
              <FormHelperText>{formik.errors.languages as string}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={formik.touched.brandExpertise && Boolean(formik.errors.brandExpertise)}>
            <InputLabel>Brand Expertise</InputLabel>
            <Select
              multiple
              name="brandExpertise"
              value={formik.values.brandExpertise}
              onChange={handleMultiSelectChange}
              onBlur={formik.handleBlur}
              input={<OutlinedInput label="Brand Expertise" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
              MenuProps={{
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                transformOrigin: { vertical: 'top', horizontal: 'left' },
                slotProps: { paper: { style: { maxHeight: 300 } } },
              }}
            >
              {BRANDS.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.brandExpertise && formik.errors.brandExpertise && (
              <FormHelperText>{formik.errors.brandExpertise as string}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mt-6">
          <h4 className="font-medium text-slate-800 mb-3">Equipments & Assets</h4>
          <FormGroup row className="gap-x-6 gap-y-2">
            <FormControlLabel 
              control={<Checkbox checked={formik.values.hasLadder} onChange={(e) => formik.setFieldValue('hasLadder', e.target.checked)} name="hasLadder" color="success" />} 
              label={<span className="text-sm font-medium text-slate-700">Ladder</span>} 
            />
            <FormControlLabel 
              control={<Checkbox checked={formik.values.hasACGauges} onChange={(e) => formik.setFieldValue('hasACGauges', e.target.checked)} name="hasACGauges" color="success" />} 
              label={<span className="text-sm font-medium text-slate-700">AC Gauges</span>} 
            />
            <FormControlLabel 
              control={<Checkbox checked={formik.values.hasSafetyEquipment} onChange={(e) => formik.setFieldValue('hasSafetyEquipment', e.target.checked)} name="hasSafetyEquipment" color="success" />} 
              label={<span className="text-sm font-medium text-slate-700">Safety Equipment</span>} 
            />
            <FormControlLabel 
              control={<Checkbox checked={formik.values.hasVehicle} onChange={(e) => formik.setFieldValue('hasVehicle', e.target.checked)} name="hasVehicle" color="success" />} 
              label={<span className="text-sm font-medium text-slate-700">Vehicle</span>} 
            />
          </FormGroup>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-slate-800">Assigned Services</h4>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => setServicesModalOpen(true)}
              sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
            >
              Manage Services
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {technician?.technicianProfile?.services?.map((s: any) => (
              <Chip key={s.serviceId} label={s.service?.name} sx={{ borderRadius: '8px', fontWeight: 500, bgcolor: 'white', border: '1px solid #e2e8f0' }} />
            ))}
            {(!technician?.technicianProfile?.services || technician.technicianProfile.services.length === 0) && (
              <span className="text-sm text-slate-500">No services assigned.</span>
            )}
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-slate-100">
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading || !formik.isValid}
            sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Skills'}
          </Button>
        </div>
      </form>

      <Dialog 
        open={servicesModalOpen} 
        onClose={() => setServicesModalOpen(false)} 
        maxWidth="sm" 
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0f172a' }}>Manage Services</DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <List sx={{ pt: 0, pb: 0 }}>
            {allServices.map(service => (
              <ListItem 
                key={service.id} 
                dense 
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setSelectedServiceIds(prev => prev.includes(service.id) ? prev.filter(id => id !== service.id) : [...prev, service.id]);
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <Checkbox 
                      edge="start" 
                      checked={selectedServiceIds.includes(service.id)} 
                      disableRipple 
                      color="success"
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Box component="span" sx={{ fontWeight: 500, color: '#334155' }}>{service.name}</Box>} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
            {allServices.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Loading services...</p>
            )}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: '1px solid #f1f5f9' }}>
          <Button 
            onClick={() => setServicesModalOpen(false)}
            sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveServices} 
            variant="contained" 
            disabled={loading} 
            sx={{ 
              borderRadius: '10px', 
              px: 3, 
              py: 1, 
              backgroundColor: '#059669', 
              '&:hover': { backgroundColor: '#047857' }, 
              textTransform: 'none', 
              fontWeight: 600, 
              boxShadow: 'none' 
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Services'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
