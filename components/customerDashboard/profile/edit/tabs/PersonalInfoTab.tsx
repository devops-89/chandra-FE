'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile, updateCustomerProfile } from '@/redux/slices/customerProfileSlice';

export default function PersonalInfoTab() {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector(
    (state) => state.customerProfile
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
  });

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
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        updateCustomerProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          emergencyContact: formData.emergencyContact,
        })
      ).unwrap();
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (isLoading && !profile) {
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

        {/* Email - Disabled */}
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
            disabled
            className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 cursor-not-allowed"
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
          disabled={isLoading}
          className="
            rounded-xl bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-all
          "
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
