'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  priority?: boolean;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  priority,
  subtitle,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`min-h-32 min-w-0 rounded-2xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 cursor-default ${
        priority ? 'border-red-200 bg-red-50/20' : 'border-slate-200'
      }`}
    >
      <div className="flex h-full min-w-0 flex-col justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium leading-snug text-slate-500 sm:text-sm">{title}</p>

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${
                priority
                  ? 'bg-red-100 text-red-600'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {icon}
            </div>
          </div>

          <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
            <h3
              className={`text-2xl font-bold leading-none sm:text-3xl ${
                priority ? 'text-red-600' : 'text-slate-900'
              }`}
            >
              {value}
            </h3>

            {subtitle && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-600">
                {subtitle}
              </span>
            )}
          </div>

          {!priority && (
            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp size={13} />
              +8.4% this week
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
