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
          <tr className="bg-slate-50">
            <th className="px-4 py-4 text-left">
              Invoice
            </th>

            <th className="px-4 py-4 text-left">
              Service
            </th>

            <th className="px-4 py-4 text-left">
              Date
            </th>

            <th className="px-4 py-4 text-left">
              Amount
            </th>

            <th className="px-4 py-4 text-left">
              Status
            </th>

            <th className="px-4 py-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
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