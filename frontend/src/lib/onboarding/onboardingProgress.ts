/**
 * Onboarding progress utilities.
 *
 * Steps (0-indexed):
 *   0 — Register        (account created)
 *   1 — Skill Tagging
 *   2 — Document Upload
 *   3 — Service Area
 *   4 — Bank Details
 *   5 — Review & Submit
 *
 * Completion is stored in localStorage as a bitmask string so it survives
 * page refresh without a Redux slice. On login, call syncProgressFromProfile()
 * to seed from backend data.
 */

const STORAGE_KEY = 'technician_onboarding_progress';

const STEP_ROUTES = [
  '/technician/onboarding/register',
  '/technician/onboarding/skill-tagging',
  '/technician/onboarding/document-upload',
  '/technician/onboarding/service-area',
  '/technician/onboarding/bank-details',
  '/technician/onboarding/review-submit',
] as const;

export const ONBOARDING_ROUTES = STEP_ROUTES;
export type OnboardingRoute = (typeof STEP_ROUTES)[number];

// ─── Read / write ─────────────────────────────────────────────────────────────

function readMask(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10) || 0;
}

function writeMask(mask: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, String(mask));
}

/** Mark a step as completed. Steps are 0-indexed. */
export function markStepComplete(step: number): void {
  writeMask(readMask() | (1 << step));
}

/** Returns true if the given step has been completed. */
export function isStepComplete(step: number): boolean {
  return (readMask() & (1 << step)) !== 0;
}

/** Returns the index of the first incomplete step (0–5). */
export function firstIncompleteStep(): number {
  const mask = readMask();
  for (let i = 0; i < STEP_ROUTES.length; i++) {
    if ((mask & (1 << i)) === 0) return i;
  }
  return STEP_ROUTES.length; // all done
}

/** Returns the route for the first incomplete step. */
export function firstIncompleteRoute(): string {
  const idx = firstIncompleteStep();
  return STEP_ROUTES[idx] ?? '/technician/onboarding/register';
}

/** True when all 6 steps are complete. */
export function isOnboardingComplete(): boolean {
  const allDone = (1 << STEP_ROUTES.length) - 1; // 0b111111 = 63
  return (readMask() & allDone) === allDone;
}

/**
 * Seed progress from the backend technician profile on login/refresh.
 * Uses the exact fields returned by GET /auth/profile → data.technicianProfile.
 *
 * Bitmask rules (per requirements):
 *   Bit 0 — Register:        profile.id exists (account was created)
 *   Bit 1 — Skill Tagging:   skills.length > 0
 *   Bit 2 — Document Upload: ALL 5 document URLs are non-null
 *                             (aadharUrl, panUrl, policeCertUrl, tradeLicenseUrl, selfieUrl)
 *   Bit 3 — Service Area:    serviceAreas.length > 0
 *   Bit 4 — Bank Details:    accountHolderName + accountNumber + ifscCode all present
 *   Bit 5 — Review & Submit: profile.status === 'PENDING_APPROVAL'
 *
 * Always writes to localStorage — overwrites any stale bitmask from a previous session.
 * This means localStorage clear never forces restart because every login re-syncs from backend.
 */
export function syncProgressFromProfile(profile: {
  id?: number | null;
  // Step 1
  skills?: Array<unknown> | null;
  // Step 2
  aadharUrl?: string | null;
  panUrl?: string | null;
  policeCertUrl?: string | null;
  tradeLicenseUrl?: string | null;
  selfieUrl?: string | null;
  // Step 3
  serviceAreas?: Array<unknown> | null;
  // Step 4
  accountHolderName?: string | null;
  accountNumber?: string | null;
  ifscCode?: string | null;
  // Step 5
  status?: string | null;
}): void {
  let mask = 0;

  // Step 0 — registered
  if (profile.id) mask |= 1 << 0;

  // Step 1 — skills
  if (Array.isArray(profile.skills) && profile.skills.length > 0) mask |= 1 << 1;

  // Step 2 — all 5 documents uploaded
  if (
    profile.aadharUrl &&
    profile.panUrl &&
    profile.policeCertUrl &&
    profile.tradeLicenseUrl &&
    profile.selfieUrl
  ) mask |= 1 << 2;

  // Step 3 — service areas
  if (Array.isArray(profile.serviceAreas) && profile.serviceAreas.length > 0) mask |= 1 << 3;

  // Step 4 — bank details
  if (profile.accountHolderName && profile.accountNumber && profile.ifscCode) mask |= 1 << 4;

  // Step 5 — submitted for review
  if (profile.status === 'PENDING_APPROVAL') mask |= 1 << 5;

  writeMask(mask);
}

/** Clear all progress (used on logout). */
export function clearOnboardingProgress(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/** Feature flag helper — read once, coerce to boolean. */
export function isOnboardingLockEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK === 'true';
}
