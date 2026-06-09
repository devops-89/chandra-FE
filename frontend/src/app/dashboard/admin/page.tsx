import AdminDashboard from '@/components/adminDashboard/dashboard/AdminDashboard';
import AdminDashboardLayout from '@/components/adminDashboard/dashboard/layout/AdminDashboardLayout';

export default function AdminPage() {
  return (
    <AdminDashboardLayout>
      <AdminDashboard />
    </AdminDashboardLayout>
  );
}