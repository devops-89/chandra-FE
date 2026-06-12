'use client';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Card from '@mui/material/Card';
import { motion } from 'framer-motion';

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
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg p-5 cursor-default"
    >
    <Card
      elevation={0}
      className={`
        p-6
        rounded-2xl
        transition-all
        hover:shadow-lg
        hover:-translate-y-1
        ${
          priority
            ? 'border-red-200 bg-red-50/30'
            : 'border-slate-200'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <h3
              className={`
                text-3xl
                font-bold

                ${
                  priority
                    ? 'text-red-600'
                    : 'text-emerald-700'
                }
              `}
            >
              {value}
            </h3>

            {subtitle && (
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold uppercase bg-red-100 text-red-600">
                {subtitle}
              </span>
            )}
          </div>

          {!priority && (
            <div className="mt-3 flex items-center gap-1 text-emerald-600 text-xs">
              <TrendingUpIcon
                sx={{ fontSize: 14 }}
              />
              +8.4% this week
            </div>
          )}
        </div>

        <div
          className={`
            h-14
            w-14
            rounded-xl
            flex
            items-center
            justify-center

            ${
              priority
                ? 'bg-red-100 text-red-600'
                : 'bg-emerald-100 text-emerald-700'
            }
          `}
        >
          {icon}
        </div>
      </div>
    </Card>
    </motion.div>
  );
}