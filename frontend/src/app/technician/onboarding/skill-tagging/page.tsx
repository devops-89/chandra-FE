'use client';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import SkillTaggingPage from '@/components/technicianApplication/registration/skillTagging/SkillTaggingPage';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';

export default function SkillTaggingRoute() {
  useOnboardingGuard({ stepIndex: 1 });
  return (
    <OnboardingLayout currentStep={1}>
      <SkillTaggingPage />
    </OnboardingLayout>
  );
}
