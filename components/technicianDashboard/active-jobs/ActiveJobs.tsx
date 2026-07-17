'use client';

import ActiveJobsContent from './ActiveJobsContent';
import ActiveJobsHeader from './header/ActiveJobsHeader';

export default function ActiveJobs() {
  return (
    <div className="space-y-6">
      <ActiveJobsHeader />
      <ActiveJobsContent />
    </div>
  );
}