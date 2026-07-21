'use client';

import { CreditCard, X } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { createTokenPaymentLink } from '@/redux/slices/customerTokenPaymentSlice';

type TokenPaymentMode = 'booking' | 'lifetime';

interface TokenPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: TokenPaymentMode;
  service?: string;
  date?: string;
  slot?: string;
}

const formatAmount = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(amount);

export default function TokenPaymentModal({
  open,
  onClose,
  onSuccess,
  mode = 'booking',
  service,
  date,
  slot,
}: TokenPaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentSimulated, setPaymentSimulated] = useState(false);
  const dispatch = useAppDispatch();

  if (!open) return null;

  const isLifetimeMode = mode === 'lifetime';
  const title = isLifetimeMode
    ? 'Activate Lifetime Booking Access'
    : 'Secure Token Payment';
  const subtitle = paymentAmount
    ? `Amount: ${formatAmount(paymentAmount)}`
    : isLifetimeMode
      ? 'One-time access activation'
      : 'Secure booking token';

  const handleGeneratePaymentLink = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await dispatch(
        createTokenPaymentLink(),
      ).unwrap();

      if (!data.paymentLink) {
        throw new Error('Payment link not received from the server.');
      }

      setPaymentLink(data.paymentLink);
      setPaymentAmount(data.amount);
      window.location.href = data.paymentLink;
    } catch (err: unknown) {
      console.error('Backend payment API failed:', err);
      const errMsg = err instanceof Error ? err.message : 'Failed to generate payment link. Please try again.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDescription = () => {
    if (isLifetimeMode) {
      return (
        <>
          Complete the secure token payment to activate Lifetime Booking Access
          for this account.
        </>
      );
    }

    return (
      <>
        A token payment is required to secure your booking slot
        {service ? (
          <>
            {' '}
            for <strong>{service}</strong>
          </>
        ) : null}
        {date && slot ? (
          <>
            {' '}
            on <strong>{date}</strong> at <strong>{slot}</strong>
          </>
        ) : null}
        .
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-md animate-fade-in flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 pb-4 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {title}
              </h2>
              <p className="text-xs text-slate-500">
                {subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-4">
          <p className="text-sm text-slate-600">
            {renderDescription()}
          </p>

          {!paymentLink ? (
            <button
              type="button"
              onClick={handleGeneratePaymentLink}
              disabled={isLoading}
              className="w-full cursor-pointer rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:opacity-60"
            >
              {isLoading
                ? 'Generating Link...'
                : isLifetimeMode
                  ? 'Unlock Booking Access'
                  : 'Generate Payment Link'}
            </button>
          ) : (
            <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-center">
              <p className="text-xs font-medium text-emerald-800">
                Payment Link generated successfully!
              </p>
              <div className="flex gap-2">
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPaymentSimulated(true)}
                  className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white transition-all hover:bg-emerald-700"
                >
                  Open Link
                </a>
                <button
                  type="button"
                  onClick={() => setPaymentSimulated(true)}
                  className="flex-1 cursor-pointer rounded-lg border border-emerald-300 bg-white py-2.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
                >
                  Simulate Success
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 p-2.5 text-center text-xs font-medium text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Cancel
          </button>
          {(paymentLink || paymentSimulated) && (
            <button
              type="button"
              onClick={onSuccess}
              className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              {isLifetimeMode ? 'Refresh Access' : 'Confirm & Continue'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
