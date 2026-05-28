import Link from 'next/link';

import { publicNavItems } from '@/constants/navigation/publicNav';

type NavbarLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

const NavbarLinks = ({
  className = '',
  linkClassName = '',
  onNavigate,
}: NavbarLinksProps) => {
  return (
    <nav className={className} aria-label="Primary navigation">
      {publicNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={`
            relative
            text-sm
            font-medium
            text-slate-600
            transition-all
            duration-300
            hover:text-emerald-700
            hover:-translate-y-1
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:w-0
            after:bg-emerald-700
            after:transition-all
            after:duration-300
            hover:after:w-full
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-4
            ${linkClassName}
          `}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavbarLinks;