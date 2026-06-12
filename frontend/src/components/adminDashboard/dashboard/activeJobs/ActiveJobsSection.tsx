'use client';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import {motion} from 'framer-motion';

import ActiveJobsTable from './ActiveJobsTable';

export default function ActiveJobsSection() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg p-5 cursor-default"
    >
    <Card
      elevation={0}
      className="
        rounded-2xl
        overflow-hidden
      "
    >
      <div
        className="
          px-6
          py-5
          flex
          items-center
          justify-between
        "
      >
        <h2 className="text-xl font-semibold text-slate-800">
          Active Jobs
        </h2>

        <div className="flex items-center gap-3">
          <button className="text-slate-500 hover:text-emerald-700">
            <FilterListIcon />
          </button>

          <button className="text-slate-500 hover:text-emerald-700 cursor-pointer">
            <MoreVertIcon />
          </button>
        </div>
      </div>

      <ActiveJobsTable />
    </Card>
    </motion.div>
  );
}