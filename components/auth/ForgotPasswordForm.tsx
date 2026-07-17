'use client';

import { AlertCircle, ArrowLeft, Loader2, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { loginContent } from '@/constants/auth/loginContent';
import { validatePhone } from '@/lib/validator/phone.validator';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { forgotPassword, resetForgotPasswordState } from '@/redux/slices/forgotPasswordSlice';

const inputClassName =
  'h-11 rounded-lg border border-slate-200 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 w-full';

const errorClassName = 'text-xs font-medium text-red-600';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Local state for phone number and validation
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);

  // Redux state
  const { isLoading, error: apiError } = useAppSelector(
    (state) => state.forgotPassword
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // accepts digits only
    if (value.length <= 10) {
      setPhone(value);
      setPhoneError(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;
    e.preventDefault();
    const validationError = validatePhone(phone);
    if (validationError) {
      setPhoneError(validationError);
      return;
    }

    try {
      dispatch(resetForgotPasswordState());
      const result = await dispatch(forgotPassword({ phone })).unwrap();
      if (result) {
        router.push(`/reset-password?phone=${encodeURIComponent(phone)}`);
      }
    } catch (err) {
      // Handled by Redux slice state (apiError)
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:flex-row">
        
        {/* ── Left panel — hidden on mobile ── */}
        <section className="hidden lg:flex flex-1 flex-col justify-between p-8 text-white sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/login.png"
              alt="Forgot Password illustration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/20 to-black/80" />
            <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-linear-to-bl from-black/60 via-transparent to-black/60" />
          </div>

          <div className="relative z-10">
            <p className="text-lg font-bold">{loginContent.brand}</p>
            <div className="mt-16 max-w-md">
              <h1 className="text-3xl font-bold sm:text-4xl">Reset Password</h1>
              <p className="mt-4 text-sm leading-6 text-emerald-50">
                Quickly regain access to your account and continue managing your home services seamlessly.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 relative z-10">
            <div className="rounded-xl bg-white/10 p-4">
              <h2 className="text-sm font-semibold">Verification Step</h2>
              <p className="mt-1 text-xs leading-5 text-emerald-50">
                We use secure OTP verification to ensure that only you can access and reset your account password.
              </p>
            </div>
          </div>
        </section>

        {/* ── Right panel ── */}
        <section className="flex flex-1 flex-col justify-center p-6 sm:p-10 min-h-[calc(100vh-3rem)] sm:min-h-0 relative">
          
          {/* Back Button (Top Left) */}
          <div className="mb-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition"
            >
              <ArrowLeft size={18} />
              <span>Back to Login</span>
            </Link>
          </div>

          <form className="grid w-full max-w-md gap-4" onSubmit={handleSubmit}>
            
            {/* Heading */}
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Forgot Password</h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter your registered mobile number. We&apos;ll send you a verification OTP to reset your password.
              </p>
            </div>

            {/* API error banner */}
            {apiError && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm font-medium text-red-700">{apiError}</p>
              </div>
            )}

            {/* Mobile Number Input */}
            <label className="grid gap-1.5 relative">
              <span className="text-sm font-medium text-slate-700">Mobile Number</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone size={18} />
                </span>
                <input
                  className={inputClassName}
                  type="text"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
              {phoneError && <span className={errorClassName}>{phoneError}</span>}
            </label>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              className="mt-2 h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
              type="submit"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            {/* Footer */}
            <p className="mt-4 text-center text-sm text-slate-600">
              Remember your password?{' '}
              <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Login
              </Link>
            </p>
          </form>
        </section>

      </div>
    </main>
  );
}
