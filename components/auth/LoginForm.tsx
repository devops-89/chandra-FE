'use client';
import { AuthControllers } from '@/api/authControllers';


import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { loginContent } from '@/constants/auth/loginContent';
import { getTechnicianRedirectPath, handlePostAuthRedirect } from '@/lib/authApi/redirectUtils';
import { validateIdentifier } from '@/lib/validator/identifier.validator';
import { validatePassword } from '@/lib/validator/password.validator';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';

const inputClassName =
  'h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

const errorClassName = 'text-xs font-medium text-red-600';

type LoginFormData = {
  identifier: string;
  password: string;
};

type LoginErrors = Partial<LoginFormData>;

export const LoginForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({ identifier: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChange = (name: keyof LoginFormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    // clear server error as soon as user starts editing
    if (apiError) setApiError('');
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    const nextErrors: LoginErrors = {};

    const identifier = form.identifier.trim();
    const identifierError = validateIdentifier(identifier);
    const passwordError = validatePassword(form.password);

    if (identifierError) nextErrors.identifier = identifierError;
    if (passwordError) nextErrors.password = passwordError;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setApiError('');
      setIsLoading(true);

      const response = await AuthControllers.login({
        identifier,
        password: form.password,
      });

      const { user, tokens } = response.data;

      // Persist tokens + user — survives page refresh and tab close
      localStorage.setItem('user',         JSON.stringify(user));
      localStorage.setItem('accessToken',  tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      dispatch(
        setCredentials({
          user,
          accessToken:  tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      );

      // For TECHNICIAN: fetch live profile to determine onboarding/redirect state.
      let redirectTo: string;
      if (user.role?.toUpperCase() === 'TECHNICIAN') {
        const profileRes = await AuthControllers.getProfile();

        // Store technicianProfile so PendingStatus can show the real submission date and status
        const technicianProfile = profileRes.data.technicianProfile;
        if (technicianProfile) {
          try {
            const stored = JSON.parse(localStorage.getItem('user') ?? '{}');
            if (profileRes.data.createdAt) {
              stored.createdAt = profileRes.data.createdAt;
            }
            stored.technicianProfile = {
              ...stored.technicianProfile,
              createdAt: technicianProfile.createdAt,
              status: technicianProfile.status,
              updatedAt: technicianProfile.updatedAt,
            };
            localStorage.setItem('user', JSON.stringify(stored));
          } catch {
            // ignore
          }
        }

        redirectTo = getTechnicianRedirectPath({
          userStatus: profileRes.data.status,
          technicianProfile: profileRes.data.technicianProfile,
        });
      } else {
        redirectTo = handlePostAuthRedirect(user.role);
      }

      router.push(redirectTo);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string }; status?: number }; request?: unknown; message?: string };

      if (err?.response) {
        // Server responded — use backend message or status-based fallback
        const status = err.response.status;
        const backendMsg = err.response.data?.message;
        if (backendMsg) {
          setApiError(backendMsg);
        } else if (status === 401 || status === 403) {
          setApiError('Invalid credentials');
        } else {
          setApiError('Server error. Please try again.');
        }
      } else if (err?.request !== undefined) {
        // Request was made but no response received — CORS, network down, backend unreachable
        setApiError('Unable to reach the server. Please check your connection or try again later.');
      } else {
        // Something else went wrong (e.g. request setup error)
        setApiError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
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
        <section className="flex flex-1 items-center justify-center p-6 sm:p-10 min-h-[calc(100vh-3rem)] sm:min-h-0">
          <form
            className="grid w-full max-w-md gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Heading */}
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Login</h2>
              <p className="mt-2 text-sm text-slate-600">
                New to HiChandra?{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* ── API error banner ── */}
            {apiError && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm font-medium text-red-700">{apiError}</p>
              </div>
            )}

            {/* Email or Mobile Number */}
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">Email or Mobile Number</span>
              <input
                className={inputClassName}
                name="identifier"
                type="text"
                value={form.identifier}
                onChange={(e) => handleChange('identifier', e.target.value)}
              />
              {errors.identifier && <span className={errorClassName}>{errors.identifier}</span>}
            </label>

            {/* Password */}
            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <div className="relative">
                <input
                  className={`${inputClassName} w-full pr-10`}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className={errorClassName}>{errors.password}</span>}
            </label>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  type="checkbox"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              disabled={isLoading}
              className="mt-2 h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
              type="submit"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
