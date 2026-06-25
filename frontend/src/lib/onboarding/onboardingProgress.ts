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
 * Pass the profile status and which data sections are non-empty.
 *
 * Called by LoginForm (TECHNICIAN role) immediately after credentials are set.
 */
export function syncProgressFromProfile(profile: {
  id?: number;
  skills?: { skills: string[] } | null;
  documents?: unknown[] | null;
  serviceArea?: { serviceRadiusKm: number } | null;
  bankDetails?: { accountNumber: string } | null;
  status?: string;
}): void {
  let mask = 0;

  // Step 0 — registered (profile exists)
  if (profile.id) mask |= 1 << 0;

  // Step 1 — skills saved
  if (profile.skills?.skills?.length) mask |= 1 << 1;

  // Step 2 — documents uploaded
  if (Array.isArray(profile.documents) && profile.documents.length > 0) mask |= 1 << 2;

  // Step 3 — service area saved
  if (profile.serviceArea?.serviceRadiusKm) mask |= 1 << 3;

  // Step 4 — bank details saved
  if (profile.bankDetails?.accountNumber) mask |= 1 << 4;

  // Step 5 — submitted (PENDING or APPROVED)
  if (profile.status === 'PENDING' || profile.status === 'APPROVED') mask |= 1 << 5;

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
