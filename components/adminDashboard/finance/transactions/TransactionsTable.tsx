import { transactionsData } from "@/constants/admin/financeData";

import TransactionCard from "./TransactionCard";

const TransactionsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="border-b border-slate-400 bg-emerald-600 text-white p-5">
        <h3 className="font-semibold">Transactions</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {transactionsData.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionsTable;
