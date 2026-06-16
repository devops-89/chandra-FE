'use client';

import { AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { signupContent } from '@/constants/auth/signupContent';
import { useSignupForm } from '@/hooks/useSignupForm';

import OtpModal from './OtpModal';

const inputClassName =
  'h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

const errorClassName = 'text-xs font-medium text-red-600';

export const SignupForm = () => {
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

              {/* API error banner */}
              {formApiError && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <p className="text-sm font-medium text-red-700">{formApiError}</p>
                </div>
              )}

              {/* First + Last name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-slate-700">First name</span>
                  <input
                    className={inputClassName}
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                  {errors.firstName && <span className={errorClassName}>{errors.firstName}</span>}
                </label>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Last name</span>
                  <input
                    className={inputClassName}
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                  {errors.lastName && <span className={errorClassName}>{errors.lastName}</span>}
                </label>
              </div>

              {/* Phone */}
              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-slate-700">Phone</span>
                <input
                  className={inputClassName}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                {errors.phone && <span className={errorClassName}>{errors.phone}</span>}
              </label>

              {/* Email */}
              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  className={inputClassName}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <span className={errorClassName}>{errors.email}</span>}
              </label>

              {/* Password */}
              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  className={inputClassName}
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                {errors.password && <span className={errorClassName}>{errors.password}</span>}
              </label>

              {/* Confirm password */}
              <label className="grid gap-1.5">
                <span className="text-sm font-medium text-slate-700">Confirm password</span>
                <input
                  className={inputClassName}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
                {errors.confirmPassword && (
                  <span className={errorClassName}>{errors.confirmPassword}</span>
                )}
              </label>

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
                    <span className={`mt-1 block ${errorClassName}`}>{errors.termsAccepted}</span>
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
          email={form.email}
          phone={form.phone}
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
