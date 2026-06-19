'use client';

import { motion } from 'framer-motion';

import { DASHBOARD_STATS_DATA } from '@/constants/customerDashboard/sidebar/dashboardStats';
import type { StatsCardProps } from '@/types/dashboardTypes/dashboardOverview.types';

function StatsCard({ icon: Icon, title, value, isHighlighted = false }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        border
        border-slate-200
        cursor-pointer
        group
      "
    >
      {/* Icon */}
      <div className="flex justify-between items-start mb-4">
        <div className="bg-emerald-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-600 font-medium mb-1">
        {title}
      </p>
      
      <h3 className={`
        text-3xl font-bold transition-colors duration-200
        ${isHighlighted 
          ? 'text-emerald-600 group-hover:text-emerald-700' 
          : 'text-slate-900 group-hover:text-slate-800'
        }
      `}>
        {value}
      </h3>
    </motion.div>
  );
}

export default function HeroBookingCard() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <h3 className="text-lg font-semibold text-slate-800 uppercase tracking-wide">
        DASHBOARD OVERVIEW
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {DASHBOARD_STATS_DATA.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            isHighlighted={stat.isHighlighted}
          />
        ))}
      </div>
    </section>
  );
}
