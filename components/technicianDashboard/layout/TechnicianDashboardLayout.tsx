'use client';

import { type ReactNode, useState } from 'react';

import TechnicianSidebar from '@/components/technicianDashboard/layout/TechnicianSidebar';

import TechnicianHeader, { type TechnicianHeaderProps } from './TechnicianHeader';

export interface TechnicianDashboardLayoutProps {
  children: ReactNode;
  headerProps?: Omit<TechnicianHeaderProps, 'userName'> & { userName?: string };
}

export default function TechnicianDashboardLayout({
  children,
  headerProps = {},
}: TechnicianDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <TechnicianSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
        <TechnicianHeader
          {...headerProps}
          onMenuToggle={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
