'use client';

import { motion } from 'framer-motion';

import JobCardActions from './JobCardActions';
import JobDetails from './JobDetails';

interface Props {
  job: {
    id: number;
    serviceType: string;
    title: string;
    customerName: string;
    rating: number;
    reviews: number;
    location: string;
    distance: string;
    schedule: string;
    duration: string;
    payout: string;
    urgency: string;
  };
}

export default function JobCard({ job }: Props) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-4
        shadow-sm
      "
    >
      <JobDetails job={job} />

      <JobCardActions />
    </motion.div>
  );
}