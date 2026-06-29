'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import {
  firstIncompleteRoute,
  isOnboardingComplete,
  isOnboardingLockEnabled,
  isStepComplete,
  syncProgressFromProfile,
} from '@/lib/onboarding/onboardingProgress';
import { getProfileService } from '@/services/auth.service';

/**
 * Onboarding route guard hook.
 *
 * stepIndex: N   — onboarding step page (0 = register, 1–5 = locked steps)
 * stepIndex: -1  — dashboard guard (all steps must be complete)
 *
 * When NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK === 'false' (dev): no redirects.
 *
 * Progress restoration:
 *   On every mount, if the user has a valid accessToken, we fetch GET /auth/profile
 *   and call syncProgressFromProfile() to rebuild the bitmask from backend data.
 *   This handles:
 *     1. First visit after login (bitmask never seeded)
 *     2. localStorage manually cleared (bitmask wiped)
 *     3. Bitmask is 0 but technician has completed earlier steps
 *   After syncing, the guard re-evaluates the redirect with fresh data.
 */

const STORAGE_KEY = 'technician_onboarding_progress';

function needsSync(): boolean {
  if (typeof window === 'undefined') return false;
  if (!localStorage.getItem('accessToken')) return false;   // not logged in
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return true;                             // key wiped
  if (parseInt(raw, 10) === 0) return true;                 // mask is 0 — may be stale
  return false;
}

export function useOnboardingGuard({ stepIndex }: { stepIndex: number }): void {
  const router = useRouter();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (!isOnboardingLockEnabled()) return; // dev mode — no lock

    const run = async () => {
      // ── Sync bitmask from backend when it may be stale or missing ─────────
      if (needsSync()) {
        try {
          const res = await getProfileService();
          const p   = res.data.technicianProfile;
          if (p) {
            syncProgressFromProfile({
              id:                p.id,
              services:          p.services,
              yearsOfExperience: p.yearsOfExperience,
              languages:         p.languages,
              aadharUrl:         p.aadharUrl,
              panUrl:            p.panUrl,
              policeCertUrl:     p.policeCertUrl,
              tradeLicenseUrl:   p.tradeLicenseUrl,
              selfieUrl:         p.selfieUrl,
              serviceAreas:      p.serviceAreas,
              accountHolderName: p.accountHolderName,
              accountNumber:     p.accountNumber,
              ifscCode:          p.ifscCode,
              status:            p.status,
            });
          }
        } catch {
          // Profile fetch failed — bitmask stays as-is, guard uses existing value
        }
      }

      // ── Guard decision (bitmask is now fresh) ─────────────────────────────
      if (stepIndex === -1) {
        // Dashboard: every step must be complete
        if (!isOnboardingComplete()) {
          router.replace(firstIncompleteRoute());
        }
        return;
      }

      if (stepIndex === 0) return; // Register is always accessible

      // Steps 1–5: previous step must be complete
      if (!isStepComplete(stepIndex - 1)) {
        router.replace(firstIncompleteRoute());
      }
    };

    run();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
