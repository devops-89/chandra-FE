import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import PersonalInfoForm from '@/components/technicianApplication/personalInfo/PersonalInfoForm';

export default function PersonalInfoRoute() {
  return (
    <OnboardingLayout currentStep={0}>
      <PersonalInfoForm />
    </OnboardingLayout>
  );
}
