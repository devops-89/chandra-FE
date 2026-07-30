'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, FormGroup, OutlinedInput, Chip, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';
import { TechnicianControllers } from '@/api/technicianControllers';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

const LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu',
  'Kannada', 'Malayalam', 'Marathi', 'Bengali',
];

const BRANDS = [
  'Samsung', 'LG', 'Daikin', 'Voltas', 'Hitachi', 'Panasonic', 'Whirlpool', 'Carrier', 'Blue Star'
];

export default function SkillsAndServicesTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    technicianProfile: {
      yearsOfExperience: 0,
      jobStatus: 'AVAILABLE',
      languages: [] as string[],
      brandExpertise: [] as string[],
      hasLadder: false,
      hasACGauges: false,
      hasSafetyEquipment: false,
      hasVehicle: false,
    }
  });

  useEffect(() => {
    if (technician?.technicianProfile) {
      setFormData({
        technicianProfile: {
          yearsOfExperience: technician.technicianProfile.yearsOfExperience || 0,
          jobStatus: technician.technicianProfile.jobStatus || 'AVAILABLE',
          languages: technician.technicianProfile.languages || [],
          brandExpertise: technician.technicianProfile.brandExpertise?.map(b => b.brandName) || [],
          hasLadder: technician.technicianProfile.hasLadder || false,
          hasACGauges: technician.technicianProfile.hasACGauges || false,
          hasSafetyEquipment: technician.technicianProfile.hasSafetyEquipment || false,
          hasVehicle: technician.technicianProfile.hasVehicle || false,
        }
      });
    }
  }, [technician]);

  const handleProfileChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      technicianProfile: {
        ...prev.technicianProfile,
        [name]: type === 'checkbox' ? checked : (name === 'yearsOfExperience' ? Number(value) : value)
      }
    }));
  };

  const handleMultiSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      technicianProfile: {
        ...prev.technicianProfile,
        [name]: typeof value === 'string' ? value.split(',') : value,
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Deep compare to check if anything changed
    const tp = technician?.technicianProfile;
    const fd = formData.technicianProfile;
    
    const arrayEquals = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i]);
    const oldBrands = tp?.brandExpertise?.map(b => b.brandName) || [];
    
    const hasChanged = 
      fd.yearsOfExperience !== (tp?.yearsOfExperience || 0) ||
      fd.jobStatus !== (tp?.jobStatus || 'AVAILABLE') ||
      fd.hasLadder !== (tp?.hasLadder || false) ||
      fd.hasACGauges !== (tp?.hasACGauges || false) ||
      fd.hasSafetyEquipment !== (tp?.hasSafetyEquipment || false) ||
      fd.hasVehicle !== (tp?.hasVehicle || false) ||
      !arrayEquals(fd.languages, tp?.languages || []) ||
      !arrayEquals(fd.brandExpertise, oldBrands);
      
    if (!hasChanged) {
      dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
      return;
    }

    try {
      setLoading(true);
      // Transform brandExpertise back to array of objects
      const payload: any = {
        technicianProfile: {
          ...formData.technicianProfile,
          brandExpertise: formData.technicianProfile.brandExpertise.map(brandName => ({ brandName }))
        }
      };
      await TechnicianControllers.updateTechnicianProfile(payload);
      dispatch(fetchTechnicianProfile());
      dispatch(showSnackbar({ message: 'Skills & Services updated successfully', severity: 'success' }));
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Skills & Professional Details</h3>
        <p className="text-sm text-slate-500 mt-1">Update your experience, skills, and equipment availability.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          value={formData.technicianProfile.yearsOfExperience}
          onChange={handleProfileChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Job Status</InputLabel>
          <Select
            name="jobStatus"
            value={formData.technicianProfile.jobStatus}
            onChange={handleProfileChange}
            label="Job Status"
          >
            <MenuItem value="AVAILABLE">Available</MenuItem>
            <MenuItem value="BUSY">Busy</MenuItem>
            <MenuItem value="OFFLINE">Offline</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Languages Known</InputLabel>
          <Select
            multiple
            name="languages"
            value={formData.technicianProfile.languages}
            onChange={handleMultiSelectChange}
            input={<OutlinedInput label="Languages Known" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {LANGUAGES.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Brand Expertise</InputLabel>
          <Select
            multiple
            name="brandExpertise"
            value={formData.technicianProfile.brandExpertise}
            onChange={handleMultiSelectChange}
            input={<OutlinedInput label="Brand Expertise" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {BRANDS.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mt-6">
        <h4 className="font-medium text-slate-800 mb-3">Equipments & Assets</h4>
        <FormGroup row className="gap-x-6 gap-y-2">
          <FormControlLabel 
            control={<Checkbox checked={formData.technicianProfile.hasLadder} onChange={handleProfileChange} name="hasLadder" color="success" />} 
            label={<span className="text-sm font-medium text-slate-700">Ladder</span>} 
          />
          <FormControlLabel 
            control={<Checkbox checked={formData.technicianProfile.hasACGauges} onChange={handleProfileChange} name="hasACGauges" color="success" />} 
            label={<span className="text-sm font-medium text-slate-700">AC Gauges</span>} 
          />
          <FormControlLabel 
            control={<Checkbox checked={formData.technicianProfile.hasSafetyEquipment} onChange={handleProfileChange} name="hasSafetyEquipment" color="success" />} 
            label={<span className="text-sm font-medium text-slate-700">Safety Equipment</span>} 
          />
          <FormControlLabel 
            control={<Checkbox checked={formData.technicianProfile.hasVehicle} onChange={handleProfileChange} name="hasVehicle" color="success" />} 
            label={<span className="text-sm font-medium text-slate-700">Vehicle</span>} 
          />
        </FormGroup>
      </div>

      <div className="pt-4 flex justify-end border-t border-slate-100">
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Skills & Services'}
        </Button>
      </div>
    </form>
  );
}
