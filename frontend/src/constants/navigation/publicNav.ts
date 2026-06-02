import type { PublicNavigationItem } from '@/types/navigation.types';

export const publicNavItems: PublicNavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
    hasDropdown: true,
  },
  {
    label: 'Pages',
    href: '/pages',
  },
  {
    label: 'News',
    href: '/news',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
