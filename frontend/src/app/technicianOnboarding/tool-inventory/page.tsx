import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import ToolInventoryPage from '@/components/technicianApplication/toolInventory/ToolInventoryPage';

export default function ToolInventoryRoute() {
  return (
    <OnboardingLayout currentStep={3}>
      <ToolInventoryPage />
    </OnboardingLayout>
  );
}
