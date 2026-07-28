'use client';

import ActiveJobsSection from './active-jobs/ActiveJobsSection';
import NearbyJobsSection from './nearby-jobs/NearbyJobsSection';

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Main Content */}
      <div className="col-span-12 space-y-6">
        <NearbyJobsSection />
        <ActiveJobsSection />
      </div>
    </div>
  );
}