'use client';

import { ChevronRight, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { customerDashboardSidebarLinks } from '@/constants/customerDashboard/sidebar/customerDashboardSidebarLinks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/authSlice';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function isActive(href: string, pathname: string): boolean {
  if (href === '/customer/dashboard') {
    return pathname === '/customer/dashboard' || pathname === '/dashboard/customer';
  }
  if (href === '/customer/dashboard/services') {
    return (
      pathname.startsWith('/customer/dashboard/services') ||
      pathname.startsWith('/dashboard/customer/services') ||
      pathname.startsWith('/booking')
    );
  }
  return pathname.startsWith(href) || pathname.startsWith(href.replace('/customer/dashboard', '/dashboard/customer'));
}

const activeLinkClass = 'bg-emerald-50 text-emerald-700 font-semibold';
const inactiveLinkClass = 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700';

// ─── Profile + Logout section (shared between desktop and mobile) ─────────────

function ProfileSection({ onLogout }: { onLogout: () => void }) {
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state) => state.auth.user);
  const customerProfile = useAppSelector((state) => state.customerProfile.profile);

  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!customerProfile) {
      dispatch(fetchCustomerProfile());
    }
  }, [customerProfile, dispatch]);

  // Close menu on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const user = customerProfile ?? reduxUser ?? (() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const firstName = user?.firstName ?? 'User';
  const lastName = user?.lastName ?? '';
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || 'U';
  const fullName = `${firstName}${lastName ? ' ' + lastName[0] + '.' : ''}`.trim();

  return (
    <div className="p-2 border-t border-slate-200 relative">
      <button
        ref={anchorRef}
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors hover:bg-slate-100"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold text-base">
          {initials}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-semibold text-slate-900 truncate">{fullName}</p>
          <p className="text-xs text-slate-500">Customer</p>
        </div>
        <ChevronRight size={18} className="text-slate-400 shrink-0" />
      </button>

      {/* Popover menu — opens upward */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute left-2 right-2 bottom-full mb-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50"
        >
          <button
            type="button"
            onClick={() => { setMenuOpen(false); onLogout(); }}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 font-medium text-sm hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
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

        <ProfileSection onLogout={handleLogout} />
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

        <ProfileSection onLogout={() => { onClose(); handleLogout(); }} />
      </aside>
    </>
  );
}
