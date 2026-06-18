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
    href: '/dashboard/technician',
    icon: 'dashboard',
    section: 'main',
  },
  {
    id: 'nearby-jobs',
    label: 'Nearby Jobs',
    href: '/dashboard/technician/nearby-jobs',
    icon: 'location_on',
    section: 'main',
  },
  {
    id: 'active-jobs',
    label: 'Active Jobs',
    href: '/dashboard/technician/active-jobs',
    icon: 'work_history',
    section: 'main',
  },
  {
    id: 'earnings',
    label: 'Earnings',
    href: '/dashboard/technician/earnings',
    icon: 'payments',
    section: 'main',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/dashboard/technician/profile',
    icon: 'person',
    section: 'main',
  },
  {
    id: 'support',
    label: 'Get Support',
    href: '/dashboard/technician/support',
    icon: 'help',
    section: 'main',
  },

];

export const getTechnicianNavigationBySection = (section: 'main' | 'support') => {
  return technicianNavigationConfig.filter((item) => item.section === section);
};
