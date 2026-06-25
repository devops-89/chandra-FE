'use client';

import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
import DocumentUploadPage from '@/components/technicianApplication/registration/documentUpload/DocumentUploadPage';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';

export default function DocumentUploadRoute() {
  useOnboardingGuard({ stepIndex: 2 });
  return (
    <OnboardingLayout currentStep={2}>
      <DocumentUploadPage />
    </OnboardingLayout>
  );
}
