import Link from 'next/link';

import { publicNavItems } from '@/constants/navigation/publicNav';

type NavbarLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

const NavbarLinks = ({ className = '', linkClassName = '', onNavigate }: NavbarLinksProps) => {
  return (
    <nav className={className} aria-label="Primary navigation">
      {publicNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={`text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 ${linkClassName}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavbarLinks;
