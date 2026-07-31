'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  value: number;
  color: string;
  icon: ReactNode;
  iconClassName: string;
}

const BookingStatusCards = ({ title, value, color, icon, iconClassName }: Props) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="min-h-32 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-lg cursor-default sm:p-5"
    >
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium leading-snug text-slate-500 sm:text-sm">
            {title}
          </p>

          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${iconClassName}`}>
            {icon}
          </div>
        </div>

        <h3 className={`text-2xl font-bold leading-none sm:text-3xl ${color}`}>
          {value}
        </h3>
      </div>
    </motion.div>
  );
};

export default BookingStatusCards;
