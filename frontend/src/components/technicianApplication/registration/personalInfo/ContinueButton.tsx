'use client';

import { motion } from 'framer-motion';

export default function ContinueButton() {
  return (
    <motion.button
      type="submit"
      className="
      w-full
      h-12 md:h-14
      bg-emerald-600 hover:bg-emerald-700
      text-white
      rounded-lg md:rounded-2xl
      font-semibold
      cursor-pointer
      text-sm md:text-lg
      transition-all duration-200
      flex items-center justify-center gap-2
      "
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      Verify & Continue
      <span className="material-symbols-outlined text-base md:text-lg">arrow_outward</span>
    </motion.button>
  );
}