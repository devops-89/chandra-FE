'use client';

import { motion } from 'framer-motion';

interface BankDetailsFooterProps {
  onPreviousStep: () => void;
  onSaveContinue: () => void;
  isLoading?: boolean;
}

export default function BankDetailsFooter({
  onPreviousStep,
  onSaveContinue,
  isLoading = false,
}: BankDetailsFooterProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <motion.button
        type="button"
        onClick={onPreviousStep}
        className="flex items-center gap-2 text-secondary hover:text-primary px-4 md:px-6 py-2 transition-all group font-medium text-sm md:text-base"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span
          className="material-symbols-outlined transition-transform group-hover:-translate-x-1"
          style={{ fontSize: '20px' }}
        >
          arrow_back
        </span>
        <span>Previous Step</span>
      </motion.button>

      <motion.button
        type="button"
        onClick={onSaveContinue}
        disabled={isLoading}
        className="bg-primary hover:bg-emerald-deep disabled:opacity-50 disabled:cursor-not-allowed text-on-primary rounded-lg md:rounded-xl px-6 md:px-8 py-3 font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg text-sm md:text-base"
        whileHover={!isLoading ? { y: -2 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        <span>{isLoading ? 'Saving...' : 'Save & Continue'}</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
          arrow_forward
        </span>
      </motion.button>
    </div>
  );
}
