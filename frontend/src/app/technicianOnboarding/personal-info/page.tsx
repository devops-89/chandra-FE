import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import PersonalInfoForm from '@/components/technicianApplication/registration/personalInfo/PersonalInfoForm';

export default function PersonalInfoRoute() {
  return (
    <OnboardingLayout currentStep={0}>
      <div className="max-w-4xl">
        <div className="bg-red-500 text-white p-4 mb-4">
          INLINE HEADING
        </div>

        <PersonalInfoForm />
      </div>
    </OnboardingLayout>
  );
}