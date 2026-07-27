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
    href: '/dashboard/customer',
    icon: LayoutDashboard,
  },
  {
    label: 'Services',
    href: '/dashboard/services',
    icon: Sparkles,
  },
  {
    label: 'My Bookings',
    href: '/dashboard/bookings',
    icon: CalendarDays,
  },
  {
    label: 'Addresses',
    href: '/dashboard/addresses',
    icon: MapPin,
  },
  // {
  //   label: 'Support',
  //   href: '/dashboard/customer/support',
  //   icon: Headphones,
  // },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Invoices',
    href: '/dashboard/invoices',
    icon: Receipt,
  },
] as const;