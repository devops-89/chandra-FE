'use client';

import EarningsStats from './overview/EarningsStats';
import TransactionsTable from './transactions/TransactionsTable';

export default function EarningsContent() {
  return (
    <div className="space-y-6">
      {/* <EarningsTabs /> */}
      <EarningsStats />
      
      <TransactionsTable />
    </div>
  );
}