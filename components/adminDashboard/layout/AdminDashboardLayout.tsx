'use client';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

interface Props {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const router = useRouter();
  const { isAuthenticated, user: reduxUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const userStr = localStorage.getItem('user');

    if (!isAuthenticated && !userStr) {
      router.replace('/login');
      return;
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr);

        // Role guard — only ADMIN may enter this layout
        if (user?.role?.toUpperCase() !== 'ADMIN') {
          router.replace('/login');
          return;
        }

      } catch {
        localStorage.removeItem('user');
        router.replace('/login');
        return;
      }
    } else if (isAuthenticated && reduxUser?.role?.toUpperCase() !== 'ADMIN') {
      router.replace('/login');
      return;
    }

    const id = setTimeout(() => setCheckingAuth(false), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-only — same pattern as DashboardLayout

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
