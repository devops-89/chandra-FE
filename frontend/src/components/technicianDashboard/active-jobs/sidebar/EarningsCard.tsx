'use client';

import { TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function EarningsCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        rounded-3xl
        bg-linear-to-br
        from-emerald-500
        to-emerald-700
        p-6
        text-white
        shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">
            Job Earnings
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹2,500
          </h2>
        </div>

        <TrendingUp sx={{ fontSize: 40 }} />
      </div>

      <div className="mt-6 border-t border-white/20 pt-4">
        <p className="text-sm text-white/80">
          Estimated completion payout
        </p>
      </div>
    </motion.div>
  );
}