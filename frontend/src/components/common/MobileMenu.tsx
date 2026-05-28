'use client';

import Link from 'next/link';
import { useState } from 'react';

import NavbarLinks from '@/components/common/NavbarLinks';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors duration-200 hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
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
        className={`absolute inset-x-4 top-[calc(100%+0.75rem)] origin-top rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
      >
        <NavbarLinks
          onNavigate={closeMenu}
          className="flex flex-col gap-1"
          linkClassName="rounded-2xl px-4 py-3 text-base hover:bg-emerald-50"
        />

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
          <Link
            href="/login"
            onClick={closeMenu}
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Login
          </Link>
          <Link
            href="/signup"
            onClick={closeMenu}
            className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
