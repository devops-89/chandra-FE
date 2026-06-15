'use client';

import { useState } from 'react';

import DashboardHeader from '@/components/customerDashboard/layout/DashboardHeader';
import DashboardSidebar from '@/components/customerDashboard/layout/DashboardSidebar';
import type { DashboardLayoutProps } from '@/types/dashboardTypes/dashboard.types';

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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