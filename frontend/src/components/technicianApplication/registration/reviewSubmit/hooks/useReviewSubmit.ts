'use client';

import { useCallback, useEffect, useState } from 'react';

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

function buildInitialState(): ReviewSubmitState {
  return {
    profile: {
      name: '',
      title: '',
      experience: 0,
      location: '',
      selfieUrl: '',
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
      mapImageUrl: '',
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
            const hasSelfie = !!(d.selfieUrl && selfieFile);
            const hasAadhar = !!(d.aadharUrl && aadharFile);
            const hasPan = !!(d.panUrl && panFile);
            const hasPolice = !!(d.policeCertUrl && policeCertFile);
            const hasTrade = !!(d.tradeLicenseUrl && tradeLicenseFile);

            const completedCount = [hasSelfie, hasAadhar, hasPan, hasPolice, hasTrade].filter(Boolean).length;

            next = {
              ...next,
              profile: {
                ...next.profile,
                selfieUrl: hasSelfie ? d.selfieUrl : '',
              },
              verificationStatus: {
                documents: [
                  { id: 'selfie', name: 'Selfie Verification', status: hasSelfie ? 'verified' : 'pending' },
                  { id: 'aadhaar', name: 'Aadhaar Card', status: hasAadhar ? 'verified' : 'pending' },
                  { id: 'pan', name: 'PAN Card', status: hasPan ? 'verified' : 'pending' },
                  { id: 'police', name: 'Police Clearance', status: hasPolice ? 'verified' : 'pending' },
                  { id: 'trade', name: 'Trade License', status: hasTrade ? 'verified' : 'pending' },
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
            next = {
              ...next,
              serviceArea: {
                radius: a.radius ?? 0,
                areas: a.preferredAreas ?? [],
                mapImageUrl: '',
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
      if (!registerRaw) throw new Error('Files are missing. Please go back to re-upload your files.');
      const registerData = JSON.parse(registerRaw);

      // ── Read skills & equipments ──────────────────────────────────────────
      const skillsRaw = sessionStorage.getItem('skillsEquipmentData');
      const skillsData = skillsRaw ? JSON.parse(skillsRaw) : {};

      // ── Read service area ─────────────────────────────────────────────────
      const serviceAreaRaw = sessionStorage.getItem('serviceAreaData');
      const serviceAreaData = serviceAreaRaw ? JSON.parse(serviceAreaRaw) : {};

      // ── Read bank details ─────────────────────────────────────────────────
      const bankRaw = sessionStorage.getItem('bankDetailsData');
      const bankData = bankRaw ? JSON.parse(bankRaw) : {};

      // ── Guard: all File objects must still be in Redux ────────────────────
      if (!selfieFile || !aadharFile || !panFile || !policeCertFile || !tradeLicenseFile) {
        throw new Error(
          'Document files are missing. Please go back to the Document Upload step and re-upload your files.'
        );
      }

      // ── Build technicianProfile JSON ──────────────────────────────────────
      const technicianProfile = {
        yearsOfExperience: skillsData.yearsOfExperience ?? 0,
        languages: skillsData.languages ?? [],
        services: skillsData.services ?? [],
        brandExpertise: skillsData.brandExpertise ?? [],
        hasLadder: skillsData.hasLadder ?? false,
        hasACGauges: skillsData.hasACGauges ?? false,
        hasSafetyEquipment: skillsData.hasSafetyEquipment ?? false,
        hasVehicle: skillsData.hasVehicle ?? false,
        serviceRadiusKm: serviceAreaData.radius ?? 0,
        preferredAreas: serviceAreaData.preferredAreas ?? [],
        pincodes: serviceAreaData.pincodes ?? [],
        accountHolderName: bankData.accountHolderName ?? '',
        accountNumber: bankData.accountNumber ?? '',
        ifscCode: bankData.ifscCode ?? '',
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

      // ── Persist tokens & update Redux auth state ──────────────────────────
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(setCredentials({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        accessToken: tokens.accessToken,
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
