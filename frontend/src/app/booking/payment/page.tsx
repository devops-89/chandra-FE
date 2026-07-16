'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BookingAuthGuard from '@/components/booking/BookingAuthGuard';
import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useBookingStore } from '@/redux/legacy/bookingStore';
import { createTokenPaymentLink } from '@/redux/slices/customerTokenPaymentSlice';

function TokenPaymentContent() {
  const router = useRouter();
  const { service, date, slot, customerAddress } = useBookingStore();
  const [error, setError] = useState<string | null>(null);
  const [paymentSimulated, setPaymentSimulated] = useState(false);

  const dispatch = useAppDispatch();

  const { payment, isLoading } = useAppSelector(
    (state) => state.tokenPayment,
  );

  const handleGeneratePaymentLink = async () => {
  setError(null);

  try {
    const data = await dispatch(
      createTokenPaymentLink(),
    ).unwrap();

    console.log('Payment Response:', data);

    if (data.paymentLink) {
      // Opens the Razorpay payment link in a new tab
      window.open(data.paymentLink, '_blank');

      // Or redirect in the same tab:
      // window.location.href = data.paymentLink;
    }
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Failed to generate payment link.',
    );
  }
};

  const handleConfirmAndProceed = () => {
    // Navigate to booking summary page
    router.push('/booking/summary');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-4xl border border-slate-100 bg-white p-6 shadow-2xl md:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Secure Token Payment</h1>
            <p className="mt-2 text-sm text-slate-500">
              A token amount is required to confirm your booking slot. This will be fully adjusted in your final bill.
            </p>
          </div>

          {/* Booking Info Card */}
          <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">Booking Summary Overview</h2>
            <div className="mt-4 space-y-3 border-b border-slate-200 pb-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Service</span>
                <span className="font-semibold text-slate-900">{service || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time</span>
                <span className="font-semibold text-slate-900">{date && slot ? `${date} at ${slot}` : 'N/A'}</span>
              </div>
              {customerAddress && (
                <div className="flex justify-between">
                  <span>Address</span>
                  <span className="max-w-[70%] text-right font-semibold text-slate-900 truncate">
                    {customerAddress.fullAddress}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-base font-bold text-slate-900">
              <span>Token Amount to Pay</span>
              <span className="text-xl text-emerald-600">₹200.00</span>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-8 space-y-4">
            {!payment ? (
              <button
                type="button"
                onClick={handleGeneratePaymentLink}
                disabled={isLoading}
                className="w-full cursor-pointer rounded-full bg-emerald-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Generating Link...' : 'Generate Token Payment Link'}
              </button>
            ) : (
              <div className="space-y-4 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 text-center animate-fade-in">
                <p className="text-sm font-medium text-emerald-800">
                  Payment Link successfully generated!
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={payment?.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setPaymentSimulated(true)}
                    className="flex-1 rounded-full bg-emerald-600 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-emerald-700"
                  >
                    Open Payment Link
                  </a>
                  <button
                    type="button"
                    onClick={() => setPaymentSimulated(true)}
                    className="flex-1 rounded-full border border-emerald-300 bg-white py-3 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
                  >
                    Simulate Payment Success
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {(payment || paymentSimulated) && (
              <button
                type="button"
                onClick={handleConfirmAndProceed}
                className="w-full cursor-pointer rounded-full bg-slate-900 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg"
              >
                Proceed to Booking Summary
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TokenPaymentPage() {
  return (
    <BookingAuthGuard>
      <PublicNavbar />
      <TokenPaymentContent />
      <PublicFooter />
    </BookingAuthGuard>
  );
}
