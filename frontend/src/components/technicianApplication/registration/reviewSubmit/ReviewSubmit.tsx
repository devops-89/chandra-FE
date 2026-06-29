'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';

import { containerVariants } from './animations/reviewAnimations';
import LaunchSection from './components/LaunchSection';
import ProfileSummaryCard from './components/ProfileSummaryCard';
import ReviewSubmitHeader from './components/ReviewSubmitHeader';
import ServiceCoverageCard from './components/ServiceCoverageCard';
import SkillsSummaryCard from './components/SkillsSummaryCard';
import VerificationSummaryCard from './components/VerificationSummaryCard';
import { useReviewSubmit } from './hooks/useReviewSubmit';

export default function ReviewSubmit() {
  const router = useRouter();
  const { state, isSubmitting, submitError, handleSubmit } = useReviewSubmit();

  const handleEditProfile = () => {
    router.push('/technician/onboarding/register');
  };

  const handleEditSkills = () => {
    router.push('/technician/onboarding/skills-equipment');
  };

  const handleEditVerification = () => {
    router.push('/technician/onboarding/document-upload');
  };

  const handleEditServiceArea = () => {
    router.push('/technician/onboarding/service-area');
  };

  const SESSION_KEYS = [
    'registerData',
    'skillsEquipmentData',
    'documentUploadData',
    'serviceAreaData',
    'bankDetailsData',
  ];

  const handleSubmitApplication = async () => {
    const result = await handleSubmit();
    if (result.success) {
      // Clear all onboarding session data now that registration is complete
      SESSION_KEYS.forEach((k) => sessionStorage.removeItem(k));
      markStepComplete(5);
      router.push('/technician/onboarding/pending-verification');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ReviewSubmitHeader />

      {/* Bento Grid Layout for Summary */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Summary Card */}
        <motion.div className="md:col-span-7">
          <ProfileSummaryCard
            profile={state.profile}
            onEdit={handleEditProfile}
          />
        </motion.div>

        {/* Skills & Equipments Summary Card */}
        <motion.div className="md:col-span-5">
          <SkillsSummaryCard
            services={state.services}
            yearsOfExperience={state.yearsOfExperience}
            languages={state.languages}
            brandExpertise={state.brandExpertise}
            hasLadder={state.hasLadder}
            hasACGauges={state.hasACGauges}
            hasSafetyEquipment={state.hasSafetyEquipment}
            hasVehicle={state.hasVehicle}
            onEdit={handleEditSkills}
          />
        </motion.div>

        {/* Verification Summary Card */}
        <motion.div className="md:col-span-5">
          <VerificationSummaryCard
            verificationItems={state.verificationStatus.documents}
            completedCount={state.verificationStatus.completedCount}
            totalCount={state.verificationStatus.totalCount}
            onEdit={handleEditVerification}
          />
        </motion.div>

        {/* Service Coverage Card */}
        <motion.div className="md:col-span-7">
          <ServiceCoverageCard
            radius={state.serviceArea.radius}
            areas={state.serviceArea.areas}
            mapImageUrl={state.serviceArea.mapImageUrl}
            onEdit={handleEditServiceArea}
          />
        </motion.div>
      </motion.div>

      {/* Submission error banner */}
      {submitError && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-start gap-3">
          <span className="material-symbols-outlined text-red-500 shrink-0">error</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* Final Action Section */}
      <LaunchSection
        onSubmit={handleSubmitApplication}
        isLoading={isSubmitting}
      />
    </div>
  );
}
