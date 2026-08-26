'use client';

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';
import OtpModal from '@/components/auth/OtpModal';

import { useJobContext } from '../JobContext';

export default function VerifyOTPButton({ onStatusUpdate }: { onStatusUpdate?: (status: string) => void }) {
  const currentJob = useJobContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [apiError, setApiError] = useState('');

  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (otp: string) => {
    if (!currentJob?.rawId) return;

    setIsVerifying(true);
    setApiError('');

    try {
      // Call the actual OTP verification API
      await BookingControllers.verifyBookingOtp(currentJob.rawId, otp);
      setIsModalOpen(false);
      if (onStatusUpdate) {
        onStatusUpdate('ONGOING');
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setApiError('Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!currentJob?.rawId) return;

    setIsResending(true);
    setApiError('');
    try {
      await BookingControllers.resendBookingOtp(currentJob.rawId);
      // Optionally show a success message here
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setApiError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="
          h-14
          w-full
          sm:w-auto
          px-8
          rounded-2xl
          bg-emerald-500
          text-white
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          cursor-pointer
          hover:bg-emerald-600
          transition-all
        "
      >
        <VpnKeyIcon />
        Verify OTP
      </button>

      {isModalOpen && (
        <OtpModal
          identifier={currentJob?.customerName || 'Customer'}
          title="Verify Job OTP"
          subtitle="Please enter the 6-digit OTP provided by the customer."
          verifyButtonText="Verify & Start Job"
          isVerifying={isVerifying}
          apiError={apiError}
          onVerify={handleVerify}
          onClose={() => setIsModalOpen(false)}
          onResend={handleResend}
          isResending={isResending}
        />
      )}
    </>
  );
}
