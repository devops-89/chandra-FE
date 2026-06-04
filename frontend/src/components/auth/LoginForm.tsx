'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useState,
} from 'react';

import { loginContent } from '@/constants/auth/loginContent';
import { validateEmail } from '@/lib/validator/email.validator';
import { validatePassword } from '@/lib/validator/password.validator';
import { useAuthStore } from '@/store/useAuthStore';

const inputClassName =
  'h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

const errorClassName = 'text-xs font-medium text-red-600';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginErrors = Partial<LoginFormData>;

export const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (
    name: keyof LoginFormData,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = () => {
    const nextErrors: LoginErrors = {};
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    if (emailError) {
      nextErrors.email = emailError;
    }

    if (passwordError) {
      nextErrors.password = passwordError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    login();
    router.push('/dashboard/customer');
  };

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:flex-row">
        <section className="flex flex-1 flex-col justify-between p-8 text-white sm:p-10 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/login.png"
              alt="Login illustration"
              fill
              className="object-cover"
              priority
            />
            {/* Vignette Effect - Black edges with clear center */}
            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/20 to-black/80" />
            <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-linear-to-bl from-black/60 via-transparent to-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p className="text-lg font-bold">
              {loginContent.brand}
            </p>

            <div className="mt-16 max-w-md">
              <h1 className="text-3xl font-bold sm:text-4xl">
                {loginContent.heading}
              </h1>
              <p className="mt-4 text-sm leading-6 text-emerald-50">
                {loginContent.subHeading}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 relative z-10">
            {loginContent.trustPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-xl bg-white/10 p-4"
              >
                <h2 className="text-sm font-semibold">
                  {point.title}
                </h2>
                <p className="mt-1 text-xs leading-5 text-emerald-50">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <form
            className="grid w-full max-w-md gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Login
              </h2>
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

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                className={inputClassName}
                name="email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  handleChange('email', event.target.value)
                }
              />
              {errors.email ? (
                <span className={errorClassName}>
                  {errors.email}
                </span>
              ) : null}
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">
                Password
              </span>
              <input
                className={inputClassName}
                name="password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  handleChange('password', event.target.value)
                }
              />
              {errors.password ? (
                <span className={errorClassName}>
                  {errors.password}
                </span>
              ) : null}
            </label>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  type="checkbox"
                />
                Remember me
              </label>

              <Link
                href="/"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Forgot password?
              </Link>
            </div>

            <button
              className="mt-2 h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              type="submit"
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
