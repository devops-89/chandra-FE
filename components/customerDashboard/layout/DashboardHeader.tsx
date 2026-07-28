'use client';

import { Menu } from 'lucide-react';

import { useAppSelector } from '@/redux/hooks';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const customerProfile = useAppSelector((state) => state.customerProfile.profile);
  const reduxUser = useAppSelector((state) => state.auth.user);

  const user = customerProfile ?? reduxUser;
  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || 'C';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Dashboard
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block sm:text-sm">
            Manage your bookings and services
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-semibold text-sm shadow-sm">
          {initials}
        </div>
      </div>
    </header>
  );
}
