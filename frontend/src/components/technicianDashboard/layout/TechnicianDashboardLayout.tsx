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
    <div className="relative flex min-h-screen">
      {/* Desktop Sidebar - Always visible on desktop */}
      <div className="sticky top-0 z-50 hidden h-screen w-64 shrink-0 md:block">
        <TechnicianSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 z-50 transform transition-transform duration-300 md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <TechnicianSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="min-h-screen min-w-0 flex-1">
        {/* Header */}
        <TechnicianHeader
          {...headerProps}
          onMenuToggle={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Content Canvas */}
        <div className="pt-20 pb-6 px-4 md:px-8">{children}</div>
      </main>
    </div>
  );
}
