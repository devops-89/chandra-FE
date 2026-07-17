"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import type { User } from "@/types/auth.types";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const reduxUser = useAppSelector((state) => state.auth.user);

  // Hydration gap: Redux is empty on first render after refresh.
  // Read localStorage as fallback until Redux rehydrates.
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (reduxUser) {
      const id = setTimeout(() => setUser(reduxUser), 0);
      return () => clearTimeout(id);
    }
    try {
      const str = localStorage.getItem('user');
      if (str) {
        const parsed = JSON.parse(str);
        const id = setTimeout(() => setUser(parsed), 0);
        return () => clearTimeout(id);
      }
    } catch {
      // ignore
    }
  }, [reduxUser]);

  const firstName = user?.firstName ?? 'Admin';
  const lastName  = user?.lastName  ?? '';
  const initials  = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || 'A';
  const fullName  = `${firstName}${lastName ? ' ' + lastName[0] + '.' : ''}`.trim();

  return (
    <header className="flex h-16 sm:h-20 items-center sticky top-0 z-30 justify-between bg-[#F8FAFC] border-b border-slate-200 px-4 sm:px-8 gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Hamburger for mobile */}
        <button
          type="button"
          onClick={onMenuClick}
          className="
            lg:hidden
            rounded-lg
            p-2
            text-slate-600
            hover:bg-slate-100
            hover:text-slate-900
            transition-colors
            shrink-0
          "
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className="min-w-0 flex-1 sm:max-w-sm lg:max-w-md">
          {/* <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          /> */}
            <h1 className="truncate text-lg font-bold leading-tight text-slate-900 sm:text-2xl lg:text-3xl">Admin Portal</h1>

            <p className="text-sm sm:text-sm text-slate-500 hidden sm:block">
            Manage your Customers and services
          </p>
          {/* <input
            placeholder="Search..."
            className="h-11 w-full rounded-xl border pl-11 pr-4 bg-white focus:outline-none focus:border-emerald-400 transition-colors"
            aria-label="Search"
          /> */}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        {/* Mobile search button */}
        <button
          type="button"
          className="sm:hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
          title="Search"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          title="Notifications"
          className="rounded-full p-2 text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold text-sm sm:text-base">
            {initials}
          </div>

          <div className="hidden sm:block">
            <p className="font-medium text-sm">{fullName}</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
