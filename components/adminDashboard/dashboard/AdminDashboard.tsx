'use client';

import ActiveJobsSection from './activeJobs/ActiveJobsSection';
import DashboardOverview from './overview/DashboardOverview';
import ApprovalQueue from './technicianApprovals/ApprovalQueue';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <DashboardOverview />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <ActiveJobsSection />
        <ApprovalQueue />
      </div>
    </div>
  );
}
