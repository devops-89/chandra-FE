'use client';

import ActiveJobCard from './details/ActiveJobCard';
import JobStatusTabs from './header/JobStatusTabs';
import EarningsCard from './sidebar/EarningsCard';
import JobSummaryCard from './sidebar/JobSummaryCard';
import NotesCard from './sidebar/NotesCard';

export default function ActiveJobsContent() {
  return (
    <div className="space-y-6">
      <JobStatusTabs />

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Main Content */}
        <div className="col-span-12 xl:col-span-8">
          <ActiveJobCard />
        </div>

        {/* Sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <EarningsCard />
          <JobSummaryCard />
          <NotesCard />
        </div>
      </div>
    </div>
  );
}