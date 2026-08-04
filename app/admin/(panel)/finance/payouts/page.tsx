import FinanceOverview from "@/components/adminDashboard/finance/overview/FinanceOverview";
import PayoutTable from "@/components/adminDashboard/finance/payouts/PayoutTable";

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Technician Payouts
        </h1>
        <p className="text-slate-500">Manage and view technician payouts</p>
      </div>

      <FinanceOverview />
      <PayoutTable />
    </div>
  );
}
