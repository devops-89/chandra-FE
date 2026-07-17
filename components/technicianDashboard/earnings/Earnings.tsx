'use client';

import EarningsContent from './EarningsContent';
import EarningsHeader from './header/EarningsHeader';

export default function Earnings() {
  return (
    <div className="space-y-6 p-6">
      <EarningsHeader />
      <EarningsContent />
    </div>
  );
}