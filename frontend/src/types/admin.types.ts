export interface DashboardStat {
  id: number;
  title: string;
  value: string;
  icon: string;
  priority?: boolean;
  subtitle?: string;
}

export interface TechnicianApproval {
  id: number;
  name: string;
  image?: string;
  experience: number;
  verified: boolean;

  email: string;
  phone: string;
  address: string;

  skills: string[];

  createdAt?: string;
}

export interface ActiveJob {
  id: string;

  customer: string;

  technician: string;

  category: string;

  status:
    | 'In Progress'
    | 'Dispatched'
    | 'Delayed'
    | 'Completed';

  bookingDate?: string;
}

export interface RevenueData {
  day: string;
  amount: number;
}

export interface ServicePerformance {
  id: number;

  service: string;

  percentage: number;
}

export interface LiveMapMetric {
  repeatCustomers: number;

  averageRating: number;

  activeJobs: number;

  zone: string;
}

export interface TechnicianMarker {
  id: number;

  type:
    | 'available'
    | 'busy'
    | 'emergency';

  top: string;

  left: string;
}

export interface Technician {
  id: number;

  name: string;

  image?: string;

  email: string;

  phone: string;

  city: string;

  services: string[];

  rating: number;

  completedJobs: number;

  earnings: number;

  joinedDate: string;

  status:
    | 'Online'
    | 'Busy'
    | 'Offline';
}

export interface TechnicianPerformance {
  technicianId: number;

  technicianName: string;

  jobsCompleted: number;

  averageRating: number;

  responseTime: string;

  repeatCustomers: number;
}

/* ================================================= */
/* SETTINGS */
/* ================================================= */

export interface AdminProfile {
  name: string;

  email: string;

  phone: string;

  role: string;

  avatar?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;

  smsNotifications: boolean;

  pushNotifications: boolean;

  technicianApprovalAlerts: boolean;

  bookingAlerts: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;

  loginAlerts: boolean;

  sessionTimeout: number;
}

export interface ServiceSettings {
  serviceRequestAutoAssign: boolean;

  technicianCommissionPercentage: number;

  allowCustomerCancellation: boolean;
}

/* ================================================= */
/* FILTERS */
/* ================================================= */

export interface TechnicianFilter {
  search: string;

  status:
    | 'All'
    | 'Online'
    | 'Busy'
    | 'Offline';

  service: string;
}

export interface JobFilter {
  search: string;

  status:
    | 'All'
    | 'In Progress'
    | 'Dispatched'
    | 'Delayed'
    | 'Completed';

  category: string;
}