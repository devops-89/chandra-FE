'use client';

import DashboardContent from './DashboardContent';
import OverviewStats from './overview/OverviewStats';

export default function Dashboard() {
  return (
      <div className="space-y-6 md:space-y-10">
        <OverviewStats />
        <DashboardContent />
      </div>
  );
}