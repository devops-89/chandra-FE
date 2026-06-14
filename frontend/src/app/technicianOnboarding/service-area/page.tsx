'use client';

import { useRouter } from 'next/navigation';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ServiceArea from '@/components/technicianApplication/registration/serviceArea/ServiceArea';

export default function ServiceAreaPage() {
  const router = useRouter();

  const handlePrevious = () => {
    router.push('/technicianOnboarding/service-area');
  };

  const handleSubmit = (data: any) => {
    // Save and navigate to success page
    router.push('/technicianOnboarding/success');
  };

  return (
    <OnboardingLayout currentStep={3}>
      <ServiceArea onPrevious={handlePrevious} onSubmit={handleSubmit} />
    </OnboardingLayout>
  );
}
