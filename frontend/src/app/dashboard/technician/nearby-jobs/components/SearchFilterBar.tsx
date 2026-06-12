'use client';

import { motion } from 'framer-motion';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterClick?: () => void;
}

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  onFilterClick,
}: SearchFilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex w-full min-w-0 items-center gap-2 sm:gap-3"
    >
      {/* Search Input */}
      <div className="relative min-w-0 flex-1">
        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-charcoal-light sm:left-4">
          search
        </span>
        <input
          type="text"
          placeholder="Search service type..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-outline-variant bg-surface-white py-0 pl-10 pr-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary sm:h-14 sm:pl-12 sm:pr-4 sm:text-base"
        />
      </div>

      {/* Filter Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFilterClick}
        className="flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-white text-secondary transition-all hover:bg-surface-container-low sm:h-14 sm:w-auto sm:px-5 sm:text-base"
        aria-label="Filter jobs"
      >
        <span className="material-symbols-outlined text-lg sm:text-[20px]">filter_list</span>
        <span className="hidden font-label-md sm:inline">Filter</span>
      </motion.button>
    </motion.div>
  );
}
