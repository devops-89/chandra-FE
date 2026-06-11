'use client';

import Card from '@mui/material/Card';

import type { TechnicianApproval } from '@/types/admin.types';

import SectionHeader from '../shared/SectionHeader';
import TechnicianApprovalCard from './TechnicianApprovalCard';

const technicians: TechnicianApproval[] = [
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

export default function ApprovalQueue() {
  return (
    <Card
      elevation={0}
      className="
        p-6
        rounded-2xl
        border
        border-slate-200
      "
    >
      <SectionHeader
        title="Technician Approval Queue"
        actionText="View All Queue"
      />

      <div className="space-y-4">
        {technicians.map(
          (technician) => (
            <TechnicianApprovalCard
              key={technician.id}
              technician={technician}
            />
          )
        )}
      </div>
    </Card>
  );
}