'use client';

import { useCallback, useEffect, useState } from 'react';

import { getAreaKm } from '@/data/technicianOnboarding/serviceAreaData';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { clearOnboardingFiles } from '@/redux/slices/onboardingSlice';
import { registerTechnicianService } from '@/services/auth.service';
import type { ReviewSubmitState } from '@/types/technicianApplication/reviewSubmit.types';

const DOCUMENT_NAMES = [
  { id: 'selfie', name: 'Selfie Verification' },
  { id: 'aadhaar', name: 'Aadhaar Card' },
  { id: 'pan', name: 'PAN Card' },
  { id: 'police', name: 'Police Clearance' },
  { id: 'trade', name: 'Trade License' },
] as const;

const REUPLOAD_DOCUMENTS_MESSAGE = 'Please re-upload all documents before submitting.';

const toOptionalNumber = (value: unknown): number | undefined => {
  const numberValue = typeof value === 'string' ? Number(value) : value;
  return typeof numberValue === 'number' && Number.isFinite(numberValue)
    ? numberValue
    : undefined;
};

const buildServiceLocation = (value: Record<string, unknown>) => {
  const latitude = toOptionalNumber(value.latitude);
  const longitude = toOptionalNumber(value.longitude);

  if (latitude === undefined || longitude === undefined) {
    return undefined;
  }

  return {
    latitude,
    longitude,
    fullAddress: typeof value.fullAddress === 'string' ? value.fullAddress : '',
    city: typeof value.city === 'string' ? value.city : '',
    state: typeof value.state === 'string' ? value.state : '',
    pincode: typeof value.pincode === 'string' ? value.pincode : '',
  };
};

const hasDocumentUploadData = (value: Record<string, unknown>) => {
  // Only Aadhaar is mandatory
  return Boolean(value.aadharUrl);
};

const hasAllRequiredFiles = (
  aadharFile: File | null,
) => Boolean(aadharFile);

function buildInitialState(): ReviewSubmitState {
  return {
    profile: {
      name: '',
      title: '',
      experience: 0,
      location: '',
      selfieUrl: '',
    },
    bankDetails: {
      payoutMethod: 'bank-transfer',
    },
    services: [],
    yearsOfExperience: null,
    languages: [],
    brandExpertise: [],
    hasLadder: false,
    hasACGauges: false,
    hasSafetyEquipment: false,
    hasVehicle: false,
    verificationStatus: {
      documents: DOCUMENT_NAMES.map((d) => ({ id: d.id, name: d.name, status: 'pending' })),
      completedCount: 0,
      totalCount: 5,
    },
    serviceArea: {
      radius: 0,
      areas: [],
    },
  };
}

export const useReviewSubmit = () => {
  const dispatch = useAppDispatch();
  const { selfieFile, aadharFile, panFile, policeCertFile, tradeLicenseFile } = useAppSelector(
    (state) => state.onboarding,
  );

  const [state, setState] = useState<ReviewSubmitState>(buildInitialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Seed UI state from all sessionStorage keys on mount ──────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const documentRaw = sessionStorage.getItem('documentUploadData');
        const documentData = documentRaw ? JSON.parse(documentRaw) : {};
        const hasSavedDocumentData = hasDocumentUploadData(documentData);
        if (
          hasSavedDocumentData
          && !hasAllRequiredFiles(aadharFile)
        ) {
          setSubmitError(REUPLOAD_DOCUMENTS_MESSAGE);
        } else {
          setSubmitError(null);
        }
      } catch {
        // ignore malformed document metadata
      }

      setState((prev) => {
        let next = { ...prev };

        // ── Step 0: Personal info ─────────────────────────────────────────────
        try {
          const raw = sessionStorage.getItem('registerData');
          if (raw) {
            const p = JSON.parse(raw);
            next = {
              ...next,
              profile: {
                ...next.profile,
                name: `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim(),
                title: 'Technician',
                experience: 0,
                location: '',
                selfieUrl: '',
              },
            };
          }
        } catch { /* ignore */ }

        // ── Step 1: Skills & Equipments ───────────────────────────────────────
        try {
          const raw = sessionStorage.getItem('skillsEquipmentData');
          if (raw) {
            const s = JSON.parse(raw);
            next = {
              ...next,
              services: s.services ?? next.services,
              yearsOfExperience: s.yearsOfExperience ?? next.yearsOfExperience,
              languages: s.languages ?? next.languages,
              brandExpertise: s.brandExpertise ?? next.brandExpertise,
              hasLadder: s.hasLadder ?? next.hasLadder,
              hasACGauges: s.hasACGauges ?? next.hasACGauges,
              hasSafetyEquipment: s.hasSafetyEquipment ?? next.hasSafetyEquipment,
              hasVehicle: s.hasVehicle ?? next.hasVehicle,
              profile: {
                ...next.profile,
                experience: s.yearsOfExperience ?? 0,
              },
            };
          }
        } catch { /* ignore */ }

        // ── Step 2: Documents ─────────────────────────────────────────────────
        try {
          const raw = sessionStorage.getItem('documentUploadData');
          if (raw) {
            const d = JSON.parse(raw);
            const hasSelfie = !!d.selfieUrl;
            const hasAadhar = !!d.aadharUrl;
            const hasPan = !!d.panUrl;
            const hasPolice = !!d.policeCertUrl;
            const hasTrade = !!d.tradeLicenseUrl;

            const completedCount = [hasSelfie, hasAadhar, hasPan, hasPolice, hasTrade].filter(Boolean).length;

            next = {
              ...next,
              profile: {
                ...next.profile,
                selfieUrl: hasSelfie ? d.selfieUrl : '',
              },
              verificationStatus: {
                documents: [
                  { id: 'selfie', name: 'Selfie Verification', status: hasSelfie ? 'verified' : 'pending', previewUrl: hasSelfie ? d.selfieUrl : undefined },
                  { id: 'aadhaar', name: 'Aadhaar Card', status: hasAadhar ? 'verified' : 'pending', previewUrl: hasAadhar ? d.aadharUrl : undefined },
                  { id: 'pan', name: 'PAN Card', status: hasPan ? 'verified' : 'pending', previewUrl: hasPan ? d.panUrl : undefined },
                  { id: 'police', name: 'Police Clearance', status: hasPolice ? 'verified' : 'pending', previewUrl: hasPolice ? d.policeCertUrl : undefined },
                  { id: 'trade', name: 'Trade License', status: hasTrade ? 'verified' : 'pending', previewUrl: hasTrade ? d.tradeLicenseUrl : undefined },
                ],
                completedCount,
                totalCount: 5,
              },
            };
          }
        } catch { /* ignore */ }

        // ── Step 3: Service Area ──────────────────────────────────────────────
        try {
          const raw = sessionStorage.getItem('serviceAreaData');
          if (raw) {
            const a = JSON.parse(raw);
            const location = buildServiceLocation(a);
            next = {
              ...next,
              serviceArea: {
                radius: a.radius ?? 0,
                areas: a.preferredAreas ?? [],
                ...(location ?? {}),
              },
            };
          }
        } catch { /* ignore */ }

        // ── Step 4: Bank Details ──────────────────────────────────────────────
        try {
          const raw = sessionStorage.getItem('bankDetailsData');
          if (raw) {
            const b = JSON.parse(raw);
            const method = b.payoutMethod === 'upi' ? 'upi' : 'bank-transfer';
            next = {
              ...next,
              bankDetails:
                method === 'upi'
                  ? { payoutMethod: 'upi', upiId: b.upiId ?? '' }
                  : {
                      payoutMethod: 'bank-transfer',
                      accountHolderName: b.accountHolderName ?? '',
                      accountNumber: b.accountNumber ?? '',
                      ifscCode: b.ifscCode ?? '',
                    },
            };
          }
        } catch { /* ignore */ }

        return next;
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [selfieFile, aadharFile, panFile, policeCertFile, tradeLicenseFile]);

  // ── Final submit: build multipart and POST /users/register ────────────────
  const handleSubmit = useCallback(async (): Promise<{ success: boolean; error?: unknown }> => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // ── Read personal info ────────────────────────────────────────────────
      const registerRaw = sessionStorage.getItem('registerData');
      if (!registerRaw) {
        throw new Error('Personal information is missing. Please complete the Personal Info step again.');
      }
      const registerData = JSON.parse(registerRaw);

      // ── Read skills & equipments ──────────────────────────────────────────
      const skillsRaw = sessionStorage.getItem('skillsEquipmentData');
      const skillsData = skillsRaw ? JSON.parse(skillsRaw) : {};

      // ── Read service area ─────────────────────────────────────────────────
      const serviceAreaRaw = sessionStorage.getItem('serviceAreaData');
      const serviceAreaData = serviceAreaRaw ? JSON.parse(serviceAreaRaw) : {};
      const serviceLocation = buildServiceLocation(serviceAreaData);
      const serviceRadiusKm = typeof serviceAreaData.serviceRadiusKm === 'number'
        ? serviceAreaData.serviceRadiusKm
        : getAreaKm(Number(serviceAreaData.radius ?? 0));

      // ── Read document upload metadata ─────────────────────────────────────
      const documentRaw = sessionStorage.getItem('documentUploadData');
      const documentData = documentRaw ? JSON.parse(documentRaw) : {};
      if (!hasDocumentUploadData(documentData)) {
        throw new Error('Aadhaar Card is required. Please complete the Document Upload step.');
      }
      if (!hasAllRequiredFiles(aadharFile)) {
        throw new Error('Please re-upload your Aadhaar Card before submitting.');
      }

      // ── Read bank details and validate ────────────────────────────────────
      const bankRaw = sessionStorage.getItem('bankDetailsData');
      const bankData = bankRaw ? JSON.parse(bankRaw) : {};
      const payoutMethod = bankData.payoutMethod;
      if (payoutMethod === 'upi') {
        if (!bankData.upiId?.trim()) {
          throw new Error('UPI ID is required. Please complete the Bank Details step.');
        }
      } else {
        if (
          !bankData.accountHolderName?.trim()
          || !bankData.accountNumber?.trim()
          || !bankData.ifscCode?.trim()
        ) {
          throw new Error('Bank account details are required. Please complete the Bank Details step.');
        }
      }

      // ── Build technicianProfile JSON ──────────────────────────────────────
      const technicianProfile = {
        yearsOfExperience:  (skillsData.yearsOfExperience  as number)  ?? 0,
        languages:          (skillsData.languages           as string[]) ?? [],
        services:           (skillsData.services            as { serviceId: number }[]) ?? [],
        brandExpertise:     (skillsData.brandExpertise      as { brandName: string }[]) ?? [],
        hasLadder:          (skillsData.hasLadder           as boolean) ?? false,
        hasACGauges:        (skillsData.hasACGauges         as boolean) ?? false,
        hasSafetyEquipment: (skillsData.hasSafetyEquipment as boolean) ?? false,
        hasVehicle:         (skillsData.hasVehicle          as boolean) ?? false,
        serviceRadiusKm,
        // ── Payout method (mutually exclusive) ────────────────────────────
        ...(payoutMethod === 'upi'
          ? { upiId: bankData.upiId as string }
          : {
              accountHolderName: (bankData.accountHolderName as string) ?? '',
              accountNumber:     (bankData.accountNumber      as string) ?? '',
              ifscCode:          (bankData.ifscCode           as string) ?? '',
              bankName:          (bankData.bankName           as string) ?? '',
            }
        ),
        // ── Location (only when captured) ─────────────────────────────────
        ...(serviceLocation && {
          address:   serviceLocation.fullAddress,
          latitude:  serviceLocation.latitude,
          longitude: serviceLocation.longitude,
          city:      serviceLocation.city,
          state:     serviceLocation.state,
          pincode:   serviceLocation.pincode,
        }),
      };

      // ── Single multipart POST ─────────────────────────────────────────────
      const response = await registerTechnicianService(
        {
          email: registerData.email.trim(),
          username: registerData.username.trim(),
          phone: registerData.phoneNumber.trim(),
          firstName: registerData.firstName.trim(),
          lastName: registerData.lastName.trim(),
          password: registerData.password,
        },
        technicianProfile,
        {
          selfieUrl: selfieFile,
          aadharUrl: aadharFile,
          panUrl: panFile,
          policeCertUrl: policeCertFile,
          tradeLicenseUrl: tradeLicenseFile,
        },
      );

      const { user, tokens } = response.data;

      // ── Replace blob URLs with real S3 URLs from the registration response ──
      const profile = user.technicianProfile;
      if (profile) {
        const s3Urls = {
          selfieUrl:      profile.selfieUrl      ?? null,
          aadharUrl:      profile.aadharUrl      ?? null,
          panUrl:         profile.panUrl         ?? null,
          policeCertUrl:  profile.policeCertUrl  ?? null,
          tradeLicenseUrl: profile.tradeLicenseUrl ?? null,
        };
        sessionStorage.setItem('documentUploadData', JSON.stringify(s3Urls));
      }

      // ── Persist tokens + user — survives page refresh and tab close ─────
      localStorage.setItem('user',         JSON.stringify(user));
      localStorage.setItem('accessToken',  tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      dispatch(setCredentials({
        user: {
          id:        user.id,
          email:     user.email,
          username:  user.username,
          firstName: user.firstName,
          lastName:  user.lastName,
          role:      user.role,
        },
        accessToken:  tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }));

      // ── Clear Files from Redux (they're no longer needed) ─────────────────
      dispatch(clearOnboardingFiles());

      return { success: true };
    } catch (error: unknown) {
      const msg =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? (error instanceof Error ? error.message : 'Submission failed. Please try again.');
      setSubmitError(msg);
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  }, [selfieFile, aadharFile, panFile, policeCertFile, tradeLicenseFile, dispatch]);

  const updateProfileData = useCallback(
    (profileData: Partial<ReviewSubmitState['profile']>) => {
      setState((prev) => ({
        ...prev,
        profile: { ...prev.profile, ...profileData },
      }));
    },
    [],
  );

  return {
    state,
    isSubmitting,
    submitError,
    handleSubmit,
    updateProfileData,
  };
};
