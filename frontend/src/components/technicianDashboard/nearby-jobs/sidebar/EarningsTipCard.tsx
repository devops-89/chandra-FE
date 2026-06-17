'use client';

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { motion } from 'framer-motion';

export default function EarningsTipCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="
            h-12
            w-12
            rounded-full
            bg-amber-100
            flex
            items-center
            justify-center
          "
        >
          <LightbulbOutlinedIcon className="text-amber-500" />
        </div>

        <div>
          <h4 className="font-bold text-slate-900">
            Earnings Tip
          </h4>

          <p className="text-sm text-slate-500">
            Increase your payout
          </p>
        </div>
      </div>

      <p className="text-slate-600 leading-relaxed">
        Accepting jobs within the next 2 hours can
        increase your average earnings by
        <span className="font-bold text-emerald-600">
          {' '}15%
        </span>.
      </p>

      <div
        className="
          mt-5
          rounded-2xl
          bg-emerald-50
          p-4
        "
      >
        <p
          className="
            text-sm
            font-medium
            text-emerald-700
          "
        >
          Peak demand detected in your area.
        </p>
      </div>
    </motion.div>
  );
}