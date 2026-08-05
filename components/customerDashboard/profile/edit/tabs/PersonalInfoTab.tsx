'use client';

import { CustomerControllers } from '@/api/customerControllers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import { Avatar, CircularProgress, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function PersonalInfoTab() {
  const dispatch = useAppDispatch();
  const { profile, isLoading: isFetching, error } = useAppSelector(
    (state) => state.customerProfile
  );

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    profileImage: null as File | null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && !profile) {
      hasFetched.current = true;
      dispatch(fetchCustomerProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        emergencyContact: profile.emergencyContact ?? '',
        profileImage: null,
      });
      if (profile.profileImage) {
        setPreviewImage(profile.profileImage);
      }
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const hasChanged = 
      formData.firstName !== (profile?.firstName || '') ||
      formData.lastName !== (profile?.lastName || '') ||
      formData.email !== (profile?.email || '') ||
      formData.phone !== (profile?.phone || '') ||
      formData.emergencyContact !== (profile?.emergencyContact || '') ||
      formData.profileImage !== null;

    if (!hasChanged) {
      dispatch(showSnackbar({ message: 'No changes detected to update.', severity: 'info' }));
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      if (formData.email) {
        data.append('email', formData.email);
      }
      if (formData.phone) {
        const phoneParts = formData.phone.split(' ');
        if (phoneParts.length >= 2) {
          data.append('countryCode', phoneParts[0]);
          data.append('phone', phoneParts.slice(1).join('').replace(/\s/g, ''));
        } else {
          data.append('phone', formData.phone);
        }
      }
      if (formData.emergencyContact) {
        data.append('emergencyContact', formData.emergencyContact);
      }
      if (formData.profileImage) {
        data.append('profileImage', formData.profileImage);
      }

      await CustomerControllers.updateCustomerProfileWithFiles(data);
      dispatch(fetchCustomerProfile());
      dispatch(showSnackbar({ message: 'Profile updated successfully', severity: 'success' }));
      setFormData(prev => ({ ...prev, profileImage: null }));
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      dispatch(showSnackbar({ message: 'Failed to update profile', severity: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  if (isFetching && !profile) {
    return <div className="text-slate-500">Loading personal information...</div>;
  }

  if (error && !profile) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Personal Details</h3>
        <p className="text-sm text-slate-500 mt-1">Update your personal information here.</p>
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
            <span className="material-symbols-outlined text-sm">file_upload</span>
          </IconButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Enter last name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Enter email"
          />
        </div>

        {/* Phone - Disabled */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            disabled
            className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading || isFetching}
          className="
            flex justify-center items-center rounded-xl bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-all
          "
        >
          {loading ? <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} /> : null}
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
