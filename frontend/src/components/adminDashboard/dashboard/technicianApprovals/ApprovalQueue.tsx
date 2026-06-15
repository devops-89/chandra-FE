'use client';

import { motion } from 'framer-motion';
import { ChevronRight,ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { technicians } from '@/constants/admin/approvalQueue';

import TechnicianApprovalCard from './TechnicianApprovalCard';

export default function ApprovalQueue() {
  const router = useRouter();
  const count = technicians.length;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl h-full border border-slate-200 bg-white hover:shadow-lg cursor-default"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <ClipboardList size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 leading-tight">
                Technician Approvals
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Pending review</p>
            </div>
          </div>

          {/* Count Badge + link */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
              {count} request{count !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => router.push('/dashboard/admin/technicians')}
              className="flex items-center gap-0.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              View all
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Cards list */}
        <div className="space-y-3">
          {technicians.map((technician) => (
            <TechnicianApprovalCard
              key={technician.id}
              technician={technician}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}