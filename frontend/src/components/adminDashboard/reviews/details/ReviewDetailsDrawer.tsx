'use client';

import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ReviewDetailsDrawer = ({ open, onClose }: Props) => {
  const [status, setStatus] = useState<'Published' | 'Hidden'>('Published');
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Reset state when drawer re-opens
  useEffect(() => {
    if (open) {
      setStatus('Published');
      setLastAction(null);
    }
  }, [open]);

  if (!open) return null;

  const handlePublish = () => {
    setStatus('Published');
    setLastAction('Review published successfully.');
  };

  const handleHide = () => {
    setStatus('Hidden');
    setLastAction('Review hidden from public view.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 h-full w-full max-w-lg overflow-y-auto bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Review Details</h2>

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="space-y-5">
          {/* Live status badge */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
            <span className="text-sm font-medium text-slate-500">Current status</span>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                status === 'Published'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status}
            </span>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Customer:</h4>
            <p className="mt-1 text-slate-600">Rahul Sharma</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Technician:</h4>
            <p className="mt-1 text-slate-600">Arjun Sharma</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Service:</h4>
            <p className="mt-1 text-slate-600">AC Repair</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Rating:</h4>
            <p className="mt-1 text-yellow-500">⭐⭐⭐⭐⭐</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Review:</h4>
            <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 italic">
              "Excellent service and very professional technician."
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePublish}
              disabled={status === 'Published'}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Publish
            </button>

            <button
              onClick={handleHide}
              disabled={status === 'Hidden'}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Hide Review
            </button>
          </div>

          {/* Confirmation line */}
          {lastAction && (
            <p className="text-xs font-medium text-slate-500">
              ✓ {lastAction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailsDrawer;
