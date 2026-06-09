import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import SkillTaggingPage from '@/components/technicianApplication/registration/skillTagging/SkillTaggingPage';

export default function SkillTaggingRoute() {
  return (
    <OnboardingLayout currentStep={1}>
      <SkillTaggingPage />
    </OnboardingLayout>
  );
}
