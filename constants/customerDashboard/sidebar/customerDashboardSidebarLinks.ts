import {
  CalendarDays,
  LayoutDashboard,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const customerDashboardSidebarLinks = [
  {
    label: 'Dashboard',
    href: '/customer/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Services',
    href: '/customer/services',
    icon: Sparkles,
  },
  {
    label: 'My Bookings',
    href: '/customer/bookings',
    icon: CalendarDays,
  },
  {
    label: 'Addresses',
    href: '/customer/addresses',
    icon: MapPin,
  },
  // {
  //   label: 'Support',
  //   href: '/customer/support',
  //   icon: Headphones,
  // },
] as const;