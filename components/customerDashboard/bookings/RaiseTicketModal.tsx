'use client';

import { LifeBuoy, X } from 'lucide-react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createComplaint } from '@/redux/slices/complaintSlice';

interface Props {
  open: boolean;
  onClose: () => void;
  bookingId: number;
  serviceId: number | null;
}

export default function RaiseTicketModal({
  open,
  onClose,
  bookingId,
  serviceId,
}: Props) {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.complaint);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSuccess('');
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    setSuccess('');
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!serviceId) {
      setError('Service information is missing for this booking.');
      return;
    }

    try {
      await dispatch(
        createComplaint({
          bookingId,
          serviceId,
          title,
          description,
        })
      ).unwrap();

      setSuccess('Support ticket submitted successfully.');
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(
        typeof err === 'string' ? err : 'Failed to submit ticket. Please try again.'
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Raise Support Ticket</h2>
              <p className="text-xs text-slate-500">Booking #{bookingId}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Pre-filled read-only fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Booking ID
              </label>
              <input
                type="text"
                value={bookingId}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Service ID
              </label>
              <input
                type="text"
                value={serviceId ?? '—'}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          {/* Editable fields */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Briefly describe the issue..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError('');
              }}
              placeholder="Provide full details of your issue..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-sm text-emerald-700">
              {success}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !title.trim() || !description.trim()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <LifeBuoy className="w-4 h-4" />
            {isLoading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
}
