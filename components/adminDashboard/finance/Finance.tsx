import CommissionHistory from "./commission/CommissionHistory";
import CommissionSettings from "./commission/CommissionSettings";
import FinanceOverview from "./overview/FinanceOverview";
import PayoutTable from "./payouts/PayoutTable";
import TransactionsTable from "./transactions/TransactionsTable";

const Finance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Finance
        </h1>
        <p className="text-slate-500">Transactions and technician payouts</p>
      </div>

      <FinanceOverview />
      <CommissionSettings />
      <CommissionHistory />
      <TransactionsTable />
      <PayoutTable />
    </div>
  );
};

export default Finance;
