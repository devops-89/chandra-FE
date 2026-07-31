'use client';

import { motion } from 'framer-motion';
import { useAppSelector } from '@/redux/hooks';
import { selectNearbyJobs } from '@/redux/selectors/nearbyJobsSelectors';

export default function ServiceOutlookCard() {
  const jobs = useAppSelector(selectNearbyJobs);
  
  const availableJobsCount = jobs.length;
  
  const totalEarnings = jobs.reduce((sum, job) => {
    const amount = parseFloat(job.payout.replace(/[^0-9.]/g, '')) || 0;
    return sum + amount;
  }, 0);
  
  const avgPayout = availableJobsCount > 0 ? (totalEarnings / availableJobsCount).toFixed(0) : 0;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        rounded-3xl
        bg-emerald-600
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
          text-emerald-50
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
        {availableJobsCount}
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
            ₹{avgPayout}
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
            ₹{totalEarnings.toFixed(0)}
          </h4>

          <p className="text-white/90">
            Pot. Earnings
          </p>
        </div>
      </div>
    </motion.div>
  );
}