'use client';

import Link from 'next/link';

import { useBookingStore } from '@/store/bookingStore';

export default function BookingConfirmation() {
  const {
    service,
    date,
    slot,
  } = useBookingStore();

  //Remove after backend integration
  const bookingId =
    'HC-' +
    Math.floor(
      100000 + Math.random() * 900000
    );

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div
          className="
            rounded-[32px]
            bg-white
            p-8
            text-center
            shadow-xl
            md:p-12
          "
        >
          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              text-5xl
            "
          >
            ✅
          </div>

          <h1
            className="
              mt-8
              text-3xl
              font-bold
              text-slate-900
              md:text-4xl
            "
          >
            Booking Confirmed
          </h1>

          <p
            className="
              mt-4
              text-lg
              text-slate-600
            "
          >
            Thank you for choosing
            HiChandra Services.
          </p>

          <div
            className="
              mt-10
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-6
              text-left
            "
          >
            <InfoRow
              label="Booking ID"
              value={bookingId}
            />

            <InfoRow
              label="Service"
              value={service}
            />

            <InfoRow
              label="Date"
              value={date}
            />

            <InfoRow
              label="Time Slot"
              value={slot}
            />
          </div>

          <div
            className="
              mt-10
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:justify-center
            "
          >
            <Link
              href="/"
              className="
                rounded-full
                bg-emerald-600
                px-8
                py-4
                text-center
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-emerald-700
              "
            >
              Back To Home
            </Link>

            <Link
              href="/dashboard/customer"
              className="
                rounded-full
                border
                border-slate-300
                px-8
                py-4
                text-center
                font-semibold
                text-slate-700
                transition-all
                duration-300
                hover:bg-slate-100
              "
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex justify-between py-3">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-semibold text-slate-900">
        {value || '-'}
      </span>
    </div>
  );
}