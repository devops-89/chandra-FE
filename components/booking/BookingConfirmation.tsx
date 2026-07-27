'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import { useBookingStore } from '@/redux/legacy/bookingStore';

// ─── Layout-agnostic content ──────────────────────────────────────────────────

interface BookingConfirmationContentProps {
  layout?: 'public' | 'dashboard';
}

export function BookingConfirmationContent({
  layout = 'public',
}: BookingConfirmationContentProps = {}) {
  const router = useRouter();
  const { service, servicePrice, date, slot, clearBooking } = useBookingStore();

  const bookingId = createTemporaryBookingId(service, date, slot);

  React.useEffect(() => {
    // Only clear booking data when the user explicitly navigates away via the button.
    // Do NOT clear on unmount — that wipes the data before it can be read.
  }, []);

  const handleDashboardRedirect = () => {
    clearBooking();
    router.push('/dashboard/customer');
  };

  if (layout === 'dashboard') {
    return (
      <section className="h-full bg-white">
        <div className="flex h-full w-full items-center">
          <div className="grid w-full grid-cols-1 items-stretch gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[minmax(260px,0.85fr)_minmax(360px,1.15fr)] lg:p-8">
            <div className="flex flex-col justify-center text-center lg:text-left">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl lg:mx-0">
                ✅
              </div>

              <h1 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
                Booking Confirmed
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Thank you for choosing HiChandra Services.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <Link
                  href="/dashboard/customer"
                  onClick={handleDashboardRedirect}
                  className="rounded-full border border-slate-300 px-8 py-4 text-center font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100"
                >
                  View Dashboard
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left">
              <InfoRow label="Booking ID" value={bookingId} />
              <InfoRow label="Service" value={service} />
              {servicePrice && servicePrice > 0 && (
                <InfoRow label="Service Price" value={`₹${servicePrice}`} />
              )}
              <InfoRow label="Date" value={date} />
              <InfoRow label="Time Slot" value={slot} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-4xl bg-white p-8 text-center shadow-xl md:p-12">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-5xl">
            ✅
          </div>

          <h1 className="mt-8 text-3xl font-bold text-slate-900 md:text-4xl">
            Booking Confirmed
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Thank you for choosing HiChandra Services.
          </p>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left">
            <InfoRow label="Booking ID" value={bookingId} />
            <InfoRow label="Service"    value={service} />
            {servicePrice && servicePrice > 0 && (
              <InfoRow label="Service Price" value={`₹${servicePrice}`} />
            )}
            <InfoRow label="Date"      value={date} />
            <InfoRow label="Time Slot" value={slot} />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/customer"
              onClick={handleDashboardRedirect}
              className="rounded-full border border-slate-300 px-8 py-4 text-center font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Public wrapper (with navbar + footer) ────────────────────────────────────

export default function BookingConfirmation() {
  return (
    <>
      <PublicNavbar />
      <BookingConfirmationContent />
      <PublicFooter />
    </>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function createTemporaryBookingId(service: string, date: string, slot: string) {
  const source = `${service}-${date}-${slot}`;
  const hash = source.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
  return `HC-${String(100000 + (hash % 900000)).padStart(6, '0')}`;
}

interface InfoRowProps { label: string; value: string }

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between py-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value || '-'}</span>
    </div>
  );
}
