'use client';

import TransactionStatus from './TransactionStatus';

interface Props {
  transaction: {
    id: string;
    job: string;
    customer: string;
    date: string;
    amount: string;
    status: string;
  };
}

export default function TransactionRow({
  transaction,
}: Props) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50">
      <td className="px-6 py-5 font-medium text-slate-900">
        {transaction.id}
      </td>

      <td className="px-6 py-5">
        {transaction.job}
      </td>

      <td className="px-6 py-5">
        {transaction.customer}
      </td>

      <td className="px-6 py-5 text-slate-500">
        {transaction.date}
      </td>

      <td className="px-6 py-5 font-semibold text-emerald-600">
        {transaction.amount}
      </td>

      <td className="px-6 py-5">
        <TransactionStatus
          status={transaction.status}
        />
      </td>
    </tr>
  );
}