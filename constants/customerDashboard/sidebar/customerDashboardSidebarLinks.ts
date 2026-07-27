import {
  CalendarDays,
  LayoutDashboard,
  MapPin,
  Receipt,
  Sparkles,
  User,
} from 'lucide-react';

export const customerDashboardSidebarLinks = [
  {
    label: 'Dashboard',
    href: '/customer/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Services',
    href: '/customer/dashboard/services',
    icon: Sparkles,
  },
  {
    label: 'My Bookings',
    href: '/customer/dashboard/bookings',
    icon: CalendarDays,
  },
  {
    label: 'Addresses',
    href: '/customer/dashboard/addresses',
    icon: MapPin,
  },
  // {
  //   label: 'Support',
  //   href: '/customer/dashboard/support',
  //   icon: Headphones,
  // },
  {
    label: 'Profile',
    href: '/customer/dashboard/profile',
    icon: User,
  },
  {
    label: 'Invoices',
    href: '/customer/dashboard/invoices',
    icon: Receipt,
  },
] as const;