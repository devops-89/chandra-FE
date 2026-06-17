'use client';

import { motion } from 'framer-motion';

export default function ActiveJobsHeader() {
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
      className="space-y-2 mt-6"
    >
      <h1 className="text-4xl font-bold text-slate-900">
        Active Job Tracking
      </h1>

      <p className="text-slate-500 text-lg">
        {today}
      </p>
    </motion.div>
  );
}