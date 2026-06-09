'use client';

import type { ReactNode } from 'react';

import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

interface Props {
  children: ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64">
        <AdminHeader />

        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}