import FinanceOverview from "@/components/adminDashboard/finance/overview/FinanceOverview";
import TransactionsTable from "@/components/adminDashboard/finance/transactions/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Transactions & Overview
        </h1>
        <p className="text-slate-500">Global finance overview and recent transactions</p>
      </div>

      <FinanceOverview />
      <TransactionsTable />
    </div>
  );
}
