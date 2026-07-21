import DashboardLayout from "@/components/customerDashboard/layout/DashboardLayout";
import CustomerDashboardContent from "@/components/customerDashboard/overview/CustomerDashboardContent";

export default function CustomerDashboardPage() {
  return (
    <DashboardLayout>
      <CustomerDashboardContent />
    </DashboardLayout>
  );
}
