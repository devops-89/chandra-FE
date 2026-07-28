'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { JobContext } from '../JobContext';
import QuickActions from '../actions/QuickActions';
import ProgressTracker from '../tracker/ProgressTracker';
import ActiveJobInfo from './ActiveJobInfo';
import ActiveJobStatus from './ActiveJobStatus';
import CustomerDetails from './CustomerDetails';
import type { ActiveJob } from '@/types/technicianDashboard/activeJobs.types';

export default function ActiveJobCard({ 
  currentJob, 
  onStatusUpdate 
}: { 
  currentJob?: ActiveJob | null;
  onStatusUpdate?: (status: string) => void;
}) {
  if (!currentJob) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-12
          text-center
        "
      >
        <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">work_history</span>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No Active Job Assigned</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          You currently don&apost have any accepted jobs. Go to the Nearby Jobs section, find an available task that fits your schedule, and accept it to begin!
        </p>
        <Link
          href="/dashboard/technician/nearby-jobs"
          className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors text-sm cursor-pointer"
        >
          View Nearby Jobs
        </Link>
      </motion.div>
    );
  }

  return (
    <JobContext.Provider value={currentJob}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-6
          lg:p-8
          w-full
        "
      >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="
                bg-emerald-100
                text-emerald-700
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
              "
            >
              {currentJob.serviceType}
            </span>

            <ActiveJobStatus onStatusUpdate={onStatusUpdate} />
          </div>

          <h2
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {currentJob.title}
          </h2>
        </div>
      </div>
        <CustomerDetails />

        <ActiveJobInfo />
        <ProgressTracker />
        <QuickActions onStatusUpdate={onStatusUpdate} />
      </motion.div>
    </JobContext.Provider>
  );
}