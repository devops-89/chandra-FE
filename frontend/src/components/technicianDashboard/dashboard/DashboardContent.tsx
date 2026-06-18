'use client';

import ActiveJobsSection from './active-jobs/ActiveJobsSection';
// import LoyaltyCard from './loyalty/LoyaltyCard';
import NearbyJobsSection from './nearby-jobs/NearbyJobsSection';
import PerformanceCard from './performance/PerformanceCard';
import RecentActivityCard from './recent-activity/RecentActivityCard';

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Main Content */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <NearbyJobsSection />
        <ActiveJobsSection />
      </div>

      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <PerformanceCard />
        <RecentActivityCard />
        {/* <LoyaltyCard /> */}
      </div>
    </div>
  );
}