'use client';

import NearbyJobsGrid from './NearbyJobsGrid';
import NearbyJobsHeader from './NearbyJobsHeader';

export default function NearbyJobsSection() {
  return (
    <section className="space-y-6">
      <NearbyJobsHeader />
      <NearbyJobsGrid />
    </section>
  );
}