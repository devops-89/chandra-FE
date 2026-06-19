"use client";

import { LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { adminSidebarItems } from "@/constants/admin/adminSidebar";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContent = ({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/');
  };

  return (
    <>
      <nav className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">
        {adminSidebarItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-slate-600 hover:bg-emerald-50"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          type="button"
          className=" flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition  hover:bg-red-50
          "
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="text-sm sm:text-base">Logout</span>
        </button>
      </div>
    </>
  );
};

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-72 sticky top-0 flex-col border-r border-slate-200 bg-white">
        <div className="h-20 px-5 flex flex-col justify-center border-b border-slate-200">
          <h2 className="text-2xl font-bold text-emerald-600">HiChandra</h2>
          <p className="text-sm text-slate-500">Admin Portal</p>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <aside
        className={` fixed left-0 top-0 z-50 h-screen w-80 max-w-[85vw] flex flex-col bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-emerald-700">HiChandra</h2>
            <p className="text-sm text-slate-500">Admin Portal</p>
          </div>
          <button
            onClick={onClose}
            className=" rounded-full p-2 text-emerald-700 hover:bg-emerald-100 transition-colors "
          >
            <X size={24} />
          </button>
        </div>
        <SidebarContent onLinkClick={onClose} />
      </aside>
    </>
  );
};

export default AdminSidebar;