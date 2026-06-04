import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { DashboardLayoutProps } from '@/types/dashboardTypes/dashboard.types';

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />

      <main className="flex flex-1 flex-col">
        <DashboardHeader />

        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}