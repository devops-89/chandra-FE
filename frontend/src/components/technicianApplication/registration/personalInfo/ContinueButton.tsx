'use client';

import { motion } from 'framer-motion';

interface ContinueButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  label?: string;
}

export default function ContinueButton({ onClick, isDisabled = false, label = 'Create Account' }: ContinueButtonProps) {
  return (
    <motion.button
      type="submit"
      onClick={onClick}
      disabled={isDisabled}
      className="w-full h-12 md:h-14 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer rounded-lg md:rounded-2xl font-semibold text-sm md:text-lg transition-all duration-200 flex items-center justify-center gap-2"
      whileHover={!isDisabled ? { y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {label}
      <span className="material-symbols-outlined text-base md:text-lg">arrow_outward</span>
    </motion.button>
  );
}