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
    return '/technician/dashboard';
  }

  return '/customer/dashboard';
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

  if (path.startsWith('/technician/dashboard')) {
    return normalizedRole === 'TECHNICIAN';
  }

  if (path.startsWith('/customer') || path.startsWith('/booking')) {
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
 *      â†’ /technician/dashboard
 *   4. profile.status === 'INCOMPLETE' â†’ sync bitmask from profile â†’ firstIncompleteRoute()
 *   5. Fallback â†’ /technician/dashboard
 */
export function getTechnicianRedirectPath(params: {
  userStatus: string;
  technicianProfile: ApiTechnicianProfileData | null;
}): string {
  const { userStatus, technicianProfile } = params;
  const normalizedUserStatus = normalizeStatus(userStatus);
  const normalizedProfileStatus = normalizeStatus(technicianProfile?.status);

  // If a technician logs in but hasn't created a profile, Step 0 (account creation) is inherently complete.
  // We pass a dummy ID to set the Step 0 bit in the local storage mask.
  const profileToSync = technicianProfile || { id: -1 };

  // Always sync bitmask from backend
  syncProgressFromProfile({
    id:                profileToSync.id as any,
    services:          profileToSync.services as any,
    yearsOfExperience: profileToSync.yearsOfExperience,
    languages:         profileToSync.languages as any,
    aadharUrl:         profileToSync.aadharUrl,
    panUrl:            profileToSync.panUrl,
    policeCertUrl:     profileToSync.policeCertUrl,
    tradeLicenseUrl:   profileToSync.tradeLicenseUrl,
    selfieUrl:         profileToSync.selfieUrl,
    serviceAreas:      profileToSync.serviceAreas as any,
    accountHolderName: profileToSync.accountHolderName,
    accountNumber:     profileToSync.accountNumber,
    ifscCode:          profileToSync.ifscCode,
    status:            profileToSync.status,
  });

  // 1. No profile created yet
  if (!technicianProfile) {
    return firstIncompleteRoute();
  }

  // 2. Submitted for admin review
  if (normalizedProfileStatus === 'PENDING_APPROVAL') {
    return '/technician/onboarding/pending-verification';
  }

  // 3. Verified technician or active user with complete onboarding
  if (technicianProfile.isVerified || (normalizedUserStatus === 'ACTIVE' && isOnboardingComplete())) {
    return '/technician/dashboard';
  }

  // 4. Incomplete onboarding â€” go to first gap (bitmask already synced above)
  if (normalizedProfileStatus === 'PENDING_APPROVAL') {
    return firstIncompleteRoute();
  }

  // 5. Fallback
  return '/technician/dashboard';
}
