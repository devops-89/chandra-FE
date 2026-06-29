'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { markStepComplete } from '@/lib/onboarding/onboardingProgress';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setAadharFile,
  setPanFile,
  setPoliceCertFile,
  setSelfieFile,
  setTradeLicenseFile,
} from '@/redux/slices/onboardingSlice';
import type { DocumentUploadState, UploadedFile } from '@/types/technicianApplication/documentUpload.types';

import DocumentUploadFooter from './DocumentUploadFooter';
import DocumentUploadGrid from './DocumentUploadGrid';
import SelfieVerificationCard from './SelfieVerificationCard';
import UploadHelpCard from './UploadHelpCard';

export default function DocumentUploadPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selfieFile, aadharFile, panFile, policeCertFile, tradeLicenseFile } = useAppSelector(
    (state) => state.onboarding
  );

  const [state, setState] = useState<DocumentUploadState>({
    selfieImage: null,
    uploadedDocuments: {},
  });

  const isInitialized = useRef(false);

  // ── Restore from sessionStorage on mount conditionally ─────────────────────
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const saved = sessionStorage.getItem('documentUploadData');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      const timer = window.setTimeout(() => {
        setState({
          selfieImage: (parsed.selfieUrl && selfieFile)
            ? { documentId: 'selfie', fileName: selfieFile.name, fileUrl: parsed.selfieUrl, uploadedAt: '' }
            : null,
          uploadedDocuments: {
            'aadhaar-card': (parsed.aadharUrl && aadharFile)
              ? { documentId: 'aadhaar-card', fileName: aadharFile.name, fileUrl: parsed.aadharUrl, uploadedAt: '' }
              : undefined,
            'pan-card': (parsed.panUrl && panFile)
              ? { documentId: 'pan-card', fileName: panFile.name, fileUrl: parsed.panUrl, uploadedAt: '' }
              : undefined,
            'police-verification': (parsed.policeCertUrl && policeCertFile)
              ? { documentId: 'police-verification', fileName: policeCertFile.name, fileUrl: parsed.policeCertUrl, uploadedAt: '' }
              : undefined,
            'trade-license': (parsed.tradeLicenseUrl && tradeLicenseFile)
              ? { documentId: 'trade-license', fileName: tradeLicenseFile.name, fileUrl: parsed.tradeLicenseUrl, uploadedAt: '' }
              : undefined,
          } as Record<string, UploadedFile>,
        });
      }, 0);
      return () => window.clearTimeout(timer);
    } catch {
      // ignore malformed data
    }
  }, [selfieFile, aadharFile, panFile, policeCertFile, tradeLicenseFile]);

  const handleSelfieCapture = (file: UploadedFile, rawFile: File) => {
    dispatch(setSelfieFile(rawFile));
    setState((prev) => ({
      ...prev,
      selfieImage: file,
    }));
  };

  const handleDocumentUpload = (file: UploadedFile, rawFile: File) => {
    if (file.documentId === 'aadhaar-card') {
      dispatch(setAadharFile(rawFile));
    } else if (file.documentId === 'pan-card') {
      dispatch(setPanFile(rawFile));
    } else if (file.documentId === 'police-verification') {
      dispatch(setPoliceCertFile(rawFile));
    } else if (file.documentId === 'trade-license') {
      dispatch(setTradeLicenseFile(rawFile));
    }

    setState((prev) => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [file.documentId]: file,
      },
    }));
  };

  // ── Validation: All 5 files must be uploaded ──────────────────────────────
  const isComplete = useMemo(() => {
    const requiredDocIds = ['aadhaar-card', 'pan-card', 'police-verification', 'trade-license'];
    const documentsOk = requiredDocIds.every(
      (id) => state.uploadedDocuments[id] !== undefined && state.uploadedDocuments[id] !== null
    );
    return state.selfieImage !== null && documentsOk;
  }, [state.selfieImage, state.uploadedDocuments]);

  const handlePrevious = () => {
    router.push('/technician/onboarding/skills-equipment');
  };

  const handleSubmit = () => {
    if (!isComplete) return;

    // Save as exact flat object format required by backend
    const payload = {
      selfieUrl: state.selfieImage?.fileUrl || null,
      aadharUrl: state.uploadedDocuments['aadhaar-card']?.fileUrl || null,
      panUrl: state.uploadedDocuments['pan-card']?.fileUrl || null,
      policeCertUrl: state.uploadedDocuments['police-verification']?.fileUrl || null,
      tradeLicenseUrl: state.uploadedDocuments['trade-license']?.fileUrl || null,
    };

    sessionStorage.setItem('documentUploadData', JSON.stringify(payload));
    markStepComplete(2);
    router.push('/technician/onboarding/service-area');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Heading */}
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
