'use client';

import EarningsTipCard from './EarningsTipCard';
import ServiceAreaMapCard from './ServiceAreaMapCard';
import ServiceOutlookCard from './ServiceOutlookCard';

export default function SummaryPanel() {
  return (
    <div className="space-y-6">
      <ServiceOutlookCard />
      <ServiceAreaMapCard />
      <EarningsTipCard />
    </div>
  );
}