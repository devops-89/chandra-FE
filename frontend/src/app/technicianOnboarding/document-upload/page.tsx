import DocumentUploadPage from '@/components/technicianApplication/documentUpload/DocumentUploadPage';
import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';

export default function DocumentUploadRoute() {
  return (
    <OnboardingLayout currentStep={2}>
      <DocumentUploadPage />
    </OnboardingLayout>
  );
}
