import DashboardShell from '@/dashboard/layout/DashboardShell';
import AdminOverview from '@/dashboard/modules/admin/AdminOverview';

export default function AdminPage() {
   return (
      <DashboardShell>
         <AdminOverview />
      </DashboardShell>
   );
}