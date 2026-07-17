import InvoiceItem from "@/components/customerDashboard/invoices/InvoiceItem";
import { DashboardCard, EmptyState } from "@/components/customerDashboard/shared";
import { useInvoices } from "@/hooks/useInvoices";

const RecentInvoices = () => {
  const { invoices } = useInvoices();

  return (
    <section className="mt-14 space-y-7">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Recent Invoices
      </h4>

      {invoices.length === 0 ? (
        <EmptyState
          title="No Invoices Found"
          description="Your recent invoices will appear here."
        />
      ) : (
        <DashboardCard className="divide-y divide-slate-200 text-black p-0">
          {invoices.map((invoice) => (
            <InvoiceItem key={invoice.id} invoice={invoice} />
          ))}
        </DashboardCard>
      )}
    </section>
  );
};

export default RecentInvoices;
