'use client';

import { motion } from 'framer-motion';

export default function NearbyJobsHeader() {
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
      className="flex flex-col gap-2"
    >
      <h1 className="text-3xl font-bold text-slate-900">
        Available Jobs Near Your Service Area
      </h1>

      <p className="text-slate-500">
        {today}
      </p>
    </motion.div>
  );
}