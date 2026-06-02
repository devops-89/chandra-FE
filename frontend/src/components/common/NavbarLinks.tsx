import Link from 'next/link';

import { publicNavItems } from '@/constants/navigation/publicNav';
import type { PublicNavbarLinksProps } from '@/types/navigation.types';
import NavbarServicesDropdown from '@/components/common/NavbarServicesDropdown';

const NavbarLinks = ({
  className = '',
  linkClassName = '',
  onNavigate,
}: PublicNavbarLinksProps) => {
  return (
    <div className={className}>
      {publicNavItems.map((item) => {
        if (item.hasDropdown) {
          return <NavbarServicesDropdown key={item.label} />;
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`
              relative
              inline-flex
              min-h-10
              items-center
              whitespace-nowrap
              rounded-full
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
              after:h-0.5
              after:w-0
              after:bg-emerald-700
              after:transition-all
              after:duration-300
              hover:after:w-full
              ${linkClassName}
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
