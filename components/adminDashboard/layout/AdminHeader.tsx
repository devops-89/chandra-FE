"use client";

import { Menu } from "lucide-react";


interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
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
      </div>
    </header>
  );
};

export default AdminHeader;
