'use client';

import { useRouter } from 'next/navigation';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ServiceArea from '@/components/technicianApplication/registration/serviceArea/ServiceArea';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
import { markStepComplete } from '@/lib/onboarding/onboardingProgress';
import type { ServiceAreaState } from '@/types/technicianOnboarding/serviceArea.types';

export default function ServiceAreaPage() {
  const router = useRouter();
  useOnboardingGuard({ stepIndex: 3 });

  const handlePrevious = () => {
    router.push('/technician/onboarding/document-upload');
  };

  const handleSubmit = (_data: ServiceAreaState) => {
    markStepComplete(3);
    router.push('/technician/onboarding/bank-details');
  };

  return (
    <OnboardingLayout currentStep={3}>
      <ServiceArea onPrevious={handlePrevious} onSubmit={handleSubmit} />
    </OnboardingLayout>
  );
}
