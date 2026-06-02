import type { PublicNavigationItem } from '@/types/navigation.types';

export const publicNavItems: PublicNavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
    hasDropdown: true,
  },
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
