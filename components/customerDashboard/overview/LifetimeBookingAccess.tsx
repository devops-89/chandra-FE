'use client';

import {
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

interface LifetimeBookingAccessProps {
  onUnlock: () => void;
}

const accessHighlights = [
  {
    icon: CalendarCheck,
    label: 'Book services anytime',
  },
  {
    icon: ShieldCheck,
    label: 'Verified customer access',
  },
  {
    icon: CheckCircle2,
    label: 'One activation for all bookings',
  },
];

export default function LifetimeBookingAccess({ onUnlock }: LifetimeBookingAccessProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 p-6 sm:p-8 lg:p-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Lifetime Booking Access
            </span>

            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-bold text-slate-950 sm:text-4xl">
                Activate access before booking your next service
              </h2>
              <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Complete the secure activation payment once and continue to the
                normal customer dashboard experience.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {accessHighlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-left"
              >
                <Icon className="h-5 w-5 text-emerald-600" />
                <p className="mt-3 text-sm font-semibold leading-5 text-slate-800">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onUnlock}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
          >
            <CreditCard className="h-4 w-4" />
            Activate Lifetime Access
          </button>
        </div>

        <div className="flex min-h-72 items-center justify-center bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                  Access Status
                </p>
                <p className="mt-2 text-2xl font-bold">Locked</p>
              </div>
              <ShieldCheck className="h-10 w-10 text-emerald-300" />
            </div>

            <div className="space-y-4 pt-5 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span>Dashboard</span>
                <span className="font-semibold text-white">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Booking access</span>
                <span className="font-semibold text-emerald-200">Activation required</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
