'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useState } from 'react';

import {
  PROFILE_INPUT_BASE,
  STRENGTH_CRITERIA_LABELS,
  STRENGTH_LEVEL_MAP,
} from '@/constants/admin/profileConstants';
import type {
  ChangePasswordFormErrors,
  PasswordStrengthCriteria,
} from '@/types/admin/profile.types';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function computeStrength(password: string): {
  criteria: PasswordStrengthCriteria;
  score: number;
} {
  const criteria: PasswordStrengthCriteria = {
    minChar: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(criteria).filter(Boolean).length;
  return { criteria, score };
}

/* ─── Password Input ──────────────────────────────────────────────────────── */

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  show: boolean;
  error?: string;
  placeholder?: string;
  onToggleShow: () => void;
  onChange: (value: string) => void;
}

function PasswordInput({
  id,
  label,
  value,
  show,
  error,
  placeholder,
  onToggleShow,
  onChange,
}: PasswordInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${PROFILE_INPUT_BASE} pr-11 ${
            error
              ? 'border-red-400 focus:border-red-400'
              : 'border-slate-200 focus:border-emerald-500'
          }`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

/* ─── Strength Bar ────────────────────────────────────────────────────────── */

function StrengthBar({
  score,
  criteria,
}: {
  score: number;
  criteria: PasswordStrengthCriteria;
}) {
  const level = STRENGTH_LEVEL_MAP[score];

  return (
    <div className="mt-3 space-y-2.5">
      {/* Bar */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-500">Password Strength</span>
        <span className={`font-bold ${level.colorText}`}>{level.label}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${level.colorBar} ${level.width}`}
        />
      </div>

      {/* Criteria checklist */}
      <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 pt-1 text-xs text-slate-500">
        {STRENGTH_CRITERIA_LABELS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                criteria[key] ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<ChangePasswordFormErrors>({});
  const [toast, setToast] = useState(false);

  /* Recompute strength whenever newPassword changes */
  const strength = computeStrength(newPassword);

  const clearError = (field: keyof ChangePasswordFormErrors) =>
    setErrors((p) => ({ ...p, [field]: undefined }));

  const validate = (): boolean => {
    const e: ChangePasswordFormErrors = {};
    if (!currentPassword) e.current = 'Current password is required';
    if (!newPassword) {
      e.newPass = 'New password is required';
    } else if (newPassword.length < 8) {
      e.newPass = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      e.confirm = 'Please confirm your new password';
    } else if (confirmPassword !== newPassword) {
      e.confirm = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) return;
    /* Backend call will be wired here */
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200"
          >
            <Check size={15} strokeWidth={2.5} />
            Password updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section header */}
      <div className="mb-7 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
          <KeyRound size={19} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Security Credentials</h3>
          <p className="text-sm text-slate-500">Update your password to keep your account secure</p>
        </div>
      </div>

      <form
        id="change-password-form"
        onSubmit={(e) => e.preventDefault()}
        className="max-w-xl space-y-5"
      >
        {/* Current Password */}
        <PasswordInput
          id="current-password"
          label="Current Password"
          value={currentPassword}
          show={showCurrent}
          error={errors.current}
          placeholder="Enter current password"
          onToggleShow={() => setShowCurrent((p) => !p)}
          onChange={(v) => {
            setCurrentPassword(v);
            clearError('current');
          }}
        />

        {/* New Password */}
        <div>
          <PasswordInput
            id="new-password"
            label="New Password"
            value={newPassword}
            show={showNew}
            error={errors.newPass}
            placeholder="Enter new password"
            onToggleShow={() => setShowNew((p) => !p)}
            onChange={(v) => {
              setNewPassword(v);
              clearError('newPass');
            }}
          />
          {newPassword.length > 0 && (
            <StrengthBar score={strength.score} criteria={strength.criteria} />
          )}
        </div>

        {/* Confirm Password */}
        <PasswordInput
          id="confirm-password"
          label="Confirm New Password"
          value={confirmPassword}
          show={showConfirm}
          error={errors.confirm}
          placeholder="Confirm new password"
          onToggleShow={() => setShowConfirm((p) => !p)}
          onChange={(v) => {
            setConfirmPassword(v);
            clearError('confirm');
          }}
        />

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            id="update-password-btn"
            type="button"
            onClick={handleUpdate}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
