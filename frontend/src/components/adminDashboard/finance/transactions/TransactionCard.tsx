import type { Transaction } from "@/constants/admin/financeData";

interface Props {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: Props) => {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Txn ID: {transaction.id}
          </span>
          <h4 className="mt-1 font-semibold text-slate-900 text-lg leading-snug">
            {transaction.customer}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Booking: {transaction.bookingId}
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            transaction.status === "Success"
              ? "bg-emerald-100 text-emerald-700"
              : transaction.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {transaction.status}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 mt-4 pt-3 text-slate-700">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Amount</p>
          <p className="text-lg font-bold text-slate-900 mt-0.5">₹{transaction.amount}</p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{transaction.method}</p>
          <p className="text-xs text-slate-500 mt-1">{transaction.date}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
