'use client';

import { useRouter } from 'next/navigation';

import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import { useBookingStore } from '@/redux/legacy/bookingStore';

// ─── Layout-agnostic content ──────────────────────────────────────────────────

interface BookingSummaryContentProps {
  /** Where "Confirm Booking" navigates to. Default: '/booking/confirmation' */
  confirmationPath?: string;
}

export function BookingSummaryContent({
  confirmationPath = '/booking/confirmation',
}: BookingSummaryContentProps) {
  const router = useRouter();

  const {
    service,
    servicePrice,
    name,
    phone,
    address,
    date,
    slot,
    instructions,
  } = useBookingStore();

  const basePriceFromStore = servicePrice ?? 0;
  const taxes = Math.round(basePriceFromStore * 0.18);
  const total = basePriceFromStore + taxes;

  const handleConfirm = () => {
    router.push(confirmationPath);
  };

  return (
    <section className="bg-white py-4 md:py-4">
      <div className="max-w-full">
        <div className="rounded-4xl bg-white p-6 shadow-xl md:p-10">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Booking Summary
          </h1>
          <p className="mt-3 text-slate-500">
            Please review your booking details before confirmation.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <SummaryItem label="Service"         value={service} />
              <SummaryItem label="Customer Name"   value={name} />
              <SummaryItem label="Phone"           value={phone} />
              <SummaryItem label="Address"         value={address} />
              <SummaryItem label="Date"            value={date} />
              <SummaryItem label="Time Slot"       value={slot} />
              {instructions && (
                <SummaryItem label="Special Instructions" value={instructions} />
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-bold text-slate-900">Price Details</h2>
              <div className="mt-6 space-y-4">
                <PriceRow label="Service Cost" value={`₹${basePriceFromStore}`} />
                <PriceRow label="Taxes & Fees" value={`₹${taxes}`} />
                <div className="border-t pt-4">
                  <PriceRow label="Total" value={`₹${total}`} isTotal />
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="
                  mt-8 w-full rounded-full bg-emerald-600 px-8 py-4
                  text-lg cursor-pointer font-semibold text-white
                  transition-all duration-300 hover:bg-emerald-700
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

// ─── Public wrapper (with navbar + footer) ────────────────────────────────────

export default function BookingSummary() {
  return (
    <>
      <PublicNavbar />
      <BookingSummaryContent confirmationPath="/booking/confirmation" />
      <PublicFooter />
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SummaryItemProps { label: string; value: string }

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value || '-'}</p>
    </div>
  );
}

interface PriceRowProps { label: string; value: string; isTotal?: boolean }

function PriceRow({ label, value, isTotal = false }: PriceRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className={isTotal ? 'font-bold text-slate-900' : 'text-slate-600'}>
        {label}
      </span>
      <span className={isTotal ? 'text-xl font-bold text-emerald-600' : 'font-medium text-slate-900'}>
        {value}
      </span>
    </div>
  );
}
