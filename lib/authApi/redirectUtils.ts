/**
 * Store the current path for redirect after login
 */
export function storeRedirectPath(path?: string): void {
  const redirectPath = path || window.location.pathname;
  sessionStorage.setItem('redirectAfterLogin', redirectPath);
}

/**
 * Get and clear the stored redirect path
 */
export function getAndClearRedirectPath(): string | null {
  const redirectPath = sessionStorage.getItem('redirectAfterLogin');
  if (redirectPath) {
    sessionStorage.removeItem('redirectAfterLogin');
    return redirectPath;
  }
  return null;
}

export function getDashboardPathForRole(role?: string | null): string {
  const normalizedRole = role?.toUpperCase();

  if (normalizedRole === 'ADMIN') {
    return '/admin/dashboard';
  }

  if (normalizedRole === 'TECHNICIAN') {
    return '/dashboard/technician';
  }

  return '/dashboard/customer';
}

function isSafeInternalRedirect(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//');
}

function isRedirectAllowedForRole(path: string, role?: string | null): boolean {
  if (!isSafeInternalRedirect(path)) {
    return false;
  }

  const normalizedRole = role?.toUpperCase();

  if (path.startsWith('/admin')) {
    return normalizedRole === 'ADMIN';
  }

  if (path.startsWith('/dashboard/technician')) {
    return normalizedRole === 'TECHNICIAN';
  }

  if (path.startsWith('/dashboard/customer') || path.startsWith('/booking')) {
    return normalizedRole !== 'ADMIN' && normalizedRole !== 'TECHNICIAN';
  }

  return true;
}

/**
 * Handle redirect after successful authentication
 * Returns the path to redirect to, defaults to dashboard if no stored path
 */
export function handlePostAuthRedirect(role?: string | null): string {
  const storedPath = getAndClearRedirectPath();
  const fallbackPath = getDashboardPathForRole(role);

  if (storedPath && isRedirectAllowedForRole(storedPath, role)) {
    return storedPath;
  }

  return fallbackPath;
}

// â”€â”€â”€ Technician-specific redirect â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Imported lazily to avoid circular deps â€” called only from LoginForm for TECHNICIAN role.

import {
  firstIncompleteRoute,
  isOnboardingComplete,
  syncProgressFromProfile,
} from '@/lib/onboarding/onboardingProgress';
import type { ApiTechnicianProfileData } from '@/types/auth.types';

function normalizeStatus(status?: string | null): string {
  return status?.trim().toUpperCase() ?? '';
}

/**
 * Determines where to redirect a TECHNICIAN after login based on live profile data.
 * Called with the response from GET /auth/profile.
 *
 * Priority:
 *   1. No technicianProfile â†’ /technician/onboarding/register
 *   2. profile.status === 'PENDING_APPROVAL' â†’ pending-verification
 *   3. profile.isVerified === true OR user.status === 'ACTIVE' AND onboarding complete
 *      â†’ /dashboard/technician
 *   4. profile.status === 'INCOMPLETE' â†’ sync bitmask from profile â†’ firstIncompleteRoute()
 *   5. Fallback â†’ /dashboard/technician
 */
export function getTechnicianRedirectPath(params: {
  userStatus: string;
  technicianProfile: ApiTechnicianProfileData | null;
}): string {
  const { userStatus, technicianProfile } = params;
  const normalizedUserStatus = normalizeStatus(userStatus);
  const normalizedProfileStatus = normalizeStatus(technicianProfile?.status);

  // 1. No profile created yet
  if (!technicianProfile) {
    return '/technician/onboarding/register';
  }

  // Always sync bitmask from backend â€” overwrites any stale localStorage state.
  // This is the key to surviving localStorage.clear() â€” every login re-syncs.
  syncProgressFromProfile({
    id:                technicianProfile.id,
    services:          technicianProfile.services,
    yearsOfExperience: technicianProfile.yearsOfExperience,
    languages:         technicianProfile.languages,
    aadharUrl:         technicianProfile.aadharUrl,
    panUrl:            technicianProfile.panUrl,
    policeCertUrl:     technicianProfile.policeCertUrl,
    tradeLicenseUrl:   technicianProfile.tradeLicenseUrl,
    selfieUrl:         technicianProfile.selfieUrl,
    serviceAreas:      technicianProfile.serviceAreas,
    accountHolderName: technicianProfile.accountHolderName,
    accountNumber:     technicianProfile.accountNumber,
    ifscCode:          technicianProfile.ifscCode,
    status:            technicianProfile.status,
  });

  // 2. Submitted for admin review
  if (normalizedProfileStatus === 'PENDING_APPROVAL') {
    return '/technician/onboarding/pending-verification';
  }

  // 3. Verified technician or active user with complete onboarding
  if (technicianProfile.isVerified || (normalizedUserStatus === 'ACTIVE' && isOnboardingComplete())) {
    return '/dashboard/technician';
  }

  // 4. Incomplete onboarding â€” go to first gap (bitmask already synced above)
  if (normalizedProfileStatus === 'PENDING_APPROVAL') {
    return firstIncompleteRoute();
  }

  // 5. Fallback
  return '/dashboard/technician';
}
