'use client';

import { motion } from 'framer-motion';

import type { SubmitApprovalButtonProps } from '@/types/technicianApplication/reviewSubmit.types';

import { buttonVariants } from '../animations/reviewAnimations';

export default function SubmitApprovalButton({
  onClick,
  isLoading = false,
  disabled = false,
}: SubmitApprovalButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="mx-auto flex bg-surface-white cursor-pointer text-emerald-deep px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow disabled:opacity-80 disabled:cursor-not-allowed items-center gap-4 justify-center min-w-max"
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled ? 'hover' : 'initial'}
      whileTap={!disabled ? 'tap' : 'initial'}
    >
      {isLoading ? (
        <>
          <motion.span
            className="material-symbols-outlined "
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' as any }} // eslint-disable-line @typescript-eslint/no-explicit-any
          >
            sync
          </motion.span>
          Processing...
        </>
      ) : (
        <>
          Submit For Approval
          <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
            arrow_forward
          </span>
        </>
      )}
    </motion.button>
  );
}
