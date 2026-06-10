import { transactionsData } from "@/constants/admin/financeData";

import TransactionRow from "./TransactionRow";

const TransactionsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="border-b border-slate-400 p-5">
        <h3 className="font-semibold">
          Transactions
        </h3>
      </div>

      <table className="w-full">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Booking</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Method</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {transactionsData.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;