'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, Edit, Loader2, Mail, Phone, Shield, User as UserIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { userSecuredApi } from '@/api/config';
import { PROFILE_INPUT_BASE } from '@/constants/admin/profileConstants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateUser } from '@/redux/slices/authSlice';
import type {
  AdminProfileFormErrors,
  AdminProfileFormFields,
  UpdateProfileRequest,
} from '@/types/admin/profile.types';
import type { User } from '@/types/auth.types';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function readStoredUser(): User | null {
  try {
    const s = localStorage.getItem('user');
    return s ? (JSON.parse(s) as User) : null;
  } catch {
    return null;
  }
}

function buildFormData(user: User): AdminProfileFormFields {
  return {
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    email: user.email ?? '',
    username: user.username ?? '',
    phone: localStorage.getItem('admin_phone') ?? '+91 98765 43210',
  };
}

function validate(form: AdminProfileFormFields): AdminProfileFormErrors {
  const e: AdminProfileFormErrors = {};
  if (!form.firstName.trim()) e.firstName = 'First name is required';
  if (!form.lastName.trim()) e.lastName = 'Last name is required';
  if (!form.username.trim()) e.username = 'Username is required';
  if (!form.email.trim()) {
    e.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    e.email = 'Please enter a valid email address';
  }
  return e;
}

/* ─── Detail Row ──────────────────────────────────────────────────────────────── */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-slate-800 font-semibold mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}

/* ─── Toast ──────────────────────────────────────────────────────────────────── */

function Toast({
  show,
  message,
  variant = 'success',
}: {
  show: boolean;
  message: string;
  variant?: 'success' | 'error';
}) {
  const isError = variant === 'error';
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg ${
            isError
              ? 'bg-red-600 shadow-red-200'
              : 'bg-emerald-600 shadow-emerald-200'
          }`}
        >
          {isError ? (
            <AlertCircle size={15} strokeWidth={2.5} />
          ) : (
            <Check size={15} strokeWidth={2.5} />
          )}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */

export default function ProfileOverview() {
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((s) => s.auth.user);

  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<AdminProfileFormFields>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
  });
  const [errors, setErrors] = useState<AdminProfileFormErrors>({});
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; variant: 'success' | 'error' }>({
    show: false,
    message: '',
    variant: 'success',
  });

  /* Sync user state */
  useEffect(() => {
    const u = reduxUser ?? readStoredUser();
    if (u) {
      const handle = requestAnimationFrame(() => {
        setUser(u);
        setForm(buildFormData(u));
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [reduxUser]);

  const initials =
    `${form.firstName[0] ?? ''}${form.lastName[0] ?? ''}`.toUpperCase() || 'A';

  const handleChange = (field: keyof AdminProfileFormFields, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field as keyof AdminProfileFormErrors])
      setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const showToast = (message: string, variant: 'success' | 'error') => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3500);
  };

  const handleSave = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!user) return;

    setSaving(true);
    try {
      const payload: UpdateProfileRequest = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim(),
        phone: form.phone.trim(),
      };

      await userSecuredApi.patch('/users/profile', payload);

      // Sync Redux state
      dispatch(updateUser(payload));

      // Sync localStorage
      const updated: User = { ...user, ...payload };
      localStorage.setItem('user', JSON.stringify(updated));
      localStorage.setItem('admin_phone', payload.phone);

      setUser(updated);
      setEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Failed to update profile. Please try again.';
      showToast(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) setForm(buildFormData(user));
    setErrors({});
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400 text-sm">
        Loading profile…
      </div>
    );
  }

  return (
    <>
      <Toast show={toast.show} message={toast.message} variant={toast.variant} />

      {/* Avatar & name header */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-24 w-24 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-100">
            {initials}
          </div>
          <span className="absolute -bottom-2 -right-2 h-7 w-7 rounded-lg bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-700">
            <Shield size={13} />
          </span>
        </div>

        {/* Name + role + edit button */}
        <div className="flex-1 text-center sm:text-left flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {form.firstName} {form.lastName}
            </h2>
            <p className="text-slate-500 mt-0.5">@{form.username}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <Shield size={11} />
              System Administrator
            </span>
          </div>

          {!editing && (
            <button
              type="button"
              id="edit-profile-btn"
              onClick={() => setEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm shrink-0"
            >
              <Edit size={15} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Details / edit form */}
      <div className="p-6 sm:p-8">
        {editing ? (
          /* ── Edit Form ────────────────────────────────────────────────── */
          <motion.form
            id="profile-edit-form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label htmlFor="profile-firstName" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-firstName"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className={`${PROFILE_INPUT_BASE} ${errors.firstName ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-emerald-500'}`}
                />
                {errors.firstName && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="profile-lastName" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className={`${PROFILE_INPUT_BASE} ${errors.lastName ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-emerald-500'}`}
                />
                {errors.lastName && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{errors.lastName}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="profile-username" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-username"
                  type="text"
                  value={form.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Enter username"
                  className={`${PROFILE_INPUT_BASE} ${errors.username ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-emerald-500'}`}
                />
                {errors.username && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="profile-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 99999 99999"
                  className={`${PROFILE_INPUT_BASE} border-slate-200 focus:border-emerald-500`}
                />
              </div>
            </div>

            {/* Email — full row */}
            <div>
              <label htmlFor="profile-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="admin@hichandra.com"
                className={`${PROFILE_INPUT_BASE} ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-emerald-500'}`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                id="cancel-edit-btn"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <X size={15} />
                Cancel
              </button>
              <button
                type="button"
                id="save-profile-btn"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Check size={15} />
                )}
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </motion.form>
        ) : (
          /* ── Read-only view ─────────────────────────────────────────────── */
          <motion.div
            key="read"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          >
            <DetailRow icon={<UserIcon size={17} />} label="Full Name" value={`${form.firstName} ${form.lastName}`} />
            <DetailRow icon={<Mail size={17} />} label="Email Address" value={form.email} />
            <DetailRow icon={<UserIcon size={17} />} label="Username" value={`@${form.username}`} />
            <DetailRow icon={<Phone size={17} />} label="Phone Number" value={form.phone || '—'} />
          </motion.div>
        )}
      </div>
    </>
  );
}
