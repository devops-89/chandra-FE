'use client';

import Card from '@mui/material/Card';
import {motion} from 'framer-motion';

import { technicians } from '@/constants/admin/approvalQueue';

import SectionHeader from '../shared/SectionHeader';
import TechnicianApprovalCard from './TechnicianApprovalCard';

export default function ApprovalQueue() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl h-full border border-slate-200 bg-white hover:shadow-lg p-5 cursor-default"
    >
    <Card
      elevation={0}
      className="
        p-6
        rounded-2xl
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
    </motion.div>
  );
}