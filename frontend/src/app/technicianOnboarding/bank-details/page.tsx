import { BankDetailsSection } from '@/components/technicianApplication/bankDetails';
import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';

export default function DocumentUploadRoute() {
  return (
    <OnboardingLayout currentStep={2}>
        <BankDetailsSection />
    </OnboardingLayout>
  );
}
