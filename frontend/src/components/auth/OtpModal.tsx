'use client';

import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const OTP_LENGTH = 6;

interface OtpModalProps {
  /** Email shown in the "we sent a code to …" subtitle */
  identifier: string;
  /** True while the parent is calling verifyOtp + registerCustomer + login */
  isVerifying: boolean;
  /** Server-side error from the verify / register step */
  apiError: string;
  /** Called with the 6-digit string when the user clicks Verify */
  onVerify: (otp: string) => void;
  /** Called when the user clicks the × or "Back" */
  onClose: () => void;
  /** Called when the user clicks "Resend OTP" */
  onResend: () => void;
  /** True while resend is in-flight */
  isResending: boolean;
  /** Custom modal title */
  title?: string;
  /** Custom modal subtitle */
  subtitle?: string;
  /** Custom verify button text */
  verifyButtonText?: string;
}

export default function OtpModal({
  identifier,
  isVerifying,
  apiError,
  onVerify,
  onClose,
  onResend,
  isResending,
  title = "Verify your account",
  subtitle = "We sent a 6-digit code to",
  verifyButtonText = "Verify OTP",
}: OtpModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [resendCountdown, setResendCountdown] = useState(30);

  // Focus first box on open
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const id = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCountdown]);

  const handleResend = () => {
    if (resendCountdown > 0 || isResending) return;
    setDigits(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    setResendCountdown(30);
    onResend();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        // clear current box
        const next = [...digits];
        next[index] = '';
        setDigits(next);
      } else if (index > 0) {
        // move to previous box
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    // accept only a single digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    // advance focus
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    // focus the box after the last pasted digit
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const otp = digits.join('');
  const isComplete = otp.length === OTP_LENGTH;

  const handleVerify = () => {
    if (!isComplete || isVerifying) return;
    onVerify(otp);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close OTP modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            {subtitle}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-700 break-all">{identifier}</p>
        </div>

        {/* API error */}
        {apiError && (
          <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="text-sm font-medium text-red-700">{apiError}</p>
          </div>
        )}

        {/* OTP input boxes */}
        <div className="mb-6 flex justify-center gap-3">
          {digits.map((digit, i) => (
            <input
            title='otp-input'
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={isVerifying}
              className={[
                'h-12 w-11 rounded-lg border-2 text-center text-lg font-bold text-slate-900',
                'outline-none transition-all duration-150',
                'disabled:cursor-not-allowed disabled:opacity-50',
                digit
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white',
                'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={!isComplete || isVerifying}
          className="w-full h-11 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isVerifying && <Loader2 className="h-4 w-4 animate-spin" />}
          {isVerifying ? 'Verifying…' : verifyButtonText}
        </button>

        {/* Resend */}
        <p className="mt-4 text-center text-sm text-slate-500">
          Didn&apos;t receive the code?{' '}
          {resendCountdown > 0 ? (
            <span className="font-medium text-slate-400">
              Resend in {resendCountdown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-emerald-700 hover:text-emerald-800 disabled:opacity-50"
            >
              {isResending ? 'Sending…' : 'Resend OTP'}
            </button>
          )}
        </p>

      </div>
    </div>
  );
}

