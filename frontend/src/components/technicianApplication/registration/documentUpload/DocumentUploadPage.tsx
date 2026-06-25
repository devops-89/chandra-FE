'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';
import type { DocumentUploadState, UploadedFile } from '@/types/technicianApplication/documentUpload.types';

import DocumentUploadFooter from './DocumentUploadFooter';
import DocumentUploadGrid from './DocumentUploadGrid';
import SelfieVerificationCard from './SelfieVerificationCard';
import UploadHelpCard from './UploadHelpCard';

export default function DocumentUploadPage() {
  const router = useRouter();
  const [state, setState] = useState<DocumentUploadState>({
    selfieImage: null,
    uploadedDocuments: {},
  });

  const handleSelfieCapture = (file: UploadedFile) => {
    setState((prev) => ({
      ...prev,
      selfieImage: file,
    }));
  };

  const handleDocumentUpload = (file: UploadedFile) => {
    setState((prev) => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [file.documentId]: file,
      },
    }));
  };

  const isComplete =
    state.selfieImage !== null &&
    Object.keys(state.uploadedDocuments).length >= 5;

  const handlePrevious = () => {
    router.push('/technician/onboarding/skill-tagging');
  };

  const handleSubmit = () => {
    sessionStorage.setItem('documentUploadData', JSON.stringify(state));
    markStepComplete(2);
    router.push('/technician/onboarding/service-area');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          Document Verification
        </h1>
        <p className="text-gray-600">
          Please upload your identity and verification documents to proceed
        </p>
      </div>

      <SelfieVerificationCard
        image={state.selfieImage}
        onCapture={handleSelfieCapture}
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Upload Documents
        </h2>
        <DocumentUploadGrid
          uploadedDocuments={state.uploadedDocuments}
          onUpload={handleDocumentUpload}
        />
      </div>

      <UploadHelpCard />

      <DocumentUploadFooter
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isComplete={isComplete}
      />
    </div>
  );
}
