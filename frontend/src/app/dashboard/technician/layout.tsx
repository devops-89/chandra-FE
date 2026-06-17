import TechnicianDashboardLayout from '@/components/technicianDashboard/layout/TechnicianDashboardLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TechnicianDashboardLayout>
      {children}
    </TechnicianDashboardLayout>
  );
}