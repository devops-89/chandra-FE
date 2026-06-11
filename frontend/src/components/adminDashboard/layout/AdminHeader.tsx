"use client";

import { Bell, Menu, Search } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  return (
    <header className="flex h-16 sm:h-20 items-center sticky top-0 z-30 justify-between bg-[#F8FAFC] border-b border-slate-200 px-4 sm:px-8 gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Hamburger for mobile */}
        <button
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

        <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md hidden sm:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Search..."
            className="h-11 w-full rounded-xl border pl-11 pr-4 bg-white focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        {/* Mobile search button */}
        <button
          className="sm:hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
          title="Search"
        >
          <Search size={20} />
        </button>

        <button
          title="Notifications"
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold text-sm sm:text-base">
            A
          </div>

          <div className="hidden sm:block">
            <p className="font-medium text-sm">Admin</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
