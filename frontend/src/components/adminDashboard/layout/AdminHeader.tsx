"use client";

import {
  Bell,
  Search,
} from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="flex h-20 items-center sticky top-0 justify-between bg-[#F8FAFC] px-8">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          placeholder="Search..."
          className="h-11 w-full rounded-xl border pl-11 pr-4"
        />
      </div>

      <div className="flex items-center gap-5">
        <button title="bell" className="text-slate-500 hover:">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
            A
          </div>

          <div>
            <p className="font-medium">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;