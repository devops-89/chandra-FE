'use client';

import { useRouter } from 'next/navigation';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ServiceArea from '@/components/technicianApplication/registration/serviceArea/ServiceArea';
import type { ServiceAreaState } from '@/types/technicianOnboarding/serviceArea.types';

export default function ServiceAreaPage() {
  const router = useRouter();

  const handlePrevious = () => {
    router.push('/technicianOnboarding/service-area');
  };

  // data is intentionally unused — navigation only; stored via sessionStorage inside ServiceArea
  const handleSubmit = (_data: ServiceAreaState) => {
    router.push('/technicianOnboarding/success');
  };

  return (
    <OnboardingLayout currentStep={3}>
      <ServiceArea onPrevious={handlePrevious} onSubmit={handleSubmit} />
    </OnboardingLayout>
  );
}
