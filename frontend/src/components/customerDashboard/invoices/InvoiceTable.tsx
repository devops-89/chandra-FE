import { invoices } from '@/constants/dashboard/invoices';

import InvoiceRow from './InvoiceRow';

export default function InvoiceTable() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-lg
      "
    >
      <table className="w-full">
        <thead>
          <tr className="text-white bg-emerald-600">
            <th className="px-4 py-4 text-left">
              Invoice
            </th>

            <th className="px-4 py-4 text-left text-white">
              Service
            </th>

            <th className="px-4 py-4 text-left text-white">
              Date
            </th>

            <th className="px-4 py-4 text-left text-white">
              Amount
            </th>

            <th className="px-4 py-4 text-left text-white">
              Status
            </th>

            <th className="px-4 py-4 text-left text-white">
              Action
            </th>
          </tr>
        </thead>

        <tbody
          className="text-slate-700"
        >
          {invoices.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}