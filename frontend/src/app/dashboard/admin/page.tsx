import DashboardShell from '@/dashboard/layout/DashboardShell';
import AdminOverview from '@/dashboard/modules/AdminOverview';

export default function AdminPage() {
   return (
      <DashboardShell>
         <AdminOverview />
      </DashboardShell>
   );
}