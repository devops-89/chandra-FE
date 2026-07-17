import CommissionSettings from "@/components/adminDashboard/finance/commission/CommissionSettings";

export default function CommissionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Service Commission
        </h1>
        <p className="text-slate-500">Configure global commissions</p>
      </div>

      <CommissionSettings />
    </div>
  );
}
