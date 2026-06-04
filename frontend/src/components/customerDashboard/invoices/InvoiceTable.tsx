import { invoices } from '@/constants/dashboard/invoices';

import InvoiceRow from './InvoiceRow';

export default function InvoiceTable() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-sm
      "
    >
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 text-slate-950">
            <th className="px-4 py-4 text-left">
              Invoice
            </th>

            <th className="px-4 py-4 text-left text-slate-950">
              Service
            </th>

            <th className="px-4 py-4 text-left text-slate-950">
              Date
            </th>

            <th className="px-4 py-4 text-left text-slate-950">
              Amount
            </th>

            <th className="px-4 py-4 text-left text-slate-950">
              Status
            </th>

            <th className="px-4 py-4 text-left text-slate-950">
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