'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
  const { state, isSubmitting, handleSubmit } = useReviewSubmit();

  const handleEditProfile = () => {
    router.push('/technicianOnboarding/personal-info');
  };

  const handleEditSkills = () => {
    router.push('/technicianOnboarding/skill-tagging');
  };

  const handleEditVerification = () => {
    router.push('/technicianOnboarding/document-upload');
  };

  const handleEditServiceArea = () => {
    router.push('/technicianOnboarding/service-area');
  };

  const handleSubmitApplication = async () => {
    const result = await handleSubmit();
    if (result.success) {
      router.push('/technicianOnboarding/pending-verification');
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
            profile={state.profileData}
            onEdit={handleEditProfile}
          />
        </motion.div>

        {/* Skills Summary Card */}
        <motion.div className="md:col-span-5">
          <SkillsSummaryCard
            skills={state.skills}
            certificationLevel={state.certificationLevel}
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

      {/* Final Action Section */}
      <LaunchSection
        onSubmit={handleSubmitApplication}
        isLoading={isSubmitting}
      />
    </div>
  );
}
