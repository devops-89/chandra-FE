'use client';

import { motion } from 'framer-motion';

export default function MobileVerificationCard() {
  return (
    <motion.div
      className="border border-slate-200 rounded-lg md:rounded-2xl p-4 md:p-5 bg-gray-50 hover:shadow-sm transition-shadow duration-300"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <h4 className="font-semibold text-sm md:text-base">
        Mobile OTP Verification
      </h4>

      <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
        A 6-digit OTP will be sent to your mobile.
      </p>

      <motion.button
        type="button"
        className="mt-3 bg-white border-slate-300 text-slate-500 md:mt-4 cursor-pointer border rounded-lg md:rounded-xl px-4 py-2 text-xs md:text-sm font-medium hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        Send OTP
      </motion.button>
    </motion.div>
  );
}