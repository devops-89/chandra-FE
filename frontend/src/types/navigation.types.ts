import type { ReactNode } from 'react';


export type PublicNavigationItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export type PublicNavbarLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};


export type NavDropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
};