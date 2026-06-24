'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DashboardHeader from '@/components/customerDashboard/layout/DashboardHeader';
import DashboardSidebar from '@/components/customerDashboard/layout/DashboardSidebar';
import { getDashboardPathForRole } from '@/lib/authApi/redirectUtils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import type { DashboardLayoutProps } from '@/types/dashboardTypes/dashboard.types';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user: reduxUser } = useAppSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userStr = localStorage.getItem('user');

    if (!token) {
      // Only redirect to /login if we're not already navigating away
      // (e.g. after logout the sidebar already calls router.push('/'))
      router.replace('/login');
      return;
    }

    if (!isAuthenticated && userStr) {
      try {
        const user = JSON.parse(userStr);
        const roleDashboardPath = getDashboardPathForRole(user?.role);

        if (roleDashboardPath !== '/dashboard/customer') {
          router.replace(roleDashboardPath);
          return;
        }

        dispatch(
          setCredentials({
            user,
            accessToken: token,
            refreshToken: refreshToken || '',
          }),
        );
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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

      <main className="flex flex-1 flex-col lg:ml-54 min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 p-5 sm:pt-16 lg:p-10 overflow-y-auto">{children}</div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
