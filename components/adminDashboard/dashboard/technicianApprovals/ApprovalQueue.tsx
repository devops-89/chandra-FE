<<<<<<< HEAD
﻿'use client';
import { ServiceControllers } from '@/api/serviceControllers';


import { motion } from 'framer-motion';
import { ChevronRight, ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { userSecuredApi } from '@/api/config';

=======
'use client';
import { motion } from 'framer-motion';
import { ChevronRight, ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { userSecuredApi } from '@/api/config';
import { ServiceControllers } from '@/api/serviceControllers';
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
import type { TechnicianApproval } from '@/types/admin.types';

import TechnicianApprovalCard from './TechnicianApprovalCard';

<<<<<<< HEAD
const MAX_RECENT = 3;
=======
const MAX_RECENT = 2;

interface TechnicianProfileLocation {
  city?: string | null;
  country?: string | null;
  isActive?: boolean;
  isDefault?: boolean;
}

interface TechnicianProfileService {
  serviceId: number;
}

interface PendingTechnicianProfile {
  locations?: TechnicianProfileLocation[];
  services?: TechnicianProfileService[];
  status?: string | null;
  yearsOfExperience?: number | null;
}

interface PendingTechnicianUser {
  id: number;
  createdAt?: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  profileImage?: string | null;
  technicianProfile?: PendingTechnicianProfile | null;
  username?: string | null;
}

interface PendingTechniciansEnvelope {
  data?: PendingTechnicianUser[] | { data?: PendingTechnicianUser[] };
}

type PendingTechniciansResponse = PendingTechnicianUser[] | PendingTechniciansEnvelope;

const extractPendingTechnicians = (
  payload: PendingTechniciansResponse,
): PendingTechnicianUser[] => {
  if (Array.isArray(payload)) return payload;

  const data = payload.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;

  return [];
};
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76

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

<<<<<<< HEAD
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
=======
        const res = await userSecuredApi.get<PendingTechniciansResponse>(
          '/users/all?role=TECHNICIAN&technicianProfileStatus=PENDING_APPROVAL',
        );
        const users = extractPendingTechnicians(res.data);

        if (cancelled) return;

        const mapped: TechnicianApproval[] = users.map((u) => {
          const profile = u.technicianProfile;
          const selectedLocation = profile?.locations?.find((location) => (
            location.isActive || location.isDefault
          ));
          const city = selectedLocation?.city || profile?.locations?.[0]?.city || '';
          const country = selectedLocation?.country || profile?.locations?.[0]?.country || 'India';
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76

          return {
            id: u.id,
            name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || 'Unknown',
            image: u.profileImage || undefined,
            experience: profile?.yearsOfExperience ?? 0,
            verified: profile?.status === 'APPROVED',
<<<<<<< HEAD
            email: u.email,
            phone: u.phone || '',
            address: [city, country].filter(Boolean).join(', ') || 'N/A',
            skills: profile?.services?.map((s: any) => serviceMap[s.serviceId]).filter(Boolean) || [],
=======
            email: u.email ?? '',
            phone: u.phone || '',
            address: [city, country].filter(Boolean).join(', ') || 'N/A',
            skills: profile?.services
              ?.map((service) => serviceMap[service.serviceId])
              .filter((skill): skill is string => Boolean(skill)) || [],
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
            createdAt: u.createdAt,
          };
        });

<<<<<<< HEAD
        // Sort by createdAt descending â†’ most recent first
=======
        // Sort by createdAt descending → most recent first
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
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
<<<<<<< HEAD
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
=======
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full rounded-2xl border border-slate-200 bg-white cursor-default hover:shadow-lg"
    >
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <ClipboardList size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-tight text-slate-900 sm:text-base">
                Technician Approvals
              </h2>
              <p className="mt-1 text-sm text-slate-500 sm:text-xs">Pending review</p>
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
            </div>
          </div>

          {/* Count Badge + link */}
<<<<<<< HEAD
          <div className="flex items-center gap-2">
            {!isLoading && (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
=======
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {!isLoading && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-white sm:px-3 sm:py-1">
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
                {totalCount} request{totalCount !== 1 ? 's' : ''}
              </span>
            )}
            <button
<<<<<<< HEAD
              onClick={() => router.push('/admin/technicians')}
              className="flex items-center gap-0.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              View all
              <ChevronRight size={14} />
=======
              onClick={() => router.push('/dashboard/admin/technicians')}
              className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer sm:h-auto sm:px-0 sm:text-xs"
            >
              View all
              <ChevronRight size={16} />
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-10 gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500" />
<<<<<<< HEAD
            <span className="text-sm text-slate-400">Loading requestsâ€¦</span>
=======
            <span className="text-sm text-slate-400">Loading requests…</span>
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
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

<<<<<<< HEAD
        {/* Cards list â€” only recent MAX_RECENT */}
        {!isLoading && technicians.length > 0 && (
          <div className="space-y-3">
=======
        {/* Cards list — only recent MAX_RECENT */}
        {!isLoading && technicians.length > 0 && (
          <div className="space-y-4 sm:space-y-3">
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
            {technicians.map((technician) => (
              <TechnicianApprovalCard
                key={technician.id}
                technician={technician}
              />
            ))}

            {totalCount > MAX_RECENT && (
              <button
<<<<<<< HEAD
                onClick={() => router.push('/admin/technicians')}
                className="w-full rounded-xl border border-dashed border-slate-200 py-2.5 text-xs font-medium text-slate-400 hover:border-emerald-300 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                +{totalCount - MAX_RECENT} more request{totalCount - MAX_RECENT !== 1 ? 's' : ''} â€” View all
=======
                onClick={() => router.push('/dashboard/admin/technicians')}
                className="w-full rounded-xl border border-dashed border-slate-200 py-2.5 text-xs font-medium text-slate-400 hover:border-emerald-300 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                +{totalCount - MAX_RECENT} more request{totalCount - MAX_RECENT !== 1 ? 's' : ''} — View all
>>>>>>> 6ef5b5b16643698aaf05ebcb75447ba4abb80b76
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
