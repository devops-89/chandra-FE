'use client';

import { useEffect, useRef,useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile, updateCustomerProfile } from '@/redux/slices/customerProfileSlice';

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
    emergencyContact: '',
  });

  const hasFetched = useRef(false);

  // Fetch profile on mount (only once)
  useEffect(() => {
    if (!hasFetched.current && !profile) {
      hasFetched.current = true;
      dispatch(fetchCustomerProfile());
    }
  }, [dispatch, profile]);

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const handleSubmit = async () => {
  try {
    await dispatch(
      updateCustomerProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        emergencyContact:
          formData.emergencyContact || null,
      })
    ).unwrap();

    alert('Profile updated successfully.');
  } catch (err) {
    alert(
      typeof err === 'string'
        ? err
        : 'Failed to update profile.'
    );
  }
};

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
          readOnly
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="rounded-xl border border-slate-300 bg-slate-100 p-4 text-slate-700 cursor-not-allowed"
        />

        <input
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          placeholder="Emergency Contact"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />
        {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
    {     error}
        </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="rounded-xl bg-emerald-600 px-6 py-3 cursor-pointer text-white transition-all duration-300 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
        {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}