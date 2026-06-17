'use client';

import TransactionFilters from './TransactionFilters';
import TransactionRow from './TransactionRow';

const transactions = [
  {
    id: 'TXN-1001',
    job: 'AC Deep Cleaning',
    customer: 'Robert Harrison',
    date: '12 Jun 2026',
    amount: '₹2,500',
    status: 'Completed',
  },
  {
    id: 'TXN-1002',
    job: 'Kitchen Plumbing',
    customer: 'Sarah Wilson',
    date: '10 Jun 2026',
    amount: '₹1,200',
    status: 'Pending',
  },
  {
    id: 'TXN-1003',
    job: 'Electrical Repair',
    customer: 'James Clark',
    date: '08 Jun 2026',
    amount: '₹1,800',
    status: 'Completed',
  },
];

export default function TransactionsTable() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        shadow-sm
        overflow-hidden
      "
    >
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">
            Transaction History
          </h3>

          <TransactionFilters />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Transaction ID
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Service
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Customer
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Date
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Amount
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}