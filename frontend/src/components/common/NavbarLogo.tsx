import Link from 'next/link';

const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Go to home page">
      <span className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-semibold text-white shadow-sm">
        C
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight text-slate-950">Chandra</span>
        <span className="mt-1 text-xs font-medium text-slate-500">Cleaning Services</span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
