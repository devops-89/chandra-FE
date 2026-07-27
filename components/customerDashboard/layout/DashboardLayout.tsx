'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DashboardHeader from '@/components/customerDashboard/layout/DashboardHeader';
import DashboardSidebar from '@/components/customerDashboard/layout/DashboardSidebar';
import { getDashboardPathForRole } from '@/lib/authApi/redirectUtils';
import { useAppSelector } from '@/redux/hooks';
import type { DashboardLayoutProps } from '@/types/dashboardTypes/dashboard.types';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user: reduxUser } = useAppSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');

    if (!isAuthenticated && !userStr) {
      router.replace('/login');
      return;
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const roleDashboardPath = getDashboardPathForRole(user?.role);

        if (roleDashboardPath !== '/dashboard/customer') {
          router.replace(roleDashboardPath);
          return;
        }
      } catch {
        localStorage.removeItem('user');
        router.replace('/login');
        return;
      }
    } else if (isAuthenticated) {
      const roleDashboardPath = getDashboardPathForRole(reduxUser?.role);

      if (roleDashboardPath !== '/dashboard/customer') {
        router.replace(roleDashboardPath);
        return;
      }
    }

    const id = setTimeout(() => setCheckingAuth(false), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← run ONLY on mount, not on every auth state change

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex flex-1 flex-col lg:ml-48 min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
