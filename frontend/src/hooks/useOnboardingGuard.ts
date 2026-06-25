'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  firstIncompleteRoute,
  isOnboardingComplete,
  isOnboardingLockEnabled,
  isStepComplete,
} from '@/lib/onboarding/onboardingProgress';

/**
 * Onboarding route guard hook.
 *
 * Usage — place at the top of each onboarding page component:
 *   useOnboardingGuard({ stepIndex: 1 });
 *
 * Behaviour when NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK === 'true':
 *   - If the previous step is not complete → redirect to first incomplete step.
 *   - Step 0 (Register) is never locked (it's the entry point).
 *
 * Behaviour when flag is false (development):
 *   - No redirect, all steps freely accessible.
 *
 * Dashboard variant:
 *   useOnboardingGuard({ stepIndex: -1 })
 *   Redirects to first incomplete step if onboarding is not fully done.
 */
export function useOnboardingGuard({ stepIndex }: { stepIndex: number }): void {
  const router = useRouter();

  useEffect(() => {
    if (!isOnboardingLockEnabled()) return; // dev mode — no lock

    if (stepIndex === -1) {
      // Dashboard guard — must be fully complete
      if (!isOnboardingComplete()) {
        router.replace(firstIncompleteRoute());
      }
      return;
    }

    if (stepIndex === 0) return; // Register is always accessible

    // For steps 1–5: the previous step must be complete
    const previousStepDone = isStepComplete(stepIndex - 1);
    if (!previousStepDone) {
      router.replace(firstIncompleteRoute());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
