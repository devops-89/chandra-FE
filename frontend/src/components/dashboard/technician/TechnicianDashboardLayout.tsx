'use client';

import type { ReactNode } from 'react';

import TechnicianHeader, { type TechnicianHeaderProps } from './TechnicianHeader';
import TechnicianSidebar from './TechnicianSidebar';

export interface TechnicianDashboardLayoutProps {
  children: ReactNode;
  headerProps?: Omit<TechnicianHeaderProps, 'userName'> & { userName?: string };
}

export default function TechnicianDashboardLayout({
  children,
  headerProps = {},
}: TechnicianDashboardLayoutProps) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <TechnicianSidebar />

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen w-full">
        {/* Header */}
        <TechnicianHeader {...headerProps} />

        {/* Content Canvas */}
        <div className="pt-28 pb-12 px-12">{children}</div>
      </main>
    </div>
  );
}
