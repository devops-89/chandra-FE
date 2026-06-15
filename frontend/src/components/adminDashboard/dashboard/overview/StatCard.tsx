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
      className={`rounded-2xl border bg-white shadow-sm hover:shadow-md p-5 cursor-default transition-shadow ${
        priority ? 'border-red-200 bg-red-50/20' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <div className="mt-2 flex items-center gap-2">
            <h3
              className={`text-3xl font-bold ${
                priority ? 'text-red-600' : 'text-slate-900'
              }`}
            >
              {value}
            </h3>

            {subtitle && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-600">
                {subtitle}
              </span>
            )}
          </div>

          {!priority && (
            <div className="mt-3 flex items-center gap-1 text-emerald-600 text-xs font-medium">
              <TrendingUp size={13} />
              +8.4% this week
            </div>
          )}
        </div>

        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
            priority
              ? 'bg-red-100 text-red-600'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}