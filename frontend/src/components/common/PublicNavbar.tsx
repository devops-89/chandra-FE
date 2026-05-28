import Link from 'next/link';

import MobileMenu from '@/components/common/MobileMenu';
import NavbarLinks from '@/components/common/NavbarLinks';
import NavbarLogo from '@/components/common/NavbarLogo';

const PublicNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavbarLogo />

        <NavbarLinks className="hidden items-center gap-8 md:flex" />

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition-colors duration-200 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Signup
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
};

export default PublicNavbar;
