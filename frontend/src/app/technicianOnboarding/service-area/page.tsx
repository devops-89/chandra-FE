'use client';

import { useRouter } from 'next/navigation';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ServiceArea from '@/components/technicianApplication/serviceArea/ServiceArea';

export default function ServiceAreaPage() {
  const router = useRouter();

  const handlePrevious = () => {
    router.push('/technicianOnboarding/tool-inventory');
  };

  const handleSubmit = (data: any) => {
    // Save and navigate to success page
    router.push('/technicianOnboarding/success');
  };

  return (
    <OnboardingLayout currentStep={4}>
      <ServiceArea onPrevious={handlePrevious} onSubmit={handleSubmit} />
    </OnboardingLayout>
  );
}
