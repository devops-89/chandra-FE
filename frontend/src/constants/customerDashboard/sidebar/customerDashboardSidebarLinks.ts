import {
  CalendarDays,
  Headphones,
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
    href: '/services',
    icon: Sparkles,
  },
  {
    label: 'My Bookings',
    href: '/dashboard/customer/bookings',
    icon: CalendarDays,
  },
  {
    label: 'Addresses',
    href: '/dashboard/customer/addresses',
    icon: MapPin,
  },
  {
    label: 'Support',
    href: '/dashboard/customer/support',
    icon: Headphones,
  },
  {
    label: 'Profile',
    href: '/dashboard/customer/profile',
    icon: User,
  },
  {
    label: 'Invoices',
    href: '/dashboard/customer/invoices',
    icon: Receipt,
  },
] as const;