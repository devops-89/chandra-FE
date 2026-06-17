'use client';

import { motion } from 'framer-motion';

export default function ServiceOutlookCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        rounded-3xl
        bg-linear-to-br
        from-emerald-100
        to-emerald-50
        p-8
        border
        border-emerald-200
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-emerald-500
          font-semibold
        "
      >
        Service Outlook
      </p>

      <h2
        className="
          mt-6
          text-6xl
          font-bold
          text-white
        "
      >
        4
      </h2>

      <p
        className="
          mt-2
          text-lg
          text-white
          font-medium
        "
      >
        Available Jobs Near You
      </p>

      <div className="grid grid-cols-2 gap-8 mt-10">
        <div>
          <h4
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            $113
          </h4>

          <p className="text-white/90">
            Avg. Payout
          </p>
        </div>

        <div>
          <h4
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            $450
          </h4>

          <p className="text-white/90">
            Pot. Earnings
          </p>
        </div>
      </div>
    </motion.div>
  );
}