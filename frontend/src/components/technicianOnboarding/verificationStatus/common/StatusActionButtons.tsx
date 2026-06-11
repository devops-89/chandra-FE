'use client';

import { motion } from 'framer-motion';

import type { StatusActionButtonsProps } from '../types';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function StatusActionButtons({
  primaryAction,
  secondaryAction,
  isLoading = false,
}: StatusActionButtonsProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-4 justify-center"
      variants={containerVariants}
    >
      {secondaryAction && (
        <motion.button
          type="button"
          onClick={secondaryAction.onClick}
          disabled={isLoading}
          className="px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl border border-outline-variant text-secondary hover:text-primary hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
          whileHover={!isLoading ? { y: -2 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {secondaryAction.label}
        </motion.button>
      )}

      <motion.button
        type="button"
        onClick={primaryAction.onClick}
        disabled={isLoading}
        className="px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl bg-primary hover:bg-emerald-deep text-on-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        whileHover={!isLoading ? { y: -2 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <>
            <motion.span
              className="material-symbols-outlined"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              sync
            </motion.span>
            Processing...
          </>
        ) : (
          <>
            <span>{primaryAction.label}</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
