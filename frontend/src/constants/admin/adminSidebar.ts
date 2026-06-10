import {
  Briefcase,
  CalendarCheck,
  LayoutDashboard,
  Star,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";

export const adminSidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    href: "/dashboard/admin/bookings",
    icon: CalendarCheck,
  },
  {
    label: "Customers",
    href: "/dashboard/admin/customers",
    icon: Users,
  },
  {
    label: "Technicians",
    href: "/dashboard/admin/technicians",
    icon: UserCog,
  },
  {
    label: "Services",
    href: "/dashboard/admin/services",
    icon: Briefcase,
  },
  {
    label: "Finance",
    href: "/dashboard/admin/finance",
    icon: Wallet,
  },
  {
    label: "Reviews",
    href: "/dashboard/admin/reviews",
    icon: Star,
  },
];