import OnboardingLayout from "@/components/technicianApplication/layout/OnboardingLayout";
import PersonalInfoForm from "@/components/technicianApplication/registration/personalInfo/PersonalInfoForm";

export default function TechnicianOnboardingPage() {
  return (
    <OnboardingLayout currentStep={0}>
      <PersonalInfoForm />
    </OnboardingLayout>
  );
}