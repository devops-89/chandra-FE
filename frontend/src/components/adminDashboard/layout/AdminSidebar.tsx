"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminSidebarItems } from "@/constants/admin/adminSidebar";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-72 bg-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-emerald-600">
          HiChandra
        </h2>

        <p className="text-sm text-slate-500">
          Admin Portal
        </p>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {adminSidebarItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;