import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ReleasePayoutModal = ({ open, onClose }: Props) => {
  const [released, setReleased] = useState(false);

  // Reset when modal re-opens — deferred to avoid synchronous setState in effect
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => setReleased(false), 0);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Auto-close 1.5 s after release
  useEffect(() => {
    if (!released) return;
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [released, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {released ? (
          // Success state
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Payout Released!</h2>
            <p className="text-sm text-slate-500">
              The payout has been successfully released to the technician.
            </p>
            <p className="text-xs text-slate-400">Closing…</p>
          </div>
        ) : (
          // Confirmation state
          <>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">
              Release Payout
            </h2>

            <p className="mb-5 text-slate-500">
              Are you sure you want to release this payout to the technician? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => setReleased(true)}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Release
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReleasePayoutModal;
