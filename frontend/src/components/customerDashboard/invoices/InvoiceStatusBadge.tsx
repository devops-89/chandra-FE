import { Invoice } from '@/types/invoicesTypes/invoice.types';

export default function InvoiceStatusBadge({
  status,
}: {
  status: Invoice['status'];
}) {
  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium

        ${
          status === 'PAID'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-amber-100 text-amber-700'
        }
      `}
    >
      {status}
    </span>
  );
}
