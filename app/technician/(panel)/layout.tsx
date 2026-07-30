'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AuthControllers } from '@/api/authControllers';
import TechnicianDashboardLayout from '@/components/technicianDashboard/layout/TechnicianDashboardLayout';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { getTechnicianRedirectPath } from '@/lib/authApi/redirectUtils';
import { useAppDispatch } from '@/redux/hooks';
import { socketService } from '@/redux/services/socket.service';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checkingStatus, setCheckingStatus] = useState(true);

  useOnboardingGuard({ stepIndex: -1 });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const userStr = localStorage.getItem('user');

      if (!userStr) {
        router.replace('/login');
        return;
      }

      try {
        const res = await AuthControllers.getProfile();
        const technicianProfile = res.data?.technicianProfile;

        if (!technicianProfile) {
          router.replace('/technician/onboarding/register');
          return;
        }

        const redirectPath = getTechnicianRedirectPath({
          userStatus: res.data.status,
          technicianProfile,
        });



        if (redirectPath !== '/technician/dashboard') {
          router.replace(redirectPath);
          return;
        }

        if (!cancelled) {
          setCheckingStatus(false);
          const userId = res.data?.id;
          if (userId) {
            socketService.connect(dispatch, userId);
          }
        }
      } catch (e) {
        console.error('[DEBUG dashboard layout] Error in layout auth checks:', e);
        router.replace('/login');
      }
    };

    void run();

    return () => {
      cancelled = true;
      socketService.disconnect();
    };
  }, [router, dispatch]);

  if (checkingStatus) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <TechnicianDashboardLayout>
      {children}
    </TechnicianDashboardLayout>
  );
}
