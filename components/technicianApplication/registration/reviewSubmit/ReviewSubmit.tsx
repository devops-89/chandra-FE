'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ServiceControllers } from '@/api/serviceControllers';
import { markStepComplete } from '@/lib/onboarding/onboardingProgress';
import type { AdminService } from '@/types/admin/service.types';

import { containerVariants } from './animations/reviewAnimations';
import LaunchSection from './components/LaunchSection';
import BankDetailsSummaryCard from './components/ProfileSummaryCard';
import ReviewSubmitHeader from './components/ReviewSubmitHeader';
import ServiceCoverageCard from './components/ServiceCoverageCard';
import SkillsSummaryCard from './components/SkillsSummaryCard';
import VerificationSummaryCard from './components/VerificationSummaryCard';
import { useReviewSubmit } from './hooks/useReviewSubmit';

const SESSION_KEYS = [
  'registerData',
  'skillsEquipmentData',
  'documentUploadData',
  'serviceAreaData',
  'bankDetailsData',
] as const;

function revokeDocumentPreviewUrls() {
  const raw = sessionStorage.getItem('documentUploadData');
  if (!raw) return;

  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    Object.values(data).forEach((value) => {
      if (typeof value === 'string' && value.startsWith('blob:')) {
        URL.revokeObjectURL(value);
      }
    });
  } catch {
    // ignore malformed preview metadata
  }
}

function clearOnboardingSessionStorage() {
  revokeDocumentPreviewUrls();
  SESSION_KEYS.forEach((key) => sessionStorage.removeItem(key));
  sessionStorage.removeItem('registerOtpVerified');
}

export default function ReviewSubmit() {
  const router = useRouter();
  const { state, isSubmitting, submitError, handleSubmit } = useReviewSubmit();

  // ── Fetch services and build id->name map for display ──────────────────────
  const [serviceNameMap, setServiceNameMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    let active = true;
    ServiceControllers.getAllServices()
      .then((data: AdminService[]) => {
        if (active) {
          setServiceNameMap(new Map(data.map((s) => [s.id, s.name])));
        }
      })
      .catch(() => { /* silently fall back to Service #ID labels */ });
    return () => { active = false; };
  }, []);

  const handleEditBankDetails = () => {
    router.push('/technician/onboarding/bank-details');
  };

  const handleEditSkills = () => {
    router.push('/technician/onboarding/skills-equipment');
  };

  const handleEditVerification = () => {
    router.push('/technician/onboarding/document-upload');
  };

  const handleSubmitApplication = async () => {
    const result = await handleSubmit();
    if (result.success) {
      clearOnboardingSessionStorage();
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
        {/* Bank Details Summary Card */}
        <motion.div className="md:col-span-7">
          <BankDetailsSummaryCard
            bankDetails={state.bankDetails}
            onEdit={handleEditBankDetails}
          />
        </motion.div>

        {/* Skills & Equipments Summary Card */}
        <motion.div className="md:col-span-5">
          <SkillsSummaryCard
            services={state.services}
            serviceNameMap={serviceNameMap}
            yearsOfExperience={state.yearsOfExperience}
            languages={state.languages}
            brandExpertise={state.brandExpertise}
            hasLadder={state.hasLadder}
            hasACGauges={state.hasACGauges}
            hasSafetyEquipment={state.hasSafetyEquipment}
            hasVehicle={state.hasVehicle}
            gst={state.gst}
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
            latitude={state.serviceArea.latitude}
            longitude={state.serviceArea.longitude}
            fullAddress={state.serviceArea.fullAddress}
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
