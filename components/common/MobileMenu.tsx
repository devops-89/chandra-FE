'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import NavbarLinks from '@/components/common/NavbarLinks';
import { getDashboardPathForRole } from '@/lib/authApi/redirectUtils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/authSlice';

const MobileMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleDashboard = () => {
    let role: string | undefined;

    try {
      const userStr = localStorage.getItem('user');
      if (userStr) role = JSON.parse(userStr)?.role;
    } catch {
      // ignore malformed JSON
    }

    closeMenu();
    router.push(getDashboardPathForRole(role));
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    closeMenu();
    router.push('/');
  };

  return (
    <div className="shrink-0 md:hidden">
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors duration-200 hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:size-11"
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        <span className="relative h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${isOpen ? 'translate-y-1.75 rotate-45' : ''}`}
          />
          <span
            className={`absolute left-0 top-1.75 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${isOpen ? '-translate-y-1.75 -rotate-45' : ''}`}
          />
        </span>
      </button>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-3 top-[calc(100%+0.625rem)] origin-top rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-300 min-[420px]:inset-x-4 sm:rounded-3xl sm:p-4 ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
      >
        <NavbarLinks
          onNavigate={closeMenu}
          className="flex flex-col gap-1"
          linkClassName="rounded-2xl px-3 py-2.5 text-sm hover:bg-emerald-50 sm:px-4 sm:py-3 sm:text-base"
        />

        {isAuthenticated ? (
          <div className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 min-[420px]:grid-cols-2 sm:mt-4 sm:gap-3 sm:pt-4">
            <button
              type="button"
              onClick={handleDashboard}
              className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:h-11"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:h-11"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 min-[420px]:grid-cols-2 sm:mt-4 sm:gap-3 sm:pt-4">
            <Link
              href="/login"
              onClick={closeMenu}
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:h-11"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={closeMenu}
              className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:h-11"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
