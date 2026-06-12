'use client';

import { motion } from 'framer-motion';

interface ServiceOutlookCardProps {
  availableJobs: number;
  averagePayout: number;
  potentialEarnings: number;
}

export default function ServiceOutlookCard({
  availableJobs,
  averagePayout,
  potentialEarnings,
}: ServiceOutlookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      whileHover={{ y: -4 }}
      className="bg-primary-container text-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden group"
    >
      <div className="relative z-10">
        <h4 className="font-label-md uppercase tracking-widest opacity-80 mb-4 sm:mb-6 text-xs sm:text-sm">
          Service Outlook
        </h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Main Stat */}
          <div>
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              {availableJobs}
            </motion.p>
            <p className="text-xs sm:text-sm md:text-base opacity-90">Available Jobs Near You</p>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <p className="font-headline-md font-bold text-lg sm:text-xl">
                ${averagePayout}
              </p>
              <p className="text-label-sm opacity-80 text-xs sm:text-sm">Avg. Payout</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-headline-md font-bold text-lg sm:text-xl">
                ${potentialEarnings}
              </p>
              <p className="text-label-sm opacity-80 text-xs sm:text-sm">Pot. Earnings</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Circle */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"
      />
    </motion.div>
  );
}
