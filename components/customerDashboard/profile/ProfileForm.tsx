'use client';

import { CheckCircle2, AlertCircle, Loader2, ShieldCheck, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DashboardCard } from '@/components/customerDashboard/shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile, updateCustomerProfile } from '@/redux/slices/customerProfileSlice';

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatDateTime(dateStr?: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(false);
    setIsSubmitting(true);

    try {
      await dispatch(
        updateCustomerProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          emergencyContact: formData.emergencyContact || null,
        })
      ).unwrap();

      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 4000);
    } catch (err) {
      setUpdateError(
        typeof err === 'string'
          ? err
          : 'Failed to update profile.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Skeleton Loader ──
  if (isLoading && !profile) {
    return (
      <div className="grid gap-6 lg:grid-cols-3 animate-pulse">
        <DashboardCard className="lg:col-span-2 space-y-6">
          <div className="h-6 w-48 bg-slate-200 rounded-md mb-4" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-10 bg-slate-100 rounded-xl" />
            <div className="h-10 bg-slate-100 rounded-xl" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-10 bg-slate-100 rounded-xl" />
            <div className="h-10 bg-slate-100 rounded-xl" />
          </div>
          <div className="h-10 bg-slate-100 rounded-xl" />
        </DashboardCard>

        <DashboardCard className="space-y-6">
          <div className="h-6 w-40 bg-slate-200 rounded-md mb-4" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="h-10 bg-slate-100 rounded-xl" />
            <div className="h-10 bg-slate-100 rounded-xl" />
            <div className="h-10 bg-slate-100 rounded-xl" />
            <div className="h-10 bg-slate-100 rounded-xl" />
          </div>
        </DashboardCard>
      </div>
    );
  }

  // ── Error View ──
  if (error && !profile) {
    return (
      <DashboardCard className="border-red-200 bg-red-50/40">
        <div className="flex items-center gap-3 text-red-600 mb-2">
          <AlertCircle className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Error Loading Profile</h2>
        </div>
        <p className="text-sm text-red-600 font-medium">{error}</p>
      </DashboardCard>
    );
  }

  const inputClasses =
    'mt-1.5 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-white';
  const readOnlyClasses =
    'mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-100/70 px-4 py-2.5 text-sm text-slate-600 cursor-not-allowed select-none font-medium';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── Top Feedback Banner ── */}
      {updateSuccess && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700 font-medium flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {(updateError || error) && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span>{updateError || error}</span>
        </div>
      )}

      {/* ── Main Layout Grid ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal Information (2 columns wide on desktop) */}
        <DashboardCard className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">Personal Information</h2>
                <p className="text-xs text-slate-500">Update your personal and contact details.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Row 1: First Name & Last Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Email Address</span>
                    <span className="text-[10px] lowercase text-slate-400 font-normal">(Read-only)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    value={formData.email}
                    placeholder="email@example.com"
                    className={readOnlyClasses}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Phone Number</span>
                    <span className="text-[10px] lowercase text-slate-400 font-normal">(Read-only)</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    readOnly
                    value={formData.phone}
                    placeholder="+91 0000000000"
                    className={readOnlyClasses}
                  />
                </div>
              </div>

              {/* Row 3: Emergency Contact */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210 (Relative / Guardian)"
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-8 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </DashboardCard>

        {/* Account Details (1 column wide on desktop) */}
        <DashboardCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">Account Details</h2>
                <p className="text-xs text-slate-500">System profile status & metadata.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Account Role
                </label>
                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100/70 px-4 py-2.5 text-sm font-medium text-slate-700">
                  <span className="capitalize">{profile?.role || 'Customer'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-semibold uppercase">
                    Verified
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Account Status
                </label>
                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100/70 px-4 py-2.5 text-sm font-medium text-slate-700">
                  <span className="capitalize">{profile?.status || 'Active'}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Member Since
                </label>
                <div className={readOnlyClasses}>
                  {formatDate(profile?.createdAt)}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Last Login
                </label>
                <div className={readOnlyClasses}>
                  {formatDateTime(profile?.lastLoginAt)}
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </form>
  );
}