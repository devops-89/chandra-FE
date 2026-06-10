import { payoutsData } from "@/constants/admin/financeData";

import PayoutRow from "./PayoutRow";

const PayoutTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className=" border-b border-slate-400 p-5">
        <h3 className="font-semibold">
          Technician Payouts
        </h3>
      </div>

      <table className="w-full">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <th className="p-4 text-left">
              Payout ID
            </th>

            <th className="p-4 text-left">
              Technician
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {payoutsData.map((payout) => (
            <PayoutRow
              key={payout.id}
              payout={payout}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutTable;