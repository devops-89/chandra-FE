'use client';

import ActiveJobsSection from './activeJobs/ActiveJobsSection';
import LiveJobsMap from './liveJobsMap/LiveJobsMap';
import DashboardOverview from './overview/DashboardOverview';
import RevenueTrendCard from './overview/RevenueTrendCard';
import ServicePerformanceCard from './overview/servicePerformanceCard';
import ApprovalQueue from './technicianApprovals/ApprovalQueue';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ApprovalQueue />
        </div>

        <div className="lg:col-span-5 space-y-8">
          <RevenueTrendCard />
          <ServicePerformanceCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActiveJobsSection />
        </div>

        <div>
          <LiveJobsMap />
        </div>
      </div>
    </div>
  );
}