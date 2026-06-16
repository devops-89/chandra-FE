'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DashboardHeader from '@/components/customerDashboard/layout/DashboardHeader';
import DashboardSidebar from '@/components/customerDashboard/layout/DashboardSidebar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import type { DashboardLayoutProps } from '@/types/dashboardTypes/dashboard.types';

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userStr = localStorage.getItem('user');

    if (!token) {
      router.replace('/login');
    } else {
      if (!isAuthenticated && userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch(
            setCredentials({
              user,
              accessToken: token,
              refreshToken: refreshToken || '',
            })
          );
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          router.replace('/login');
        }
      }
      const id = setTimeout(() => setCheckingAuth(false), 0);
      return () => clearTimeout(id);
    }
  }, [isAuthenticated, dispatch, router]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <main className="flex flex-1 flex-col lg:ml-72 min-w-0">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
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