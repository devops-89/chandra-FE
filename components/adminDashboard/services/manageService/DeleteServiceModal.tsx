'use client';

import { useServiceManager } from '@/hooks/useServiceManager';
import type { AdminService } from '@/types/admin/service.types';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  /** The service targeted for deletion — null = modal closed */
  service: AdminService | null;
  /** Called when the modal should close without deleting */
  onClose: () => void;
  /** Called when deletion is confirmed */
  onDelete: () => void;
}

/* ─── Component ─────────────────────────────────────────────────── */
const DeleteServiceModal = ({ service, onClose, onDelete }: Props) => {
  const isOpen = service !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' as any }}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              px-4
            "
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start gap-4 border-b border-slate-100 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Delete Service
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-sm text-slate-600">
                  Are you sure you want to permanently delete{' '}
                  <span className="font-semibold text-slate-900">
                    {service?.name}
                  </span>
                  ? All associated bookings and data will be affected.
                </p>

                {/* Service preview chip */}
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {service?.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      ₹{service?.price} · {service?.bookings} bookings
                    </p>
                  </div>
                  <span
                    className={`
                      shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${service?.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-600'
                      }
                    `}
                  >
                    {service?.status}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
                <button
                  onClick={onClose}
                  className="
                    flex-1 rounded-xl border border-slate-200
                    py-2.5 text-sm font-medium text-slate-600
                    hover:bg-slate-50 transition-colors
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="
                    flex-1 rounded-xl bg-red-600
                    py-2.5 text-sm font-medium text-white
                    hover:bg-red-700 transition-colors
                  "
                >
                  Delete Service
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteServiceModal;

/**
 * Re-export the hook so consumers can import both from one place:
 *   import DeleteServiceModal, { useServiceManager } from '.../DeleteServiceModal'
 */
export { useServiceManager };
