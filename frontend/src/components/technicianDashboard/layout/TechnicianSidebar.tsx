'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { technicianNavigationConfig } from '@/constants/technician/navigationConfig';
import { logout } from '@/redux/slices/authSlice';

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

  const dispatch = useDispatch();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLinkClick = () => {
    onClose?.();
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <>
      <aside className="flex h-full min-h-screen w-64 flex-col border-r border-slate-200 bg-surface-white py-base">
        {/* Brand Section */}
        <div className="px-6 py-8 mb-4">
          <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            HiChandra
          </h1>
          <p className="text-secondary font-label-sm uppercase tracking-widest mt-1 opacity-70">
            Technician Portal
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {technicianNavigationConfig.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-emerald-600 font-bold border-r-2 border-primary bg-green-100'
                    : 'text-secondary hover:text-primary hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-body-md">{item.label}</span>
              </Link>
              
            );
          })}
        </nav>

        {/* Support & Logout Section */}
        <div className="px-4 mt-auto mb-6 space-y-3">
          
          
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-3 text-red-600 hover:bg-red-50 border border-red-200 font-label-md rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-150 transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Logout</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Are you sure you want to log out from the HiChandra Technician Portal?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors cursor-pointer text-sm"
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

