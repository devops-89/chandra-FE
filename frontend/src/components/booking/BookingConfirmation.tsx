'use client';

import Link from 'next/link';

import { useBookingStore } from '@/store/bookingStore';
import PublicNavbar from '@/components/common/PublicNavbar';
import PublicFooter from '@/components/common/PublicFooter';

export default function BookingConfirmation() {
  const {
    service,
    date,
    slot,
  } = useBookingStore();
  const bookingId = createTemporaryBookingId(
    service,
    date,
    slot
  );

  return (
    <>
      <PublicNavbar />
      <section className="bg-[#F7F2E8] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="
              rounded-4xl
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
      <PublicFooter />
    </>
  );
}

function createTemporaryBookingId(
  service: string,
  date: string,
  slot: string
) {
  const source = `${service}-${date}-${slot}`;
  const hash = source
    .split('')
    .reduce(
      (total, character) =>
        total + character.charCodeAt(0),
      0
    );

  return `HC-${String(100000 + (hash % 900000)).padStart(6, '0')}`;
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
