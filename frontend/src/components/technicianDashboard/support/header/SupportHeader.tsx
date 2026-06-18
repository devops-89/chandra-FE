'use client';

import { motion } from 'framer-motion';

export default function SupportHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <h1 className="text-4xl font-bold text-slate-900 mt-8">
        Get Support
      </h1>

      <p className="text-slate-500 text-lg">
        Need help? Contact support, raise tickets, or
        find answers instantly.
      </p>
    </motion.div>
  );
}