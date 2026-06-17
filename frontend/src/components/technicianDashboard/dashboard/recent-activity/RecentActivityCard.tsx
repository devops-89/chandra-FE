'use client';

import DashboardCard from '../shared/DashboardCard';
import ActivityList from './ActivityList';

export default function RecentActivityCard() {
  return (
    <DashboardCard className="p-4 md:p-6">
      <h4
        className="
          text-xs
          uppercase
          tracking-widest
          text-slate-500
          mb-6
        "
      >
        Recent Activity
      </h4>

      <ActivityList />

      <button
        type="button"
        className="
          w-full
          mt-6
          py-2
          text-emerald-600
          hover:bg-emerald-50
          rounded-lg
          transition-all
        "
      >
        View Full History
      </button>
    </DashboardCard>
  );
}