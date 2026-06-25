'use client';

import TechnicianDashboardLayout from '@/components/technicianDashboard/layout/TechnicianDashboardLayout';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';

export default function Layout({ children }: { children: React.ReactNode }) {
  // stepIndex: -1 = dashboard mode — redirects to first incomplete step
  // when NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK is true and onboarding is incomplete.
  useOnboardingGuard({ stepIndex: -1 });

  return (
    <TechnicianDashboardLayout>
      {children}
    </TechnicianDashboardLayout>
  );
}
