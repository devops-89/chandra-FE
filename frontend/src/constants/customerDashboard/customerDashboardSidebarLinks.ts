import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  User,
  Receipt,
  Headphones,
} from 'lucide-react';

export const customerDashboardSidebarLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard/customer',
    icon: LayoutDashboard,
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
  }
] as const;