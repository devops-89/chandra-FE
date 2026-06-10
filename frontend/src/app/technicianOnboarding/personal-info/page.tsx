import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import Heading from '@/components/technicianApplication/registration/personalInfo/Heading';
import PersonalInfoForm from '@/components/technicianApplication/registration/personalInfo/PersonalInfoForm';


export default function PersonalInfoRoute() {
  return (
    <OnboardingLayout currentStep={0}>
      <Heading />
      <PersonalInfoForm />
    </OnboardingLayout>
  );
}
