'use client';

import NearbyJobsHeader from './header/NearbyJobsHeader';
import NearbyJobsContent from './NearbyJobsContent';

export default function NearbyJobs() {
  return (
    <div className="space-y-6">
      <NearbyJobsHeader />
      <NearbyJobsContent />
    </div>
  );
}