'use client';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ReviewSubmit from '@/components/technicianApplication/registration/reviewSubmit/ReviewSubmit';

export default function ReviewSubmitPage() {
  return (
    <OnboardingLayout currentStep={5}>
      <ReviewSubmit />
    </OnboardingLayout>
  );
}
