'use client';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ReviewSubmit from '@/components/technicianApplication/registration/reviewSubmit/ReviewSubmit';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';

export default function ReviewSubmitPage() {
  useOnboardingGuard({ stepIndex: 5 });
  return (
    <OnboardingLayout currentStep={5}>
      <ReviewSubmit />
    </OnboardingLayout>
  );
}
