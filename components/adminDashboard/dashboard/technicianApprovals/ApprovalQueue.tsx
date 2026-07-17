'use client';
import { ServiceControllers } from '@/api/serviceControllers';


import { motion } from 'framer-motion';
import { ChevronRight, ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { userSecuredApi } from '@/api/config';

import type { TechnicianApproval } from '@/types/admin.types';

import TechnicianApprovalCard from './TechnicianApprovalCard';

const MAX_RECENT = 3;

export default function ApprovalQueue() {
  const router = useRouter();

  const [technicians, setTechnicians] = useState<TechnicianApproval[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchPending = async () => {
      setIsLoading(true);
      try {
        // Fetch service map for skill labels
        const serviceMap: Record<number, string> = {};
        try {
          const services = await ServiceControllers.getAllServices();
          services.forEach((s) => { serviceMap[s.id] = s.name; });
        } catch { /* silently skip */ }

        const res = await userSecuredApi.get(
          '/users/all?role=TECHNICIAN&technicianProfileStatus=PENDING_APPROVAL',
        );
        const users: any[] = res.data?.data?.data || res.data?.data || [];

        if (cancelled) return;

        const mapped: TechnicianApproval[] = users.map((u: any) => {
          const profile = u.technicianProfile;
          const city =
            profile?.locations?.find((l: any) => l.isActive || l.isDefault)?.city ||
            profile?.locations?.[0]?.city ||
            '';
          const country =
            profile?.locations?.find((l: any) => l.isActive || l.isDefault)?.country ||
            profile?.locations?.[0]?.country ||
            'India';

          return {
            id: u.id,
            name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || 'Unknown',
            image: u.profileImage || undefined,
            experience: profile?.yearsOfExperience ?? 0,
            verified: profile?.status === 'APPROVED',
            email: u.email,
            phone: u.phone || '',
            address: [city, country].filter(Boolean).join(', ') || 'N/A',
            skills: profile?.services?.map((s: any) => serviceMap[s.serviceId]).filter(Boolean) || [],
            createdAt: u.createdAt,
          };
        });

        // Sort by createdAt descending â†’ most recent first
        mapped.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setTotalCount(mapped.length);
        setTechnicians(mapped.slice(0, MAX_RECENT));
      } catch (err) {
        console.error('ApprovalQueue fetch failed', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchPending();
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' as any }}
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
            {!isLoading && (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                {totalCount} request{totalCount !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={() => router.push('/admin/technicians')}
              className="flex items-center gap-0.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              View all
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-10 gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500" />
            <span className="text-sm text-slate-400">Loading requestsâ€¦</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && technicians.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <ClipboardList size={22} className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-600">No pending approvals</p>
            <p className="mt-1 text-xs text-slate-400">All technician requests have been reviewed.</p>
          </div>
        )}

        {/* Cards list â€” only recent MAX_RECENT */}
        {!isLoading && technicians.length > 0 && (
          <div className="space-y-3">
            {technicians.map((technician) => (
              <TechnicianApprovalCard
                key={technician.id}
                technician={technician}
              />
            ))}

            {totalCount > MAX_RECENT && (
              <button
                onClick={() => router.push('/admin/technicians')}
                className="w-full rounded-xl border border-dashed border-slate-200 py-2.5 text-xs font-medium text-slate-400 hover:border-emerald-300 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                +{totalCount - MAX_RECENT} more request{totalCount - MAX_RECENT !== 1 ? 's' : ''} â€” View all
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
