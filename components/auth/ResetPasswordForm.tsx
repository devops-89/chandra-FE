'use client';

import { AlertCircle, ArrowLeft, Eye, EyeOff, KeyRound,Loader2, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect,useState } from 'react';

import { loginContent } from '@/constants/auth/loginContent';
import { validatePassword } from '@/lib/validator/password.validator';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetForgotPasswordState,resetPassword } from '@/redux/slices/forgotPasswordSlice';

const inputClassName =
  'h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed';

const errorClassName = 'text-xs font-medium text-red-600';

export default function ResetPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  // Read phone from search params (with localStorage fallback)
  const phoneParam = searchParams.get('phone') || (typeof window !== 'undefined' ? localStorage.getItem('resetPasswordPhone') || '' : '');

  // Local state
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<{ otp?: string; password?: string; confirmPassword?: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redux state
  const { isResetting, resetError } = useAppSelector(
    (state) => state.forgotPassword
  );

  // Clean state on mount
  useEffect(() => {
    dispatch(resetForgotPasswordState());
  }, [dispatch]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // accepts digits only
    if (value.length <= 6) {
      setOtp(value);
      setLocalErrors((prev) => ({ ...prev, otp: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLocalErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setLocalErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetting) return;

    const nextErrors: typeof localErrors = {};

    // Validate OTP
    if (!otp.trim()) {
      nextErrors.otp = 'Verification OTP is required';
    } else if (otp.length !== 6) {
      nextErrors.otp = 'OTP must be exactly 6 digits';
    }

    // Validate Password
    const passErr = validatePassword(password);
    if (passErr) {
      nextErrors.password = passErr;
    }

    // Validate Confirm Password
    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(nextErrors).length > 0) {
      setLocalErrors(nextErrors);
      return;
    }

    try {
      await dispatch(
        resetPassword({
          phone: phoneParam,
          otp,
          newPassword: password,
        })
      ).unwrap();

      setSuccessMessage('Password reset successfully.');
      setTimeout(() => {
        router.replace('/login');
      }, 1000);
    } catch {
      // Handled by Redux state
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
              alt="Login illustration"
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
              <h1 className="text-3xl font-bold sm:text-4xl">{loginContent.heading}</h1>
              <p className="mt-4 text-sm leading-6 text-emerald-50">{loginContent.subHeading}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 relative z-10">
            {loginContent.trustPoints.map((point) => (
              <div key={point.title} className="rounded-xl bg-white/10 p-4">
                <h2 className="text-sm font-semibold">{point.title}</h2>
                <p className="mt-1 text-xs leading-5 text-emerald-50">{point.description}</p>
              </div>
            ))}
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
              <h2 className="text-2xl font-bold text-slate-950">Reset Password</h2>
              <p className="mt-2 text-sm text-slate-600">
                Create a new secure password for your account. Your new password will be used the next time you sign in.
              </p>
            </div>

            {/* Success Banner */}
            {successMessage && (
              <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                <p className="text-sm font-medium text-emerald-800">{successMessage}</p>
              </div>
            )}

            {/* API error banner */}
            {resetError && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm font-medium text-red-700">{resetError}</p>
              </div>
            )}

            {/* Registered Mobile Number (Read Only) */}
            <label className="grid gap-1.5 relative">
              <span className="text-sm font-medium text-slate-700">Registered Mobile Number</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone size={18} />
                </span>
                <input
                  className={`${inputClassName} pl-10`}
                  type="text"
                  disabled
                  value={phoneParam}
                  aria-label="Registered Mobile Number"
                />
              </div>
            </label>

            {/* Verification OTP */}
            <label className="grid gap-1.5 relative">
              <span className="text-sm font-medium text-slate-700">Verification OTP</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <KeyRound size={18} />
                </span>
                <input
                  className={`${inputClassName} pl-10`}
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  disabled={isResetting}
                />
              </div>
              {localErrors.otp && <span className={errorClassName}>{localErrors.otp}</span>}
            </label>

            {/* New Password */}
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">New Password</span>
              <div className="relative">
                <input
                  className={inputClassName}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isResetting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  disabled={isResetting}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {localErrors.password && <span className={errorClassName}>{localErrors.password}</span>}
            </label>

            {/* Confirm Password */}
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">Confirm Password</span>
              <div className="relative">
                <input
                  className={inputClassName}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  disabled={isResetting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  disabled={isResetting}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {localErrors.confirmPassword && (
                <span className={errorClassName}>{localErrors.confirmPassword}</span>
              )}
            </label>

            {/* Submit Button */}
            <button
              disabled={isResetting || !!successMessage}
              className="mt-2 h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
              type="submit"
            >
              {isResetting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isResetting ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}
