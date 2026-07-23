import {
  AlertTriangle,
  Briefcase,
  CalendarCheck,
  LayoutDashboard,
  Star,
  UserCog,
  Wallet,
} from "lucide-react";

export const adminSidebarItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  // {
  //   label: "Customers",
  //   href: "/admin/customers",
  //   icon: Users,
  // },
  {
    label: "Technicians",
    href: "/admin/technicians",
    icon: UserCog,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    label: "Finance",
    href: "/admin/finance",
    icon: Wallet,
    children: [
      {
        label: "Transactions",
        href: "/admin/finance/transactions",
      },
      {
        label: "Technician Payouts",
        href: "/admin/finance/payouts",
      },
    ],
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    label: "Complaints",
    href: "/admin/complaints",
    icon: AlertTriangle,
  },
];
