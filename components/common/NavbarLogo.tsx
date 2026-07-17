import Link from 'next/link';

const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
      aria-label="Go to home page"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-semibold text-white shadow-sm sm:size-11 md:size-10 xl:size-11">
        C
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate text-sm font-semibold tracking-tight text-slate-950 sm:text-base md:text-sm lg:text-base">
          HiChandra
        </span>
        <span className="mt-1 hidden truncate text-xs font-medium text-slate-500 sm:block md:hidden xl:block">
          Trusted Home Services
        </span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
