import AdminLayout from "@/components/adminDashboard/layout/AdminDashboardLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
