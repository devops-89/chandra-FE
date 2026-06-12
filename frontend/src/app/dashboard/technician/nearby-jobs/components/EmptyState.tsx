'use client';

import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'No Jobs Available',
  description = 'There are no jobs matching your criteria at the moment. Try adjusting your filters.',
  icon = 'search_off',
  actionLabel = 'Clear Filters',
  onAction = () => {},
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6 text-center"
    >
      <motion.span
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="material-symbols-outlined text-4xl sm:text-5xl md:text-6xl text-secondary opacity-50 mb-3 sm:mb-4"
      >
        {icon}
      </motion.span>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-headline-md text-on-surface mb-2 text-lg sm:text-xl md:text-2xl"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-body-md text-secondary max-w-sm mb-4 sm:mb-6 text-xs sm:text-sm md:text-base"
      >
        {description}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAction}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-emerald-deep transition-all"
      >
        {actionLabel}
      </motion.button>
    </motion.div>
  );
}
