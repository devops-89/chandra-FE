'use client';

import { useEffect, useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector(
    (state) => state.customerProfile
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const hasFetched = useRef(false);

  // Fetch profile on mount (only once)
  useEffect(() => {
    if (!hasFetched.current && !profile) {
      hasFetched.current = true;
      console.log('Fetching customer profile...');
      dispatch(fetchCustomerProfile());
    }
  }, [dispatch, profile]);

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      console.log('Profile loaded:', profile);
      setFormData({
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
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

  if (isLoading && !profile) {
    return (
      <div
        className="
          rounded-3xl
          bg-white
          p-6
          shadow-lg
        "
      >
        <h2 className="mb-6 text-xl font-bold text-slate-950">
          Personal Information
        </h2>
        <div className="flex items-center justify-center py-8">
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div
        className="
          rounded-3xl
          bg-white
          p-6
          shadow-lg
        "
      >
        <h2 className="mb-6 text-xl font-bold text-slate-950">
          Personal Information
        </h2>
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <p className="font-semibold mb-2">Error loading profile:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
      "
    >
      <h2 className="mb-6 text-xl font-bold text-slate-950">
        Personal Information
      </h2>

      <div className="grid gap-5">
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <button
          className="rounded-xl bg-emerald-600 px-6 py-3 cursor-pointer text-white transition-all duration-300 hover:bg-emerald-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}