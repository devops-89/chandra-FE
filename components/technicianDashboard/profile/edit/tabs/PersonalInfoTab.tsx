'use client';

import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, IconButton,TextField } from '@mui/material';
import { useFormik } from 'formik';
import { matchIsValidTel,MuiTelInput } from 'mui-tel-input';
import { useEffect, useRef,useState } from 'react';
import * as yup from 'yup';

import { TechnicianControllers } from '@/api/technicianControllers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string(),
  email: yup.string().email('Invalid email address').nullable(),
  emergencyContact: yup.string().test('is-valid-phone', 'Invalid phone number format', (value) => {
    if (!value) return true; // optional
    return matchIsValidTel(value);
  }),
});

export default function PersonalInfoTab() {
  const dispatch = useAppDispatch();
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      emergencyContact: '',
      profileImage: null as File | null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Check if anything actually changed
      const hasChanged = 
        values.firstName !== (technician?.firstName || '') ||
        values.lastName !== (technician?.lastName || '') ||
        values.email !== (technician?.email || '') ||
        values.emergencyContact !== (technician?.emergencyContact || '') ||
        values.profileImage !== null;
        
      if (!hasChanged) {
        dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
        return;
      }

      try {
        setLoading(true);
        const data = new FormData();
        data.append('firstName', values.firstName);
        data.append('lastName', values.lastName);
        if (values.email) {
          data.append('email', values.email);
        }
        if (values.emergencyContact) {
            data.append('emergencyContact', values.emergencyContact);
        }
        if (values.profileImage) {
            data.append('profileImage', values.profileImage);
        }
        
        await TechnicianControllers.updateTechnicianProfileWithFiles(data);
        dispatch(fetchTechnicianProfile());
        dispatch(showSnackbar({ message: 'Personal info updated successfully', severity: 'success' }));
        formik.setFieldValue('profileImage', null);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (technician) {
      formik.setValues({
        firstName: technician.firstName || '',
        lastName: technician.lastName || '',
        email: technician.email || '',
        emergencyContact: technician.emergencyContact || '',
        profileImage: null,
      });
      const existingImage = technician.profileImage || (technician.technicianProfile as any)?.profileImage;
      if (existingImage) {
        setPreviewImage(existingImage);
      }
    }
  }, [technician]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      formik.setFieldValue('profileImage', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Personal Details</h3>
        <p className="text-sm text-slate-500 mt-1">Update your basic information, contact details, and profile photo.</p>
      </div>

      <div className="flex flex-col items-center sm:items-start mb-8">
        <div className="relative">
          <Avatar
            src={previewImage || ''}
            alt="Profile Image"
            sx={{ width: 120, height: 120, border: '4px solid white', boxShadow: '0 4px 10px -1px rgb(0 0 0 / 0.1)' }}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <IconButton
            onClick={() => fileInputRef.current?.click()}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              backgroundColor: '#059669',
              color: 'white',
              '&:hover': { backgroundColor: '#047857' },
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            <PhotoCamera fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={(formik.touched.firstName && formik.errors.firstName) as string}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={(formik.touched.lastName && formik.errors.lastName) as string}
          fullWidth
        />
        <TextField
          label="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={(formik.touched.email && formik.errors.email) as string}
          fullWidth
        />
        <MuiTelInput
          defaultCountry="IN"
          forceCallingCode
          placeholder=""
          label="Emergency Contact"
          name="emergencyContact"
          value={formik.values.emergencyContact}
          onChange={(val) => formik.setFieldValue('emergencyContact', val)}
          onBlur={() => formik.setFieldTouched('emergencyContact', true)}
          error={formik.touched.emergencyContact && Boolean(formik.errors.emergencyContact)}
          helperText={(formik.touched.emergencyContact && formik.errors.emergencyContact) as string}
          fullWidth
        />
      </div>

      <div className="pt-4 flex justify-end border-t border-slate-100">
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading || !formik.isValid}
          sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Personal Info'}
        </Button>
      </div>
    </form>
  );
}
