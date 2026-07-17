import OnboardingHeader from '@/components/technicianApplication/layout/OnboardingHeader';
import PendingVerificationFooter from '@/components/technicianOnboarding/pendingVerification/PendingVerificationFooter';
import VerificationStatusContainer from '@/components/technicianOnboarding/verificationStatus/VerificationStatusContainer';

export default function PendingVerificationPage() {
  const applicationStatus = 'pending' as const;

  return (
    <>
      <OnboardingHeader />

      <main className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
        <VerificationStatusContainer status={applicationStatus} />
      </main>

      <PendingVerificationFooter />
    </>
  );
}
