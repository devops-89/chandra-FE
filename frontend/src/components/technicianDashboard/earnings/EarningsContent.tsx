'use client';

import EarningsChart from './charts/EarningsChart';
// import EarningsTabs from './header/EarningsTabs';
import EarningsStats from './overview/EarningsStats';
import BankDetailsCard from './payout/BankDetailsCard';
import WalletCard from './payout/WalletCard';
import WithdrawalCard from './payout/WithdrawalCard';
import EarningsInsightsCard from './sidebar/EarningsInsightsCard';
import PerformanceCard from './sidebar/PerformanceCard';
import TransactionsTable from './transactions/TransactionsTable';

export default function EarningsContent() {
  return (
    <div className="space-y-6">
      {/* <EarningsTabs /> */}

      <EarningsStats />

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Main Content */}
        <div className="col-span-12 xl:col-span-8">
          <div className="space-y-6">
            <EarningsChart />
            <TransactionsTable />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
            <WalletCard />
            <WithdrawalCard />
            <BankDetailsCard />
            <EarningsInsightsCard />
            <PerformanceCard />
        </div>
      </div>
    </div>
  );
}