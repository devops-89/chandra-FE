'use client';

import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@/redux/hooks';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import { userSecuredApi } from '@/api/config';

export default function AdminAddTechnicianForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
      phone: Yup.string().test('is-valid-phone', 'Invalid phone number', (value) => {
        if (!value) return false;
        return matchIsValidTel(value);
      }).required('Phone number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await userSecuredApi.post('/users/admin/technician', values);
        dispatch(showSnackbar({ message: 'Technician added successfully', severity: 'success' }));
        setTimeout(() => {
          router.push('/admin/technicians');
        }, 1000);
      } catch (error: any) {
        console.error(error);
        const msg = error.response?.data?.message || 'Failed to add technician';
        dispatch(showSnackbar({ message: msg, severity: 'error' }));
        setLoading(false);
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Add New Technician
        </Typography>
        <Button 
          onClick={() => router.back()} 
          startIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          }
          sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}
        >
          Back
        </Button>
      </Box>

      <Card sx={{ p: 4, borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              fullWidth
              variant="outlined"
            />
          </Box>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            fullWidth
            variant="outlined"
          />
          <MuiTelInput
            fullWidth
            defaultCountry="IN"
            forceCallingCode
            placeholder=""
            label="Phone Number"
            name="phone"
            value={formik.values.phone}
            onChange={(val) => formik.setFieldValue('phone', val)}
            onBlur={() => formik.setFieldTouched('phone', true)}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            variant="outlined"
          />
          
          <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              onClick={() => router.back()}
              disabled={loading}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ 
                bgcolor: '#059669', 
                '&:hover': { bgcolor: '#047857' },
                textTransform: 'none',
                fontWeight: 600,
                px: 4
              }}
            >
              {loading ? 'Adding...' : 'Add Technician'}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
