'use client';

import Image from 'next/image';
import NavDropdown from '@/components/common/NavDropdown';
import ServiceMegaMenu from '@/components/common/ServiceMegaMenu';

const NavbarServicesDropdown = () => {
  return (
    <NavDropdown
      renderTrigger={(open) => (
        <button
          className="
            relative
            inline-flex
            min-h-10
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
            transition-all
            duration-300
            hover:text-emerald-700
            hover:-translate-y-0.5
          "
        >
          Services

          <Image
            src="/images/down-arrow.png"
            alt="arrow"
            width={14}
            height={14}
            className={`
              transition-transform
              duration-300
              ease-in-out
              ${open ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </button>
      )}
    >
      <ServiceMegaMenu />
    </NavDropdown>
  );
};

export default NavbarServicesDropdown;
