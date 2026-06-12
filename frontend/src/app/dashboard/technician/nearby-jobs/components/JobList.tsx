'use client';

import { motion } from 'framer-motion';

import type { NearbyJob } from '../types/nearby-job.types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: NearbyJob[];
  isLoading?: boolean;
}

export default function JobList({ jobs, isLoading = false }: JobListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-40 sm:h-48 md:h-64 bg-surface-container rounded-lg sm:rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 sm:py-12"
      >
        <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl text-secondary opacity-50 block mb-2 sm:mb-4">
          search_off
        </span>
        <p className="text-sm sm:text-base md:text-lg text-secondary">
          No jobs found matching your criteria
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <JobCard job={job} />
        </motion.div>
      ))}
    </motion.div>
  );
}
