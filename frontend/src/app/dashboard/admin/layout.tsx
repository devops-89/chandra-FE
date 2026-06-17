import AdminLayout from "@/components/adminDashboard/layout/AdminDashboardLayout";
import { ServiceProvider } from "@/redux/ServiceContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceProvider>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ServiceProvider>
  );
}