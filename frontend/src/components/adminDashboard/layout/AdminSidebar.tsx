"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { adminSidebarItems } from "@/constants/admin/adminSidebar";

const AdminSidebar = () => {
  const pathname = usePathname();
  const router= useRouter();
  return (
    
    <aside className="h-screen w-72 sticky top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-emerald-600">
          HiChandra
        </h2>

        <p className="text-sm text-slate-500">
          Admin Portal
        </p>
      </div>

      <div className="flex h-[calc(100vh-100px)] flex-col">
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
          <button
            className="
              mt-auto
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-red-600
              transition
              hover:bg-red-50
            "
            onClick={() => router.push("/login")}
          >
            <LogOut size={20} />
            <span className="text-sm sm:text-base">Logout</span>
          </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;