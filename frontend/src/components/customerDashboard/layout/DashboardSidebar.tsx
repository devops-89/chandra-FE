'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { customerDashboardSidebarLinks } from '@/constants/customerDashboard/customerDashboardSidebarLinks';
import Link from 'next/link';
import { customerDashboardSidebarLinks } from '@/constants/customerDashboard/customerDashboardSidebarLinks';
import { LogOut, X } from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-72
          flex-col
          border-r
          border-slate-200
          hidden
          lg:flex
        "
      >
        <div className="px-8 py-8 border-b">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700">
            HiChandra
          </h2>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">
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
                <span className="text-sm sm:text-base">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
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
            <span className="text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-80
          max-w-[85vw]
          flex-col
          border-r
          border-slate-200
          bg-amber-400
          transform
          transition-transform
          duration-300
          ease-in-out
          lg:hidden
          flex
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-amber-500">
          <h2 className="text-2xl font-bold text-emerald-700">
            HiChandra
          </h2>
          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-emerald-700
              hover:bg-emerald-100
              transition-colors
            "
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">
          {customerDashboardSidebarLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
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

        <div className="p-4 border-t border-amber-500">
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
    </>
  );
}