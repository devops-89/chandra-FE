'use client';

import ActiveJobCard from './ActiveJobCard';
import ActiveJobHeader from './ActiveJobHeader';

export default function ActiveJobsSection() {
  return (
    <section className="space-y-6">
      <ActiveJobHeader />
      <ActiveJobCard />
    </section>
  );
}