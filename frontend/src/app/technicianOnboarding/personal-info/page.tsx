import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import PersonalInfoForm from '@/components/technicianApplication/registration/personalInfo/PersonalInfoForm';
import Heading from '@/components/technicianApplication/registration/personalInfo/Heading';
 ''

export default function PersonalInfoRoute() {
  return (
    <OnboardingLayout currentStep={0}>
      <Heading />
      <PersonalInfoForm />
    </OnboardingLayout>
  );
}
