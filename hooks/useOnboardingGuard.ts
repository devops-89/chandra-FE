'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { AuthControllers } from '@/api/authControllers';
import { getTechnicianRedirectPath } from '@/lib/authApi/redirectUtils';
import {
  firstIncompleteRoute,
  isOnboardingComplete,
  isOnboardingLockEnabled,
  isStepComplete,
  syncProgressFromProfile,
} from '@/lib/onboarding/onboardingProgress';

/**
 * Onboarding route guard hook.
 *
 * stepIndex: N   — onboarding step page (0 = register, 1–5 = locked steps)
 * stepIndex: -1  — dashboard guard (all steps must be complete)
 *
 * When NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK === 'false' (dev): no redirects.
 *
 * Progress restoration:
 *   On every mount, if a logged-in user record is present, we fetch GET /auth/profile
 *   and call syncProgressFromProfile() to rebuild the bitmask from backend data.
 *   This handles:
 *     1. First visit after login (bitmask never seeded)
 *     2. localStorage manually cleared (bitmask wiped)
 *     3. Bitmask is 0 but technician has completed earlier steps
 *   After syncing, the guard re-evaluates the redirect with fresh data.
 */

const STORAGE_KEY = 'technician_onboarding_progress';

function hasAuthContext(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('user');
}

function needsSync(): boolean {
  if (typeof window === 'undefined') return false;
  if (!localStorage.getItem('user')) return false;   // not logged in
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

    const run = async () => {
      if ((stepIndex === 0 || stepIndex === -1) && hasAuthContext()) {
        try {
          const res = await AuthControllers.getProfile();
          const technicianProfile = res.data?.technicianProfile;

          if (technicianProfile) {
            const redirectPath = getTechnicianRedirectPath({
              userStatus: res.data.status,
              technicianProfile,
            });
            
            const currentPath = window.location.pathname;
            if (redirectPath === '/technician/dashboard' && currentPath.startsWith('/technician') && !currentPath.startsWith('/technician/onboarding')) {
              // User is on a valid authenticated technician page (like profile, earnings), do not redirect
              return;
            } else if (currentPath !== redirectPath) {
              router.replace(redirectPath);
              return;
            } else {
              return; // We are exactly on the redirect path
            }
          }
        } catch {
          // Profile fetch failed — fall through to the existing guard logic.
        }
      }

      if (!isOnboardingLockEnabled()) return; // dev mode — no lock

      // ── Sync bitmask from backend when it may be stale or missing ─────────
      if (needsSync()) {
        try {
          const res = await AuthControllers.getProfile();
          const p   = res.data?.technicianProfile;
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
