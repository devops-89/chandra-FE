'use client';

import { motion } from 'framer-motion';

interface EarningsTipCardProps {
  title?: string;
  message?: string;
}

export default function EarningsTipCard({
  title = 'Earning Tip',
  message = "Jobs in Sector 52 have a 20% higher average payout today. Consider accepting 'Urgent' requests for bonus points.",
}: EarningsTipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-surface-container-low p-4 sm:p-6 rounded-lg sm:rounded-xl border border-outline-variant/30 flex gap-3 sm:gap-4"
    >
      <motion.span
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="material-symbols-outlined text-primary text-2xl sm:text-[32px] shrink-0 mt-0.5"
      >
        lightbulb
      </motion.span>
      <div className="min-w-0">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-label-md text-on-surface mb-1 text-sm sm:text-base"
        >
          {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-label-sm text-charcoal-light text-xs sm:text-sm leading-tight"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}
