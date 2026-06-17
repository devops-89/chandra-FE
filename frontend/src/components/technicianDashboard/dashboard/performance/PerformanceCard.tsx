'use client';

import DashboardCard from '../shared/DashboardCard';
import PerformanceChart from './PerformanceChart';
import PerformanceStats from './PerformanceStats';

export default function PerformanceCard() {
  return (
    <DashboardCard className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h4
          className="
            text-xs
            uppercase
            tracking-widest
            text-slate-500
          "
        >
          Performance
        </h4>

        <span
          className="
            text-emerald-600
            text-sm
            bg-emerald-50
            px-2
            py-1
            rounded
          "
        >
          Weekly
        </span>
      </div>

      <PerformanceChart />

      <div className="mt-6">
        <PerformanceStats />
      </div>
    </DashboardCard>
  );
}