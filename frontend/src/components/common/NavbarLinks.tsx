"use client";

import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

import { publicNavItems } from '@/constants/navigation/publicNav';
import type { PublicNavbarLinksProps } from '@/types/navigation.types';

const NavbarLinks = ({
  className = '',
  linkClassName = '',
  onNavigate,
}: PublicNavbarLinksProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleHashNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    onNavigate?.();

    // If we're not on the home page, navigate to home page first
    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    // If we're already on home page, scroll to the section
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <div className={className}>
      {publicNavItems.map((item) => {

        // Check if it's a hash link (same-page anchor)
        const isHashLink = item.href.startsWith('#');

        if (isHashLink) {
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleHashNavigation(event, item.href)}
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
            </a>
          );
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
