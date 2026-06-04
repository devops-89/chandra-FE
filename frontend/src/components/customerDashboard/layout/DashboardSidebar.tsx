'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { customerDashboardSidebarLinks } from '@/constants/customerDashboard/customerDashboardSidebarLinks';

export default function DashboardSidebar() {

  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-slate-200
        bg-white
      "
    >
      <div className="px-8 py-8">
        <h2 className="text-3xl font-bold text-emerald-700">
          HiChandra
        </h2>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {customerDashboardSidebarLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-slate-600
                transition-all
                hover:bg-emerald-50
                hover:text-emerald-700
              "
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-600
            transition
            hover:bg-red-50
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}