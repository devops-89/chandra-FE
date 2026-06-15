import type { Payout } from "@/constants/admin/financeData";

interface Props {
  payout: Payout;
}

const PayoutCard = ({ payout }: Props) => {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Payout ID: {payout.id}
          </span>
          <h4 className="mt-1 font-semibold text-slate-900 text-lg leading-snug">
            {payout.technician}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Date: {payout.date}
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            payout.status === "Released"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {payout.status}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 mt-4 pt-3 text-slate-700">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Payout Amount</p>
          <p className="text-lg font-bold text-slate-900 mt-0.5">₹{payout.amount}</p>
        </div>

        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline cursor-pointer">
          View
        </button>
      </div>
    </div>
  );
};

export default PayoutCard;
