'use client';

import { motion } from 'framer-motion';

export default function BookingsHeader() {
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
      className="flex flex-col mt-6 gap-2"
    >
      <h1 className="text-3xl font-bold text-slate-900">
        Bookings & Requests
      </h1>

      <p className="text-slate-500">
        {today}
      </p>
    </motion.div>
  );
}
