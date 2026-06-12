'use client';

import { motion } from 'framer-motion';

interface JobCardActionsProps {
  onAccept: () => void;
  onReject: () => void;
  onViewDetails: () => void;
}

export default function JobCardActions({ onAccept, onReject, onViewDetails }: JobCardActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="grid grid-cols-2 gap-2 border-t border-surface-container pt-4 sm:flex sm:items-center sm:gap-3"
    >
      {/* Accept Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onAccept}
        className="min-h-11 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-deep active:scale-95 sm:flex-1 sm:px-6 sm:text-base md:px-8"
      >
        Accept Job
      </motion.button>

      {/* Reject Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onReject}
        className="min-h-11 rounded-xl border border-outline-variant bg-surface-white px-4 py-2.5 text-sm font-bold text-secondary transition-all hover:bg-surface-container-low sm:flex-1 sm:px-6 sm:text-base md:px-8"
      >
        Reject
      </motion.button>

      {/* View Details */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onViewDetails}
        className="col-span-2 flex min-h-10 items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-primary transition-all hover:bg-primary/5 sm:col-span-1 sm:px-4 sm:text-base"
      >
        View Details
        <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
      </motion.button>
    </motion.div>
  );
}
