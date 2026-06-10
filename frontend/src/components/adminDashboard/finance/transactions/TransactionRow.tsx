import type { Transaction } from "@/constants/admin/financeData";

interface Props {
  transaction: Transaction;
}

const TransactionRow = ({
  transaction,
}: Props) => {
  return (
    <tr className="border-b">
      <td className="p-4">
        {transaction.id}
      </td>

      <td className="p-4">
        {transaction.bookingId}
      </td>

      <td className="p-4">
        {transaction.customer}
      </td>

      <td className="p-4">
        ₹{transaction.amount}
      </td>

      <td className="p-4">
        {transaction.method}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            transaction.status === "Success"
              ? "bg-emerald-100 text-emerald-700"
              : transaction.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {transaction.status}
        </span>
      </td>

      <td className="p-4">
        {transaction.date}
      </td>
    </tr>
  );
};

export default TransactionRow;