'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { useAppSelector } from '@/redux/hooks';

import QuickActions from '../actions/QuickActions';
import ProgressTracker from '../tracker/ProgressTracker';
import ActiveJobInfo from './ActiveJobInfo';
import ActiveJobStatus from './ActiveJobStatus';
import CustomerDetails from './CustomerDetails';

export default function ActiveJobCard() {
  const currentJob = useAppSelector((state) => state.activeJobs.currentJob);

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

            <ActiveJobStatus />
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

        <div className="text-left lg:text-right">
          <p className="text-slate-500">
            ETA
          </p>

          <h3
            className="
              text-3xl
              font-bold
              text-emerald-600
            "
          >
            {currentJob.status === 'completed' ? 'Done' : currentJob.eta}
          </h3>
        </div>
      </div>

      <CustomerDetails />

      <ActiveJobInfo />
      <ProgressTracker />
      <QuickActions />
    </motion.div>
  );
}