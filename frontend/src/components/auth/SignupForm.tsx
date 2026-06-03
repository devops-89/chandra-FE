'use client';

import Image from 'next/image';
import Link from 'next/link';

import { signupContent } from '@/constants/auth/signupContent';
import { useSignupForm } from '@/hooks/useSignupForm';

const inputClassName =
  'h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

const errorClassName = 'text-xs font-medium text-red-600';

export const SignupForm = () => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
  } = useSignupForm();

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:flex-row">
        <section className="flex flex-1 flex-col justify-between p-8 text-white sm:p-10 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/signup.png"
              alt="Signup illustration"
              fill
              className="object-cover"
              priority
            />
            {/* Vignette Effect - Black edges with clear center */}
            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/20 to-black/80" />
            <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-linear-to-bl from-black/60 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-linear-to-tl from-black/60 via-transparent to-black/60" />
            {/* Rounded corners vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p className="text-lg font-bold">
              {signupContent.brand}
            </p>

            <div className="mt-16 max-w-md">
              <h1 className="text-3xl font-bold sm:text-4xl">
                {signupContent.heading}
              </h1>
              <p className="mt-4 text-sm leading-6 text-emerald-50">
                {signupContent.subHeading}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 relative z-10">
            {signupContent.trustPoints.map((point) => (
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
                Sign up
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
  <label className="grid gap-1.5">
    <span className="text-sm font-medium text-slate-700">
      First name
    </span>
    <input
      className={inputClassName}
      name="firstName"
      type="text"
      value={form.firstName}
      onChange={(event) =>
        handleChange('firstName', event.target.value)
      }
    />
    {errors.firstName ? (
      <span className={errorClassName}>
        {errors.firstName}
      </span>
    ) : null}
  </label>

    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-slate-700">
        Last name
      </span>
      <input
        className={inputClassName}
        name="lastName"
        type="text"
        value={form.lastName}
        onChange={(event) =>
          handleChange('lastName', event.target.value)
        }
      />
      {errors.lastName ? (
        <span className={errorClassName}>
          {errors.lastName}
        </span>
      ) : null}
    </label>
  </div>

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">
                Phone
              </span>
              <input
                className={inputClassName}
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  handleChange('phone', event.target.value)
                }
              />
              {errors.phone ? (
                <span className={errorClassName}>
                  {errors.phone}
                </span>
              ) : null}
            </label>

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

            <label className="grid gap-1.5">
              <span className="text-sm font-medium text-slate-700">
                Confirm password
              </span>
              <input
                className={inputClassName}
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(event) =>
                  handleChange(
                    'confirmPassword',
                    event.target.value,
                  )
                }
              />
              {errors.confirmPassword ? (
                <span className={errorClassName}>
                  {errors.confirmPassword}
                </span>
              ) : null}
            </label>

            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                name="termsAccepted"
                type="checkbox"
                checked={form.termsAccepted}
                onChange={(event) =>
                  handleChange(
                    'termsAccepted',
                    event.target.checked,
                  )
                }
              />
              <span>
                I agree to the terms and conditions.
                {errors.termsAccepted ? (
                  <span className={`mt-1 block ${errorClassName}`}>
                    {errors.termsAccepted}
                  </span>
                ) : null}
              </span>
            </label>

            <button
              className="mt-2 h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              type="submit"
            >
              Create account
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
