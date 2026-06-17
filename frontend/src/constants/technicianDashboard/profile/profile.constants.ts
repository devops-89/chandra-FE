import type { TechnicianProfile } from '@/types/technicianDashboard/profile.types';

export const MOCK_TECHNICIAN_PROFILE: TechnicianProfile = {
  id: 'TECH-001',

  fullName: 'Vikram',

  email: 'vikram@example.com',

  phone: '+91 9876543210',

  profileImage: '/images/technician-avatar.png',

  address:
    'Tower A, Green Valley Apartments, Sector 52, Gurgaon',

  experience: 5,

  rating: 4.9,

  completedJobs: 248,

  verified: true,

  skills: [
    'AC Repair',
    'AC Installation',
    'Electrical Wiring',
    'Maintenance',
  ],

  serviceCategories: [
    'AC Services',
    'Electrical',
    'Appliance Repair',
  ],

  availability: {
    isAvailable: true,

    workingHours: '09:00 AM - 07:00 PM',

    serviceRadius: '15 Km',
  },

  bankDetails: {
    accountHolder: 'Vikram',

    accountNumber: 'XXXX XXXX 4587',

    ifscCode: 'HDFC0001234',

    upiId: 'vikram@upi',
  },
};