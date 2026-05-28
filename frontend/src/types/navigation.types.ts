export type PublicNavigationItem = {
  label: string;
  href: string;
};

export type PublicNavbarLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};
