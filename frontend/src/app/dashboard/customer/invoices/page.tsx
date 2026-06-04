import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

import InvoiceTable from '@/components/customerDashboard/invoices/InvoiceTable';
import InvoiceSummaryCard from '@/components/customerDashboard/invoices/InvoiceSummaryCard';

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Invoices
          </h1>

          <p className="text-slate-500">
            View and download your invoices.
          </p>
        </div>

        <InvoiceSummaryCard />

        <InvoiceTable />
      </div>
    </DashboardLayout>
  );
}