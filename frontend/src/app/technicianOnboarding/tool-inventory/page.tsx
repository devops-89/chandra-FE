import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ToolInventoryPage from '@/components/technicianApplication/registration/toolInventory/ToolInventoryPage';

export default function ToolInventoryRoute() {
  return (
    <OnboardingLayout currentStep={3}>
      <ToolInventoryPage />
    </OnboardingLayout>
  );
}
