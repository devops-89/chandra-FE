import { useEffect, useState } from 'react';

import BookingInfo from './BookingInfo';
import ComplaintTimeline from './ComplaintTimeline';
import CustomerInfo from './CustomerInfo';
import TechnicianInfo from './TechnicianInfo';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Action = 'resolved' | 'refunded' | 'reassigned' | null;

const ACTION_CONFIG: Record<
  NonNullable<Action>,
  { label: string; colour: string }
> = {
  resolved: {
    label: '✅ Complaint marked as Resolved.',
    colour: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  },
  refunded: {
    label: '💰 Refund has been issued to the customer.',
    colour: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  reassigned: {
    label: '🔄 Technician reassignment initiated.',
    colour: 'bg-blue-50 border-blue-200 text-blue-700',
  },
};

const ComplaintDetailsDrawer = ({ open, onClose }: Props) => {
  const [actionTaken, setActionTaken] = useState<Action>(null);

  // Reset state when drawer closes — deferred to avoid synchronous setState in effect
  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => setActionTaken(null), 0);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Auto-close 1.5 s after an action is taken
  useEffect(() => {
    if (!actionTaken) return;
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [actionTaken, onClose]);

  if (!open) return null;

  const config = actionTaken ? ACTION_CONFIG[actionTaken] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 h-full w-full max-w-2xl overflow-y-auto bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Complaint Details</h2>
            <p className="text-slate-500">CMP001</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
          <h3 className="font-semibold text-red-700">Poor Service Quality</h3>
          <p className="mt-2 text-sm text-slate-600">
            Customer reported that the service was not completed properly and
            requested a follow-up visit.
          </p>
        </div>

        <div className="space-y-6">
          <ComplaintTimeline />

          <div className="grid gap-6 lg:grid-cols-2">
            <CustomerInfo />
            <TechnicianInfo />
          </div>

          <BookingInfo />

          <div className="rounded-2xl border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Resolution Actions</h3>

            {config ? (
              // Success banner
              <div
                className={`rounded-xl border px-5 py-4 text-sm font-medium ${config.colour}`}
              >
                {config.label}
                <span className="ml-2 text-xs opacity-70">Closing…</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActionTaken('resolved')}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Resolve Complaint
                </button>

                <button
                  onClick={() => setActionTaken('refunded')}
                  className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors cursor-pointer"
                >
                  Issue Refund
                </button>

                <button
                  onClick={() => setActionTaken('reassigned')}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Reassign Technician
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsDrawer;
