'use client';

import {
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { signupContent } from '@/constants/auth/signupContent';
import { useSignupForm } from '@/hooks/useSignupForm';

import OtpModal from './OtpModal';

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#e2e8f0',
    },
    '&:hover fieldset': {
      borderColor: '#059669',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#059669',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#64748b',
    fontSize: '0.875rem',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#059669',
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '4px',
    fontSize: '0.75rem',
    fontWeight: 500,
  },
};

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    form,
    errors,
    formApiError,
    isSendingOtp,
    handleChange,
    handleSubmit,
    showOtpModal,
    otpApiError,
    isVerifying,
    isResending,
    handleVerifyOtp,
    handleResendOtp,
    handleCloseOtpModal,
  } = useSignupForm();

  return (
    <>
      <main className="min-h-screen bg-[#fff8ed] px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:flex-row">

          {/* ── Left panel — hidden on mobile ── */}
          <section className="hidden lg:flex flex-1 flex-col justify-between p-8 text-white sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/signup.png"
                alt="Signup illustration"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/20 to-black/80" />
              <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-black/80" />
              <div className="absolute inset-0 bg-linear-to-bl from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 bg-linear-to-tl from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.8)]" />
            </div>

            <div className="relative z-10">
              <p className="text-lg font-bold">{signupContent.brand}</p>
              <div className="mt-16 max-w-md">
                <h1 className="text-3xl font-bold sm:text-4xl">{signupContent.heading}</h1>
                <p className="mt-4 text-sm leading-6 text-emerald-50">{signupContent.subHeading}</p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 relative z-10">
              {signupContent.trustPoints.map((point) => (
                <div key={point.title} className="rounded-xl bg-white/10 p-4">
                  <h2 className="text-sm font-semibold">{point.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-emerald-50">{point.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Right panel ── */}
          <section className="flex flex-1 items-center justify-center p-6 sm:p-10 min-h-[calc(100vh-3rem)] sm:min-h-0">
            <form
              className="grid w-full max-w-md gap-4"
              onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            >
              {/* Heading */}
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Sign up</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                    Login
                  </Link>
                </p>
              </div>



              {/* First + Last name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="First name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={textFieldStyles}
                />

                <TextField
                  label="Last name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={textFieldStyles}
                />
              </div>

              {/* Username */}
              <TextField
                label="Username"
                placeholder="e.g. john_doe"
                variant="outlined"
                fullWidth
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={(e) => handleChange('username', e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                sx={textFieldStyles}
              />

              {/* Mobile Number */}
              <MuiTelInput
                label="Mobile Number"
                variant="outlined"
                fullWidth
                defaultCountry="IN"
                forceCallingCode
                placeholder=""
                name="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={(val) => handleChange('phone', val)}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={textFieldStyles}
              />

              {/* Email */}
              <TextField
                label="Email (optional)"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                sx={textFieldStyles}
              />

              {/* Password */}
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#94a3b8' }}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={textFieldStyles}
              />

              {/* Confirm password */}
              <TextField
                label="Confirm password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: '#94a3b8' }}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={textFieldStyles}
              />

              {/* Terms */}
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  name="termsAccepted"
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                />
                <span>
                  I agree to the terms and conditions.
                  {errors.termsAccepted && (
                    <span className="mt-1 block text-xs font-medium text-red-600">{errors.termsAccepted}</span>
                  )}
                </span>
              </label>

              {/* Submit — triggers Generate OTP */}
              <button
                disabled={isSendingOtp}
                className="mt-2 h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
                type="submit"
              >
                {isSendingOtp && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSendingOtp ? 'Sending OTP…' : 'Create account'}
              </button>
            </form>
          </section>

        </div>
      </main>

      {/* OTP verification modal — mounted outside main so it overlays everything */}
      {showOtpModal && (
        <OtpModal
          identifier={form.phone}
          isVerifying={isVerifying}
          apiError={otpApiError}
          onVerify={handleVerifyOtp}
          onClose={handleCloseOtpModal}
          onResend={handleResendOtp}
          isResending={isResending}
        />
      )}
    </>
  );
};
