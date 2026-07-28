'use client';

import { AlertCircle, ShieldCheck, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { DashboardCard } from '@/components/customerDashboard/shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';

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

  const hasFetched = useRef(false);

  // Fetch profile on mount (only once if missing)
  useEffect(() => {
    if (!hasFetched.current && !profile) {
      hasFetched.current = true;
      dispatch(fetchCustomerProfile());
    }
  }, [dispatch, profile]);

  // Derived field values directly from Redux state (no internal state needed for view-only component)
  const firstName = profile?.firstName ?? '';
  const lastName = profile?.lastName ?? '';
  const email = profile?.email ?? '';
  const phone = profile?.phone ?? '';
  const emergencyContact = profile?.emergencyContact ?? '';

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

  const readOnlyClasses =
    'mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-100/70 px-4 py-2.5 text-sm text-slate-600 cursor-not-allowed select-none font-medium';

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span>{error}</span>
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
                <p className="text-xs text-slate-500">Your account and contact details.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Row 1: First Name & Last Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    First Name
                  </label>
                  <div className={readOnlyClasses}>
                    {firstName || '—'}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Last Name
                  </label>
                  <div className={readOnlyClasses}>
                    {lastName || <span className="text-slate-400 font-normal italic">Not Provided</span>}
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="flex text-xs font-semibold uppercase tracking-wider text-slate-500 items-center justify-between">
                    <span>Email Address</span>
                    <span className="text-[10px] lowercase text-slate-400 font-normal">(Read-only)</span>
                  </label>
                  <div className={readOnlyClasses}>
                    {email || <span className="text-slate-400 font-normal italic">Not Provided</span>}
                  </div>
                </div>

                <div>
                  <label className="flex text-xs font-semibold uppercase tracking-wider text-slate-500 items-center justify-between">
                    <span>Phone Number</span>
                    <span className="text-[10px] lowercase text-slate-400 font-normal">(Read-only)</span>
                  </label>
                  <div className={readOnlyClasses}>
                    {phone || <span className="text-slate-400 font-normal italic">Not Provided</span>}
                  </div>
                </div>
              </div>

              {/* Row 3: Emergency Contact */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Emergency Contact
                </label>
                <div className={readOnlyClasses}>
                  {emergencyContact || <span className="text-slate-400 font-normal italic">Not Provided</span>}
                </div>
              </div>
            </div>
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
    </div>
  );
}