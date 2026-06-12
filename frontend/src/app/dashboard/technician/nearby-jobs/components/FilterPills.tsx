'use client';

import { motion } from 'framer-motion';

import type { JobFilter } from '../types/nearby-job.types';

interface FilterPillsProps {
  filters: JobFilter[];
  onFilterToggle: (filterId: string) => void;
}

export default function FilterPills({ filters, onFilterToggle }: FilterPillsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:gap-3 sm:px-0"
    >
      {filters.map((filter, index) => (
        <motion.button
          key={filter.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterToggle(filter.id)}
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all sm:px-5 sm:py-2.5 sm:text-sm ${
            filter.active
              ? 'bg-primary text-white shadow-sm'
              : 'bg-surface-white border border-outline-variant text-secondary hover:border-primary/50'
          }`}
        >
          {filter.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
