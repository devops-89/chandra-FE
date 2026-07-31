import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import SupportOverview from '@/components/customerDashboard/support/SupportOverview';

export default function SupportPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Support
          </h1>

          <p className="text-slate-500">
            Get help, contact support, or raise a ticket.
          </p>
        </div>

        <SupportOverview />
      </div>
    </DashboardLayout>
  );
}