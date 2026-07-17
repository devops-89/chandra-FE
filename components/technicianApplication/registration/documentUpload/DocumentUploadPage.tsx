'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';
import { useAppDispatch } from '@/redux/hooks';
import {
  setAadharFile,
  setPanFile,
  setPoliceCertFile,
  setSelfieFile,
  setTradeLicenseFile,
} from '@/redux/slices/onboardingSlice';
import type {
  DocumentUploadState,
  UploadedFile,
} from '@/types/technicianApplication/documentUpload.types';

import DocumentUploadFooter from './DocumentUploadFooter';
import DocumentUploadGrid from './DocumentUploadGrid';
import SelfieVerificationCard from './SelfieVerificationCard';
import UploadHelpCard from './UploadHelpCard';

export default function DocumentUploadPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [state, setState] = useState<DocumentUploadState>({
    selfieImage: null,
    uploadedDocuments: {},
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('documentUploadData');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setState({
        selfieImage: parsed.selfieUrl
          ? {
              documentId: 'selfie',
              fileName: 'Selfie',
              fileUrl: parsed.selfieUrl,
              uploadedAt: '',
            }
          : null,

        uploadedDocuments: {
          'aadhaar-card': parsed.aadharUrl
            ? {
                documentId: 'aadhaar-card',
                fileName: 'Aadhaar Card',
                fileUrl: parsed.aadharUrl,
                uploadedAt: '',
              }
            : undefined,

          'pan-card': parsed.panUrl
            ? {
                documentId: 'pan-card',
                fileName: 'PAN Card',
                fileUrl: parsed.panUrl,
                uploadedAt: '',
              }
            : undefined,

          'police-verification': parsed.policeCertUrl
            ? {
                documentId: 'police-verification',
                fileName: 'Police Certificate',
                fileUrl: parsed.policeCertUrl,
                uploadedAt: '',
              }
            : undefined,

          'trade-license': parsed.tradeLicenseUrl
            ? {
                documentId: 'trade-license',
                fileName: 'Trade License',
                fileUrl: parsed.tradeLicenseUrl,
                uploadedAt: '',
              }
            : undefined,
        } as Record<string, UploadedFile>,
      });
    } catch {
      // Ignore malformed session data
    }
  }, []);

  const handleSelfieCapture = (file: UploadedFile, rawFile: File) => {
    dispatch(setSelfieFile(rawFile));

    setState((prev) => ({
      ...prev,
      selfieImage: file,
    }));
  };

  const handleDocumentUpload = (file: UploadedFile, rawFile: File) => {
    switch (file.documentId) {
      case 'aadhaar-card':
        dispatch(setAadharFile(rawFile));
        break;

      case 'pan-card':
        dispatch(setPanFile(rawFile));
        break;

      case 'police-verification':
        dispatch(setPoliceCertFile(rawFile));
        break;

      case 'trade-license':
        dispatch(setTradeLicenseFile(rawFile));
        break;
    }

    setState((prev) => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [file.documentId]: file,
      },
    }));
  };

  // Aadhaar only is mandatory
  const isComplete =
    state.uploadedDocuments['aadhaar-card'] != null;

  const handlePrevious = () => {
    router.push('/technician/onboarding/skills-equipment');
  };

  const handleSubmit = () => {
    if (!isComplete) return;

    sessionStorage.setItem(
      'documentUploadData',
      JSON.stringify({
        selfieUrl: state.selfieImage?.fileUrl ?? null,
        aadharUrl:
          state.uploadedDocuments['aadhaar-card']?.fileUrl ?? null,
        panUrl:
          state.uploadedDocuments['pan-card']?.fileUrl ?? null,
        policeCertUrl:
          state.uploadedDocuments['police-verification']?.fileUrl ??
          null,
        tradeLicenseUrl:
          state.uploadedDocuments['trade-license']?.fileUrl ??
          null,
      }),
    );

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
          Please upload your identity and verification documents to
          proceed.
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