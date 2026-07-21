'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { technicianNavigationConfig } from '@/constants/technician/navigationConfig';
import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/authSlice';

interface TechnicianSidebarProps {
  onClose?: () => void;
}

export default function TechnicianSidebar({ onClose }: TechnicianSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Exact match for dashboard home
    if (href === '/dashboard/technician') {
      return pathname === '/dashboard/technician';
    }
    // Starts with href for sub-pages
    return pathname.startsWith(href);
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLinkClick = () => {
    onClose?.();
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  return (
    <>
      <aside className="flex h-full min-h-screen w-64 flex-col border-r border-slate-150/70 bg-surface-white py-6">
        {/* Brand Section */}
        <div className="px-6 py-6 mb-2">
          <h1 className="font-bold text-2xl text-emerald-750 tracking-tight">
            HiChandra
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Technician Portal
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {technicianNavigationConfig.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 select-none ${
                  active
                    ? 'text-emerald-900 font-bold bg-emerald-100/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span className={`material-symbols-outlined text-xl ${active ? 'text-emerald-800' : 'text-slate-500'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Support & Logout Section */}
        <div className="px-4 mt-auto mb-2">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full h-11 text-red-650 hover:bg-red-50/75 border border-red-200/60 font-semibold rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-slate-150 transform transition-all duration-300 scale-100">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Confirm Logout</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Are you sure you want to log out from the HiChandra Technician Portal?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 h-11 border border-slate-200 rounded-full text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 h-11 bg-red-650 text-white rounded-full font-bold hover:bg-red-750 transition-colors cursor-pointer text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

