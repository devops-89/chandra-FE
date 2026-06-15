import { payoutsData } from "@/constants/admin/financeData";

import PayoutCard from "./PayoutCard";

const PayoutTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="border-b border-slate-400 p-5">
        <h3 className="font-semibold">Technician Payouts</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {payoutsData.map((payout) => (
          <PayoutCard key={payout.id} payout={payout} />
        ))}
      </div>
    </div>
  );
};

export default PayoutTable;
