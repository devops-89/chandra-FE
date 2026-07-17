'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function RevenueTrendCard() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' as any }}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md p-5 cursor-default transition-shadow"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-slate-800">Revenue Trend (7d)</h3>
        <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
          <TrendingUp size={14} />
          +12.4%
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4">Past 7 days earnings</p>

      <div className="h-[150px]">
        <svg viewBox="0 0 400 150" className="w-full h-full">
          <defs>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[30, 70, 110].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path
            d="M0,120 Q50,110 80,90 T160,70 T240,40 T320,60 T400,20 L400,150 L0,150 Z"
            fill="url(#revenueGradient)"
          />

          {/* Trend line */}
          <path
            d="M0,120 Q50,110 80,90 T160,70 T240,40 T320,60 T400,20"
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {[
            [0, 120], [80, 90], [160, 70], [240, 40], [320, 60], [400, 20],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="white"
              stroke="#059669"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* Day labels */}
      <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-medium px-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </motion.div>
  );
}