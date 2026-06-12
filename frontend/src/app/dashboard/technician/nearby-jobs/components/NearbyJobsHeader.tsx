'use client';

import { motion } from 'framer-motion';

interface NearbyJobsHeaderProps {
  subtitle?: string;
}

export default function NearbyJobsHeader({
  subtitle = 'Available jobs near your service area',
}: NearbyJobsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4"
    >
      <div>
        <p className="font-body-md text-charcoal-light text-sm sm:text-base md:text-lg">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}
