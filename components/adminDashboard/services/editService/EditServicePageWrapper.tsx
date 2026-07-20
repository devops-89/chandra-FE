'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminControllers } from '@/api/adminControllers';
import { AdminService } from '@/types/admin/service.types';
import EditServiceFormPageVersion from './EditServiceFormPageVersion';

export default function EditServicePageWrapper({ serviceId }: { serviceId: string }) {
  const [service, setService] = useState<AdminService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchService() {
      try {
        const data = await AdminControllers.getServiceByIdForAdmin(Number(serviceId));
        if (data) {
          setService(data);
        } else {
          setError('Service not found.');
        }
      } catch (err) {
        setError('Failed to fetch service details.');
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
        <span className="ml-3 text-sm text-slate-500">Loading service details...</span>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
        <p className="text-sm font-medium text-red-700">{error}</p>
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return <EditServiceFormPageVersion initialData={service} />;
}
