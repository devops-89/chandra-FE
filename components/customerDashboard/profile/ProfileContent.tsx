'use client';

import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Collapse,
    Divider,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { CustomerControllers } from '@/api/customerControllers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

export default function ProfileContent() {
  const dispatch = useAppDispatch();
  const { profile, isLoading } = useAppSelector((state) => state.customerProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCustomerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.profileImage) {
      setPreviewImage(profile.profileImage);
    }
  }, [profile]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      phone: profile?.phone || '',
      email: profile?.email || '',
      emergencyContact: profile?.emergencyContact || '',
      profileImage: null as File | null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string(),
      email: Yup.string().email('Invalid email format'),
      emergencyContact: Yup.string().test('is-valid-phone', 'Invalid phone number format', (value) => {
        if (!value) return true; // optional
        return matchIsValidTel(value);
      }),
    }),
    onSubmit: async (values) => {
      if (!formik.dirty) {
        dispatch(showSnackbar({ message: 'No changes detected', severity: 'info' }));
        setIsEditing(false);
        return;
      }
      setIsUpdating(true);
      try {
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        if (values.email) formData.append('email', values.email);
        if (values.phone) {
          const phoneParts = values.phone.split(' ');
          if (phoneParts.length >= 2) {
            formData.append('countryCode', phoneParts[0]);
            formData.append('phone', phoneParts.slice(1).join('').replace(/\s/g, ''));
          } else {
            formData.append('phone', values.phone);
          }
        }
        if (values.emergencyContact) formData.append('emergencyContact', values.emergencyContact);
        if (values.profileImage) formData.append('profileImage', values.profileImage);

        await CustomerControllers.updateCustomerProfileWithFiles(formData);
        dispatch(fetchCustomerProfile());
        dispatch(showSnackbar({ message: 'Profile updated successfully', severity: 'success' }));
        setIsEditing(false);
        formik.setFieldValue('profileImage', null);
      } catch (error) {
        console.error('Failed to update profile:', error);
        dispatch(showSnackbar({ message: 'Failed to update profile', severity: 'error' }));
      } finally {
        setIsUpdating(false);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      formik.setFieldValue('profileImage', file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (isLoading && !profile) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  const userName = profile 
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Customer'
    : 'Customer';
  const foundAvatar = previewImage || profile?.profileImage || '';

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', pb: 8 }}>
      <Paper
        elevation={0}
        sx={{
          padding: { xs: 3, md: 4 },
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Profile Summary
          </Typography>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
            color={isEditing ? 'inherit' : 'success'}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            {isEditing ? 'Cancel' : 'Edit Details'}
          </Button>
        </Box>
        
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {/* Left Column: Avatar & Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: { xs: 2, md: 0 }, pb: 4, px: 2, height: '100%', justifyContent: 'flex-start' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={foundAvatar || undefined}
                  sx={{
                    width: 140,
                    height: 140,
                    mb: 3,
                    border: '4px solid #fff',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                    bgcolor: 'success.main',
                    fontSize: '3rem'
                  }}
                >
                  {!foundAvatar && userName && userName !== 'Customer' ? userName.charAt(0).toUpperCase() : null}
                </Avatar>
                {isEditing && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <IconButton
                      onClick={() => fileInputRef.current?.click()}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 28,
                        right: 4,
                        backgroundColor: '#059669',
                        color: 'white',
                        '&:hover': { backgroundColor: '#047857' },
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    >
                      <span className="material-symbols-outlined text-sm">file_upload</span>
                    </IconButton>
                  </>
                )}
              </Box>
              
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', textAlign: 'center' }}>
                {userName}
              </Typography>
              
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                {profile?.email && (
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {profile.email}
                  </Typography>
                )}
                {profile?.username && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    @{profile.username}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Data Summary */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 2 } }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                    First Name:
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    {profile?.firstName || '-'}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                    Last Name:
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    {profile?.lastName || '-'}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                    Phone Number:
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    {profile?.phone || '-'}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                    Emergency Contact:
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    {profile?.emergencyContact || '-'}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                    Account Status:
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 600, textTransform: 'capitalize' }}>
                    {profile?.status || '-'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Collapsible Edit Section */}
      <Collapse in={isEditing}>
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            padding: { xs: 3, md: 4 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
              Update Information
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Edit your profile details below. Phone number and username cannot be changed.
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName as string}
                  color="success"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName as string}
                  color="success"
                />
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email as string}
                  color="success"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <MuiTelInput
                  fullWidth
                  defaultCountry="IN"
                  forceCallingCode
                  placeholder=""
                  id="emergencyContact"
                  name="emergencyContact"
                  label="Emergency Contact (Optional)"
                  value={formik.values.emergencyContact}
                  onChange={(val) => formik.setFieldValue('emergencyContact', val)}
                  onBlur={() => formik.setFieldTouched('emergencyContact', true)}
                  error={formik.touched.emergencyContact && Boolean(formik.errors.emergencyContact)}
                  helperText={formik.touched.emergencyContact && formik.errors.emergencyContact as string}
                  color="success"
                  sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#fff' }
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => {
                      formik.resetForm();
                      setIsEditing(false);
                      setPreviewImage(profile?.profileImage || null);
                    }}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={isUpdating || !formik.dirty}
                    sx={{ px: 4, borderRadius: 2 }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Collapse>
    </Box>
  );
}
