import { Download } from 'lucide-react';

import { Props } from '@/types/invoicesTypes/invoice.types';

import InvoiceStatusBadge from '@/components/customerDashboard/invoices/InvoiceStatusBadge';



export default function InvoiceRow({
  invoice,
}: Props) {
  return (
    <tr className="border-b">
      <td className="px-4 py-4">
        {invoice.invoiceNumber}
      </td>

      <td className="px-4 py-4">
        {invoice.serviceName}
      </td>

      <td className="px-4 py-4">
        {invoice.date}
      </td>

      <td className="px-4 py-4">
        ₹{invoice.amount}
      </td>

      <td className="px-4 py-4">
        <InvoiceStatusBadge
          status={invoice.status}
        />
      </td>

      <td className="px-4 py-4">
        <button
          className="
            flex
            items-center
            gap-2
            text-emerald-700
          "
        >
          <Download size={16} />
          Download
        </button>
      </td>
    </tr>
  );
}