'use client';

import { useRouter } from 'next/navigation';

import { useBookingStore } from '@/store/bookingStore';

export default function BookingSummary() {
  const router = useRouter();

  const {
    service,
    name,
    phone,
    address,
    date,
    slot,
  } = useBookingStore();

  const servicePrice = 499;
  const taxes = 89;
  const total = servicePrice + taxes;

  const handleConfirm = () => {
    router.push('/booking/confirmation');
  };

  return (
    <section className="bg-[#F7F2E8] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div
          className="
            rounded-[32px]
            bg-white
            p-6
            shadow-xl
            md:p-10
          "
        >
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Booking Summary
          </h1>

          <p className="mt-3 text-slate-500">
            Please review your booking details before confirmation.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <SummaryItem
                label="Service"
                value={service}
              />

              <SummaryItem
                label="Customer Name"
                value={name}
              />

              <SummaryItem
                label="Phone"
                value={phone}
              />

              <SummaryItem
                label="Address"
                value={address}
              />

              <SummaryItem
                label="Date"
                value={date}
              />

              <SummaryItem
                label="Time Slot"
                value={slot}
              />
            </div>

            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                p-6
              "
            >
              <h2 className="text-2xl font-bold text-slate-900">
                Price Details
              </h2>

              <div className="mt-6 space-y-4">
                <PriceRow
                  label="Service Cost"
                  value={`₹${servicePrice}`}
                />

                <PriceRow
                  label="Taxes & Fees"
                  value={`₹${taxes}`}
                />

                <div className="border-t pt-4">
                  <PriceRow
                    label="Total"
                    value={`₹${total}`}
                    isTotal
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="
                  mt-8
                  w-full
                  rounded-full
                  bg-emerald-600
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-emerald-700
                "
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SummaryItemProps {
  label: string;
  value: string;
}

function SummaryItem({
  label,
  value,
}: SummaryItemProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        p-4
      "
    >
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value || '-'}
      </p>
    </div>
  );
}

interface PriceRowProps {
  label: string;
  value: string;
  isTotal?: boolean;
}

function PriceRow({
  label,
  value,
  isTotal = false,
}: PriceRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={
          isTotal
            ? 'font-bold text-slate-900'
            : 'text-slate-600'
        }
      >
        {label}
      </span>

      <span
        className={
          isTotal
            ? 'text-xl font-bold text-emerald-600'
            : 'font-medium text-slate-900'
        }
      >
        {value}
      </span>
    </div>
  );
}