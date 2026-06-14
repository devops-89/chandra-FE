import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import { BankDetailsSection } from '@/components/technicianApplication/registration/bankDetails';


export default function BankDetailsRoute() {
  return (
    <OnboardingLayout currentStep={4}>
      <BankDetailsSection />
    </OnboardingLayout>
  );
}
