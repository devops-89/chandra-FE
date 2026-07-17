'use client';

import { motion } from 'framer-motion';
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function TermsAndPrivacy() {
  return (
    <motion.div
      className="rounded-lg md:rounded-xl p-4 md:p-5"
      variants={itemVariants}
    >
      <p className="text-xs md:text-sm text-gray-600">
        By continuing, you agree to HiChandra&apos;s{' '}
        <a
          href="/technician-terms"
          className="text-emerald-600 hover:text-emerald-700 font-semibold underline transition-colors"
        >
          Technician Terms
        </a>
        {' '}and{' '}
        <a
          href="/privacy-policy"
          className="text-emerald-600 hover:text-emerald-700 font-semibold underline transition-colors"
        >
          Privacy Policy
        </a>
        .
      </p>
    </motion.div>
  );
}
