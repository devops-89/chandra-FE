'use client';

import { motion } from 'framer-motion';

export default function EarningsHeader() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <h1 className="text-4xl font-bold text-slate-900">
        Earnings & Payouts
      </h1>

      <p className="text-slate-500 text-lg">
        Track your income and withdrawals
      </p>

      <p className="text-sm text-slate-400">
        {today}
      </p>
    </motion.div>
  );
}