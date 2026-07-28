export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  section?: 'main' | 'support';
}

export const technicianNavigationConfig: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/technician/dashboard',
    icon: 'dashboard',
    section: 'main',
  },
  {
    id: 'bookings',
    label: 'Bookings',
    href: '/technician/bookings',
    icon: 'location_on',
    section: 'main',
  },
  {
    id: 'earnings',
    label: 'Earnings',
    href: '/technician/earnings',
    icon: 'payments',
    section: 'main',
  },

  {
    id: 'support',
    label: 'Get Support',
    href: '/technician/support',
    icon: 'help',
    section: 'main',
  },

];

export const getTechnicianNavigationBySection = (section: 'main' | 'support') => {
  return technicianNavigationConfig.filter((item) => item.section === section);
};
