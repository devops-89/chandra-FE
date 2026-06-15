import type { TechnicianApproval } from '@/types/admin.types';

export const technicians: TechnicianApproval[] = [
  {
    id: 1,
    name: 'Arjun Sharma',
    experience: 8,
    verified: true,
    email: 'arjun@gmail.com',
    phone: '+91 9876543210',
    address: 'Delhi, India',
    skills: [
      'Electrical',
      'EV Charger',
    ],
  },

  {
    id: 2,
    name: 'Priya Dass',
    experience: 5,
    verified: false,
    email: 'priya@gmail.com',
    phone: '+91 9876543211',
    address: 'Noida, India',
    skills: [
      'AC Repair',
      'Solar Cleaning',
    ],
  },
];

export default technicians;
