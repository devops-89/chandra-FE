'use client';

import { Calendar, RefreshCw, X } from 'lucide-react';
import { useState } from 'react';

import TimeSlotSelector from '@/components/booking/TimeSlotSelector';
import { useAppDispatch } from '@/redux/hooks';
import { rescheduleBooking } from '@/redux/slices/bookingSlice';
import type { Booking } from '@/types/booking.types';

interface Props {
  open: boolean;
  onClose: () => void;
  bookingId: number;
  currentSchedule: string;
  onSuccess: (updatedBooking: Booking) => void;
}

function buildScheduledAt(date: string, slot: string) {
  const [year, month, day] = date.split('-').map(Number);

  const [time, period] = slot.trim().split(/\s+/);
  const [hourValue, minuteValue] = time.split(':').map(Number);

  let hour = hourValue;

  if (period === 'PM' && hour !== 12) {
    hour += 12;
  }

  if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  const localDate = new Date(year, month - 1, day, hour, minuteValue);
  return localDate.toISOString();
}

export default function RescheduleModal({
  open,
  onClose,
  bookingId,
  currentSchedule,
  onSuccess,
}: Props) {
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  if (!open) return null;

  const handleSubmit = async () => {
    if (!newDate || !newSlot) {
      setError('Please select both a date and time.');
      return;
    }

    const scheduledAt = buildScheduledAt(newDate, newSlot);

    const [time, period] = newSlot.split(' ');
    const [hourStr, minuteStr] = time.split(':');

    let hour = Number(hourStr);

    if (period === 'PM' && hour !== 12) {
      hour += 12;
    }

    if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    const [year, month, day] = newDate.split('-').map(Number);
    const selectedDateTime = new Date(year, month - 1, day, hour, Number(minuteStr));

    if (selectedDateTime <= new Date()) {
      setError('Scheduled date must be in the future.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const updatedBooking = await dispatch(
        rescheduleBooking({
          bookingId,
          scheduledAt,
        }),
      ).unwrap();

      onSuccess(updatedBooking);

      setNewDate('');
      setNewSlot('');

      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to reschedule booking.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <RefreshCw className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Reschedule Booking
              </h2>

              <p className="text-xs text-slate-500">
                Booking #{bookingId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}

        <div className="px-6 py-5">
          <p className="mb-4 text-sm text-slate-600">
            Current schedule:
            <span className="ml-1 font-semibold text-slate-900">
              {currentSchedule}
            </span>
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <TimeSlotSelector
            date={newDate}
            slot={newSlot}
            onDateChange={(date) => {
              setNewDate(date);
              setError(null);
            }}
            onSlotSelect={(slot) => {
              setNewSlot(slot);
              setError(null);
            }}
          />
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !newDate || !newSlot}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
          >
            <Calendar className="h-4 w-4" />

            {isSubmitting
              ? 'Rescheduling...'
              : 'Confirm Reschedule'}
          </button>
        </div>
      </div>
    </div>
  );
}