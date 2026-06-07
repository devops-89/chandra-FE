import { Download } from "lucide-react";

import type { Invoice } from "@/types/dashboardTypes/customerDashboard/customerDashboard.types";

type InvoiceItemProps = {
  invoice: Invoice;
};

const InvoiceItem = ({ invoice }: InvoiceItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="text-sm font-bold">#{invoice.id}</p>
        <p className="text-xs text-slate-500">
          {invoice.invoiceDate} • ${invoice.amount.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
          invoice.status === "Paid"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}>
          {invoice.status}
        </span>
        <a
          href={invoice.pdfUrl}
          className="text-slate-500 transition-colors hover:text-emerald-600"
          aria-label={`Download invoice ${invoice.id}`}
        >
          <Download className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default InvoiceItem;

