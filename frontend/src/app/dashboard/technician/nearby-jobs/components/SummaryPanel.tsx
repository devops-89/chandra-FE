'use client';

import { motion } from 'framer-motion';

import EarningsTipCard from './EarningsTipCard';
import ServiceAreaMapCard from './ServiceAreaMapCard';
import ServiceOutlookCard from './ServiceOutlookCard';

interface SummaryPanelProps {
  availableJobs: number;
  averagePayout: number;
  potentialEarnings: number;
}

export default function SummaryPanel({
  availableJobs,
  averagePayout,
  potentialEarnings,
}: SummaryPanelProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full lg:w-96 space-y-4 sm:space-y-6"
    >
      {/* Service Outlook Card */}
      <ServiceOutlookCard
        availableJobs={availableJobs}
        averagePayout={averagePayout}
        potentialEarnings={potentialEarnings}
      />

      {/* Service Area Map Card */}
      <ServiceAreaMapCard onExpandRange={() => console.log('Expand range')} />

      {/* Earnings Tip Card */}
      <EarningsTipCard />
    </motion.aside>
  );
}
