'use client';

import { motion } from 'framer-motion';

import QuickActions from '../actions/QuickActions';
import ProgressTracker from '../tracker/ProgressTracker';
import ActiveJobInfo from './ActiveJobInfo';
import ActiveJobStatus from './ActiveJobStatus';
import CustomerDetails from './CustomerDetails';

export default function ActiveJobCard() {
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
          <div className="flex items-center gap-3 mb-4">
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
              AC Deep Cleaning
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
            Central Air Unit Maintenance
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
            12 Min
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