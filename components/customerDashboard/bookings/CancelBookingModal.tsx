'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { cancelBooking } from '@/redux/slices/customerBookingSlice';
import type { CancelledBooking, CustomerBooking } from '@/types/customerBooking.types';

interface Props {
  open: boolean;
  onClose: () => void;
  booking: CustomerBooking;
  onSuccess: (cancelled: CancelledBooking) => void;
}

export default function CancelBookingModal({
  open,
  onClose,
  booking,
  onSuccess,
}: Props) {
  const dispatch = useAppDispatch();
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  if (!open) return null;

  const handleCancel = async () => {
    if (!cancelReason.trim()) {
      alert('Please enter a cancellation reason.');
      return;
    }

    try {
      setIsCancelling(true);

      const cancelledBooking = await dispatch(
        cancelBooking({
          bookingId: booking.bookingId,
          cancellationReason: cancelReason,
        })
      ).unwrap();

      onSuccess(cancelledBooking);
      setCancelReason('');
      onClose();
      alert('Booking cancelled successfully.');
    } catch (err) {
      alert(
        typeof err === 'string' ? err : 'Failed to cancel booking.'
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Cancel Booking
              </h2>
              <p className="text-xs text-slate-500">
                Booking #{booking.bookingId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              Reason for Cancellation
            </label>
            <textarea
              rows={3}
              placeholder="Please let us know why you are cancelling..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            disabled={isCancelling}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Keep Booking
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCancelling}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
