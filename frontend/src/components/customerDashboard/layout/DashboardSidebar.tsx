'use client';

import { LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { customerDashboardSidebarLinks } from '@/constants/customerDashboard/sidebar/customerDashboardSidebarLinks';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Returns true when the current pathname should highlight this sidebar link.
 * - Exact match for dashboard root (avoids highlighting Dashboard on every page).
 * - Prefix match for /dashboard/customer/services/* and /booking/* (booking flow).
 * - Prefix match for all other dashboard sub-routes.
 */
function isActive(href: string, pathname: string): boolean {
  if (href === '/dashboard/customer') {
    return pathname === '/dashboard/customer';
  }
  // Services link covers service detail and the downstream booking flow
  if (href === '/dashboard/customer/services') {
    return (
      pathname.startsWith('/dashboard/customer/services') ||
      pathname.startsWith('/booking')
    );
  }
  return pathname.startsWith(href);
}

const activeLinkClass =
  'bg-emerald-50 text-emerald-700 font-semibold';

const inactiveLinkClass =
  'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700';

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/');
  };

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="fixed left-0 top-0 z-50 h-screen flex-col border-r border-slate-200 hidden lg:flex">
        <div className="px-8 py-8 border-b border-b-slate-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700">HiChandra</h2>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
          {customerDashboardSidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href, pathname);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                  ${active ? activeLinkClass : inactiveLinkClass}
                `}
              >
                <Icon size={20} />
                <span className="text-sm sm:text-base">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 cursor-pointer text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={20} />
            <span className="text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar ── */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-80 max-w-[85vw]
          flex flex-col bg-white border-r border-slate-200
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-b-slate-200">
          <h2 className="text-2xl font-bold text-emerald-700">HiChandra</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
          {customerDashboardSidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href, pathname);

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 transition-all
                  ${active ? activeLinkClass : inactiveLinkClass}
                `}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <button
            type="button"
            onClick={() => { onClose(); handleLogout(); }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
