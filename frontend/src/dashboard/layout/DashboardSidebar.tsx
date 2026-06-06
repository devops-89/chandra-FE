'use client';

import {
  CalendarCheck,
  Home,
  LifeBuoy,
  LogOut,
  type LucideIcon,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const sidebarLinks: SidebarLink[] = [
  {
    label: 'Overview',
    href: '/dashboard/admin',
    icon: Home,
  },
  {
    label: 'Bookings',
    href: '/dashboard/admin/bookings',
    icon: CalendarCheck,
  },
  {
    label: 'Customers',
    href: '/dashboard/admin/customers',
    icon: Users,
  },
  {
    label: 'Support',
    href: '/dashboard/admin/support',
    icon: LifeBuoy,
  },
  {
    label: 'Settings',
    href: '/dashboard/admin/settings',
    icon: Settings,
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function isActiveLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/dashboard/admin"
      className={cn(
        'flex items-center gap-3 rounded-lg text-slate-950 outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500',
        compact ? 'justify-center' : 'px-1',
      )}
      aria-label="HiChandra admin dashboard"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-lg font-bold text-white">
        HC
      </span>

      {!compact && (
        <span className="min-w-0">
          <span className="block truncate text-xl font-bold leading-6">
            HiChandra
          </span>
          <span className="block truncate text-sm font-medium text-slate-500">
            Admin panel
          </span>
        </span>
      )}
    </Link>
  );
}

function SidebarNav({
  compact = false,
  onNavigate,
}: {
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto',
        compact ? 'items-center px-2 py-4' : 'px-4 py-6',
      )}
      aria-label="Dashboard navigation"
    >
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        const active = isActiveLink(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            title={compact ? link.label : undefined}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group flex min-h-11 items-center rounded-lg text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500',
              compact
                ? 'w-11 justify-center'
                : 'w-full justify-start gap-3 px-4',
              active
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
            )}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {compact ? (
              <span className="sr-only">{link.label}</span>
            ) : (
              <span className="truncate">{link.label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      title={compact ? 'Logout' : undefined}
      className={cn(
        'flex min-h-11 items-center rounded-lg text-sm font-medium text-red-600 outline-none transition hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-400',
        compact ? 'w-11 justify-center' : 'w-full gap-3 px-4',
      )}
    >
      <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
      {compact ? (
        <span className="sr-only">Logout</span>
      ) : (
        <span className="truncate">Logout</span>
      )}
    </button>
  );
}

export default function DashboardSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Open dashboard navigation"
          aria-expanded={isMobileOpen}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </header>

      <aside className="sticky top-0 hidden h-screen w-20 shrink-0 flex-col border-r border-slate-200 bg-white md:flex xl:hidden">
        <div className="flex h-20 items-center justify-center border-b border-slate-200 px-2">
          <Brand compact />
        </div>
        <SidebarNav compact />
        <div className="border-t border-slate-200 p-2">
          <LogoutButton compact />
        </div>
      </aside>

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white xl:flex">
        <div className="border-b border-slate-200 px-7 py-6">
          <Brand />
        </div>
        <SidebarNav />
        <div className="border-t border-slate-200 p-4">
          <LogoutButton />
        </div>
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-50 bg-slate-950/40 transition-opacity md:hidden',
          isMobileOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 md:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Mobile dashboard navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <Brand />
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Close dashboard navigation"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <SidebarNav onNavigate={() => setIsMobileOpen(false)} />

        <div className="border-t border-slate-200 p-4">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
