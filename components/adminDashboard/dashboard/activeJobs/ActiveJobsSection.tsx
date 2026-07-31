'use client';

import { motion } from 'framer-motion';
import { Filter, MoreVertical } from 'lucide-react';

import ActiveJobsTable from './ActiveJobsTable';

export default function ActiveJobsSection() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md overflow-hidden cursor-default transition-shadow"
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-800">Active Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Live booking statuses</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer">
            <Filter size={16} />
          </button>
          <button className="p-2 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <ActiveJobsTable />
    </motion.div>
  );
}
