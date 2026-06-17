'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { technicianNavigationConfig } from '@/constants/technician/navigationConfig';

interface TechnicianSidebarProps {
  onClose?: () => void;
}

export default function TechnicianSidebar({ onClose }: TechnicianSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Exact match for dashboard home
    if (href === '/dashboard/technician') {
      return pathname === '/dashboard/technician';
    }
    // Starts with href for sub-pages
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    onClose?.();
  };

  return (
    <aside className="flex h-full min-h-screen w-64 flex-col border-r border-slate-200 bg-surface-white py-base">
      {/* Brand Section */}
      <div className="px-6 py-8 mb-4">
        <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
          HiChandra
        </h1>
        <p className="text-secondary font-label-sm uppercase tracking-widest mt-1 opacity-70">
          Technician Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {technicianNavigationConfig.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'text-emerald-600 font-bold border-r-2 border-primary bg-green-100'
                  : 'text-secondary hover:text-primary hover:bg-primary'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-body-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Support Section */}
      <div className="px-4 mt-auto mb-6">
        <button
          type="button"
          className="w-full py-3 bg-secondary-container text-on-secondary-container font-label-md rounded-xl hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">support_agent</span>
          Get Support
        </button>
      </div>
    </aside>
  );
}
