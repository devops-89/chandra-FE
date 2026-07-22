'use client';

import RecentJob from './RecentJob';
import RecentJobsGrid from './RecentJobsGrid';

export default function NearbyJobsSection() {
  return (
    <section className="space-y-6">
      <RecentJob />
      <RecentJobsGrid />
    </section>
  );
}