import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import Heading from '@/components/technicianApplication/registration/personalInfo/Heading';
import PersonalInfoForm from '@/components/technicianApplication/registration/personalInfo/PersonalInfoForm';

export default function PersonalInfoRoute() {
  return (
    <OnboardingLayout currentStep={0}>
      <div className='max-w-4xl'>
        <Heading />
        <PersonalInfoForm />
      </div>
    </OnboardingLayout>
  );
}
