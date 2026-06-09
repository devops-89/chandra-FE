import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import DocumentUploadPage from '@/components/technicianApplication/documentUpload/DocumentUploadPage';

export default function DocumentUploadRoute() {
  return (
    <OnboardingLayout currentStep={2}>
      <DocumentUploadPage />
    </OnboardingLayout>
  );
}
