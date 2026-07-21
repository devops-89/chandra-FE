'use client';

import RecentJobsGrid from './RecentJobsGrid';
import RecentJob from './RecentJob';

export default function NearbyJobsSection() {
  return (
    <section className="space-y-6">
      <RecentJob />
      <RecentJobsGrid />
    </section>
  );
}