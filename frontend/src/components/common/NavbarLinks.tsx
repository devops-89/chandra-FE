import Link from 'next/link';

import { publicNavItems } from '@/constants/navigation/publicNav';
import type { PublicNavbarLinksProps } from '@/types/navigation.types';

const NavbarLinks = ({ className = '', linkClassName = '', onNavigate }: PublicNavbarLinksProps) => {
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
