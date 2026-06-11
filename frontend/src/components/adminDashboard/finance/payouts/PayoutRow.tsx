import type { Payout } from "@/constants/admin/financeData";

interface Props {
  payout: Payout;
}

const PayoutRow = ({ payout }: Props) => {
  return (
    <tr>
      <td className="p-4 text-slate-700">{payout.id}</td>

      <td className="p-4 text-slate-700">
        {payout.technician}
      </td>

      <td className="p-4 text-slate-700">
        ₹{payout.amount}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            payout.status === "Released"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {payout.status}
        </span>
      </td>

      <td className="p-4 text-slate-700">
        {payout.date}
      </td>

      <td className="p-4">
        <button className="text-emerald-600 hover:underline cursor-pointer">
          View
        </button>
      </td>
    </tr>
  );
};

export default PayoutRow;