'use client';

import { motion } from 'framer-motion';

import type { JobFilter, NearbyJob, ServiceOutlook } from '../types/nearby-job.types';
import FilterPills from './FilterPills';
import JobList from './JobList';
import NearbyJobsHeader from './NearbyJobsHeader';
import SearchFilterBar from './SearchFilterBar';
import SummaryPanel from './SummaryPanel';

interface NearbyJobsContentProps {
  jobs: NearbyJob[];
  filters: JobFilter[];
  serviceOutlook: ServiceOutlook;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterToggle: (filterId: string) => void;
}

export default function NearbyJobsContent({
  jobs,
  filters,
  serviceOutlook,
  searchTerm,
  onSearchChange,
  onFilterToggle,
}: NearbyJobsContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-gutter"
    >
      {/* Left Side: Job Postings */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full min-w-0 flex-1 space-y-4 sm:space-y-6"
      >
        {/* Header */}
        <NearbyJobsHeader subtitle="Available jobs near your service area" />

        {/* Search and Filter */}
        <SearchFilterBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

        {/* Filter Pills */}
        <FilterPills filters={filters} onFilterToggle={onFilterToggle} />

        {/* Job List */}
        <JobList jobs={jobs} isLoading={false} />

        {/* Mobile Summary - visible in the normal scroll flow */}
        <div className="lg:hidden">
          <SummaryPanel
            availableJobs={serviceOutlook.availableJobs}
            averagePayout={serviceOutlook.averagePayout}
            potentialEarnings={serviceOutlook.potentialEarnings}
          />
        </div>
      </motion.div>

      {/* Desktop Sidebar - Always Visible */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden w-full lg:block lg:w-96"
      >
        <SummaryPanel
          availableJobs={serviceOutlook.availableJobs}
          averagePayout={serviceOutlook.averagePayout}
          potentialEarnings={serviceOutlook.potentialEarnings}
        />
      </motion.div>
    </motion.div>
  );
}
