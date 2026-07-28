import CustomerDashboard from "@/components/customerDashboard/CustomerDashboard";
import DashboardLayout from "@/components/customerDashboard/layout/DashboardLayout";

export default function CustomerDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto">
        <CustomerDashboard />
      </div>
    </DashboardLayout>
  );
}
