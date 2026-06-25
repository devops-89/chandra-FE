'use client';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import { BankDetailsSection } from '@/components/technicianApplication/registration/bankDetails';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';

export default function BankDetailsRoute() {
  useOnboardingGuard({ stepIndex: 4 });
  return (
    <OnboardingLayout currentStep={4}>
      <BankDetailsSection />
    </OnboardingLayout>
  );
}
