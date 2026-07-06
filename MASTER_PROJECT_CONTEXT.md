# HiChandra Frontend - Master Project Context

> Last updated: July 3, 2026
> Purpose: Permanent handoff document for this checkout. Paste this file into a new chat to restore the current frontend context.

---

## 1. Project Overview

HiChandra is a home-services platform connecting customers with technicians for services such as AC servicing, solar cleaning, electrical work, and plumbing.

The app is a Next.js App Router frontend with live auth integration, live services integration, customer/admin/technician dashboards, a multi-step technician onboarding flow, and a mostly UI-complete booking flow. Some backend integrations are still partial.

Roles:

1. CUSTOMER - browses services, books appointments, manages profile.
2. TECHNICIAN - completes onboarding, waits for approval, uses technician dashboard.
3. ADMIN - manages bookings, complaints, technicians, finance, reviews, and services.

---

## 2. Tech Stack

| Area | Current setup |
|---|---|
| Framework | Next.js 16.2.6, App Router |
| React | 19.2.4 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI libraries | MUI v9, Lucide React, Material Symbols |
| Animation | Framer Motion v12 |
| State | Redux Toolkit, React Redux, legacy Zustand booking store |
| HTTP | Axios |
| Package manager | pnpm (`pnpm-lock.yaml` present) |
| React Compiler | Enabled in `next.config.ts` |

Important config:

- `frontend/next.config.ts` has `reactCompiler: true`.
- `allowedDevOrigins` currently includes `192.168.1.6`.
- `images.remotePatterns` allow Google images and `*.s3.eu-north-1.amazonaws.com`.
- `images.minimumCacheTTL` is `3600`.
- `/api/:path*` rewrites to `http://13.53.114.78/api/:path*`, but the Axios clients do not use that rewrite.

---

## 3. API Layer

`frontend/src/api/endpoints.ts` is the central endpoint map.

Current base URLs:

```ts
auth:        'http://192.168.1.23:8000/api'
userService: 'http://192.168.1.23:8001/api'
```

Current endpoints:

| Key | Method/path | Notes |
|---|---|---|
| `LOGIN` | `POST /auth/login` | Email or phone login |
| `GENERATE_OTP` | `POST /auth/generate-otp` | Customer and technician OTP |
| `VERIFY_OTP` | `POST /auth/verify-otp` | OTP verification |
| `GET_PROFILE` | `GET /auth/profile` | Used by technician route/onboarding guards |
| `REGISTER_CUSTOMER` | `POST /users/register` | Multipart customer registration |
| `REGISTER_TECHNICIAN` | `POST /users/register` | Same backend route, technician payload |
| `GET_ALL_SERVICES` | `GET /users/service/all` | Services grid and admin services |
| `GET_SERVICE_BY_ID` | `GET /users/service/:id` | Detail page |
| `CREATE_SERVICE` | `POST /users/admin/service` | Multipart admin service creation |
| `UPDATE_SERVICE` | `PATCH /users/update/service/:id` | JSON update |
| `DELETE_SERVICE` | `DELETE /users/delete/service/:id` | Admin delete |

`frontend/src/api/axios.ts`:

- Creates `authApi` and `userServiceApi`.
- Reads `store.getState().auth.accessToken` for the `Authorization: Bearer ...` header.
- Logs API errors.
- Does not currently perform token refresh.
- Does not use `withCredentials`.

`frontend/src/services/auth.service.ts`:

- `loginService`
- `generateOtpService`
- `verifyOtpService`
- `registerCustomerService`
- `registerTechnicianService`
- `getProfileService`

There is currently no `logoutService` and no refresh-token service wrapper in this checkout.

---

## 4. Auth State And Persistence

Redux auth state lives in `frontend/src/redux/slices/authSlice.ts`.

Current auth state:

```ts
{
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}
```

Actions:

- `setCredentials({ user, accessToken, refreshToken })`
- `logout()`

Current persistence behavior:

- Login writes only `localStorage.user`.
- Login does not write `localStorage.accessToken` or `localStorage.refreshToken`.
- Tokens live in Redux memory after login or technician final submit.
- `ReduxProvider` currently only mounts the store provider. It does not bootstrap auth from `localStorage.user` or refresh tokens.
- Some logout handlers still remove `localStorage.accessToken`, `localStorage.refreshToken`, and `localStorage.user` for backward compatibility.

Important implication:

- A full page refresh loses Redux access/refresh tokens, but `localStorage.user` remains.
- Guards often treat `localStorage.user` as an authenticated session marker.
- API requests after refresh may not have an access token unless the user logs in again or a future bootstrap/refresh flow is added.

---

## 5. Redux Store

`frontend/src/redux/store.ts` registers:

```ts
auth
services
nearbyJobs
activeJobs
support
onboarding
```

The store disables `serializableCheck` because `onboardingSlice` stores raw `File` objects for technician document upload. Do not store raw `File` objects in `sessionStorage`; keep files in Redux and serializable preview metadata in session storage.

Other Redux slice files exist but are not all wired into the store:

- `activitySlice`
- `bookingSlice`
- `dashboardStatsSlice`
- `loyaltySlice`
- `performanceSlice`

Legacy Zustand:

- `frontend/src/redux/legacy/bookingStore.ts` is active for the booking flow.
- Empty legacy stores exist and should not be treated as active unless implemented.

---

## 6. Public Routes And Route Guards

Public pages:

- `/`
- `/login`
- `/signup`
- `/services`
- `/services/[slug]`
- `/technician`
- `/technician/apply`

`frontend/src/components/auth/PublicRoute.tsx` wraps `/`, `/login`, and `/signup`.

Current behavior:

- On mount, it checks Redux `isAuthenticated` and fallback `localStorage.user`.
- If a role exists, it redirects with `handlePostAuthRedirect(role)`.
- It is mount-only and does not listen for later auth state changes.
- It calls `handlePostAuthRedirect`, which consumes `sessionStorage.redirectAfterLogin`.

`frontend/src/components/common/PublicNavbar.tsx`:

- Shows auth buttons based on Redux auth state.
- Dashboard button reads `localStorage.user.role`.
- Logout removes legacy token keys and `localStorage.user`, dispatches `logout()`, then routes to `/`.

Customer dashboard guard:

- `frontend/src/components/customerDashboard/layout/DashboardLayout.tsx`
- Uses `localStorage.user` first, Redux fallback.
- Redirects unauthenticated users to `/login`.
- Redirects wrong roles to `getDashboardPathForRole(role)`.
- Removes malformed `localStorage.user`.

Admin dashboard guard:

- `frontend/src/components/adminDashboard/layout/AdminDashboardLayout.tsx`
- Uses `localStorage.user` first, Redux fallback.
- Allows only `ADMIN`.
- Redirects non-admin or unauthenticated users to `/login`.
- Removes malformed `localStorage.user`.

Technician dashboard guard:

- `frontend/src/app/dashboard/technician/layout.tsx`
- Requires `localStorage.user`.
- Calls `getProfileService()`.
- Redirects missing profile to `/technician/onboarding/register`.
- Calls `getTechnicianRedirectPath()`.
- Renders dashboard only when redirect path is `/dashboard/technician`.

---

## 7. Redirect Utilities

`frontend/src/lib/authApi/redirectUtils.ts` owns post-auth redirects.

Core helpers:

- `storeRedirectPath(path?)`
- `getAndClearRedirectPath()`
- `getDashboardPathForRole(role)`
- `handlePostAuthRedirect(role?)`
- `getTechnicianRedirectPath({ userStatus, technicianProfile })`

Dashboard paths:

| Role | Dashboard |
|---|---|
| `ADMIN` | `/dashboard/admin` |
| `TECHNICIAN` | `/dashboard/technician` |
| anything else | `/dashboard/customer` |

Stored redirect safety:

- Admin dashboard redirects require `ADMIN`.
- Technician dashboard redirects require `TECHNICIAN`.
- Customer dashboard and `/booking` redirects are blocked for `ADMIN` and `TECHNICIAN`.

Current technician redirect logic in code:

| Condition | Destination |
|---|---|
| `technicianProfile === null` | `/technician/onboarding/register` |
| `technicianProfile.status === 'PENDING_APPROVAL'` | `/technician/onboarding/pending-verification` |
| `technicianProfile.isVerified === true` | `/dashboard/technician` |
| `userStatus === 'ACTIVE'` and onboarding bitmask complete | `/dashboard/technician` |
| `technicianProfile.status === 'INCOMPLETE'` | `firstIncompleteRoute()` |
| fallback | `/dashboard/technician` |

Important caveat:

- The current type for `ApiTechnicianProfileData.status` only lists `PENDING_APPROVAL | APPROVED | REJECTED`, while redirect code still checks `INCOMPLETE`.
- Current redirect code does not explicitly route `REJECTED` to pending verification.
- Current redirect code does not require both `profile.status === 'APPROVED'` and `user.status === 'ACTIVE'` before allowing dashboard. It allows `isVerified` or active+complete bitmask.

---

## 8. Login And Signup Flow

Customer signup:

- `frontend/src/hooks/useSignupForm.ts`
- Validates signup fields.
- Generates customer OTP.
- Verifies OTP.
- Registers customer through `registerCustomerService`.
- Auto-logins through `loginService`.
- Writes `localStorage.user`.
- Dispatches `setCredentials({ user, accessToken, refreshToken })`.
- Redirects using `handlePostAuthRedirect()`.

Login:

- `frontend/src/components/auth/LoginForm.tsx`
- Accepts either email or 10-digit mobile number.
- Calls `loginService`.
- Writes `localStorage.user` only.
- Dispatches `setCredentials({ user, accessToken, refreshToken })`.
- Non-technicians redirect with `handlePostAuthRedirect(user.role)`.
- Technicians redirect using `getTechnicianRedirectPath()` with the `user.technicianProfile` embedded in the login response.
- Login currently does not call `GET /auth/profile`; it relies on the login response for technician profile data.

---

## 9. Technician Onboarding

Canonical onboarding routes:

| Step | Route | Page |
|---|---|---|
| 0 | `/technician/onboarding/register` | Personal info and mobile OTP |
| 1 | `/technician/onboarding/skills-equipment` | Services, experience, languages, brand expertise, equipment |
| 2 | `/technician/onboarding/document-upload` | Selfie and documents |
| 3 | `/technician/onboarding/service-area` | Radius and service area |
| 4 | `/technician/onboarding/bank-details` | Bank payout details |
| 5 | `/technician/onboarding/review-submit` | Final review and submit |
| status | `/technician/onboarding/pending-verification` | Verification status UI |

Compatibility route:

- `/technician/onboarding/skill-tagging` redirects to `/technician/onboarding/skills-equipment`.

Current draft keys:

- `registerData`
- `skillsEquipmentData`
- `documentUploadData`
- `serviceAreaData`
- `bankDetailsData`

Personal info behavior:

- `usePersonalInfoForm` sends and verifies OTP for `role: 'TECHNICIAN'`.
- OTP copy and errors are mobile-focused.
- The register step does not call `/users/register`.
- After OTP verification, `handleRegister()` saves `registerData`, marks step 0 complete, and routes to `/technician/onboarding/skills-equipment`.

Final submit behavior:

- `useReviewSubmit` reads all session storage draft keys.
- It builds one multipart request to `POST /users/register` through `registerTechnicianService`.
- It sends `technicianProfile` JSON plus document files.
- After success, it writes `localStorage.user`, dispatches credentials, and clears Redux onboarding files.
- It preserves the exact refresh-recovery error:
  `Please re-upload all documents before submitting.`

Pending verification page:

- `frontend/src/app/technician/onboarding/pending-verification/page.tsx`
- Currently hardcodes `applicationStatus = 'pending'`.
- Existing UI components can render multiple status states, but the route itself does not fetch live status.

---

## 10. Onboarding Guard And Progress Bitmask

`frontend/src/lib/onboarding/onboardingProgress.ts` stores technician progress in `localStorage.technician_onboarding_progress` as a bitmask.

Routes order:

```ts
[
  '/technician/onboarding/register',
  '/technician/onboarding/skills-equipment',
  '/technician/onboarding/document-upload',
  '/technician/onboarding/service-area',
  '/technician/onboarding/bank-details',
  '/technician/onboarding/review-submit',
]
```

Helpers:

- `markStepComplete(step)`
- `isStepComplete(step)`
- `firstIncompleteStep()`
- `firstIncompleteRoute()`
- `isOnboardingComplete()`
- `syncProgressFromProfile(profile)`
- `clearOnboardingProgress()`
- `isOnboardingLockEnabled()`

Bitmask rules in `syncProgressFromProfile()`:

| Bit | Meaning | Required backend fields |
|---|---|---|
| 0 | Register | `profile.id` |
| 1 | Skills and equipment | services exists, `yearsOfExperience`, languages |
| 2 | Documents | all five document URLs |
| 3 | Service area | `serviceAreas.length > 0` |
| 4 | Bank details | account holder, account number, IFSC |
| 5 | Review submit | `profile.status === 'PENDING_APPROVAL'` |

Feature flag:

```env
NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=true
```

`frontend/src/hooks/useOnboardingGuard.ts`:

- Runs once on mount.
- `stepIndex: 0` is register.
- `stepIndex: 1..5` are onboarding steps.
- `stepIndex: -1` is dashboard mode.
- Uses `localStorage.user` as auth context.
- When the bitmask is missing or zero, it calls `GET /auth/profile` and syncs progress.
- For `stepIndex === 0` or `-1`, if a technician profile exists, it calls `getTechnicianRedirectPath()` and redirects.
- When the lock is disabled, it skips sequential step restrictions.

---

## 11. Booking Flow

Routes:

- `/booking?serviceId=N`
- `/booking/address`
- `/booking/slot`
- `/booking/summary`
- `/booking/confirmation`
- Dashboard-scoped booking routes under `/dashboard/customer/booking`.

Core files:

- `frontend/src/components/booking/BookingAuthGuard.tsx`
- `frontend/src/components/booking/UnifiedBookingPage.tsx`
- `frontend/src/components/serviceDetails/DynamicServiceDetailPage.tsx`
- `frontend/src/redux/legacy/bookingStore.ts`
- `frontend/src/services/booking.service.ts`

Current status:

- UI flow is implemented.
- Service detail pages seed the booking store from backend service data.
- `booking.service.ts` is empty.
- Booking submission API integration is still pending.

---

## 12. Services And Admin Services

`frontend/src/services/service.service.ts` is live.

Implemented:

- Fetch all services.
- Fetch service by ID.
- Normalize backend service data into UI `AdminService`.
- Create service with multipart `FormData`.
- Update service with JSON PATCH.
- Delete service.

Known backend shape handling:

- Fetch-all defensively handles double-wrapped response shapes.
- Fetch-by-ID defensively handles direct, double-wrapped, and triple-wrapped response shapes.
- Backend image fields include `iconUrl` and `iconDownloadUrl`.

---

## 13. Routes Snapshot

Public and marketing:

- `/`
- `/login`
- `/signup`
- `/services`
- `/services/[slug]`
- `/technician`
- `/technician/apply`

Customer dashboard:

- `/dashboard/customer`
- `/dashboard/customer/services`
- `/dashboard/customer/services/[slug]`
- `/dashboard/customer/booking`
- `/dashboard/customer/booking/summary`
- `/dashboard/customer/booking/confirmation`
- `/dashboard/customer/bookings`
- `/dashboard/customer/bookings/[id]`
- `/dashboard/customer/addresses`
- `/dashboard/customer/invoices`
- `/dashboard/customer/profile`
- `/dashboard/customer/support`

Admin dashboard:

- `/dashboard/admin`
- `/dashboard/admin/bookings`
- `/dashboard/admin/complaints`
- `/dashboard/admin/customers`
- `/dashboard/admin/finance`
- `/dashboard/admin/finance/edit`
- `/dashboard/admin/reviews`
- `/dashboard/admin/services`
- `/dashboard/admin/services/add`
- `/dashboard/admin/technicians`

Technician dashboard:

- `/dashboard/technician`
- `/dashboard/technician/active-jobs`
- `/dashboard/technician/earnings`
- `/dashboard/technician/jobs`
- `/dashboard/technician/profile`
- `/dashboard/technician/support`

Technician onboarding:

- `/technician/onboarding/register`
- `/technician/onboarding/skills-equipment`
- `/technician/onboarding/skill-tagging` compatibility redirect
- `/technician/onboarding/document-upload`
- `/technician/onboarding/service-area`
- `/technician/onboarding/bank-details`
- `/technician/onboarding/review-submit`
- `/technician/onboarding/pending-verification`

---

## 14. Important Implementation Notes

- Do not change folder structure unless explicitly requested.
- For onboarding work, trace the existing flow before editing.
- Keep `registerData`, `skillsEquipmentData`, `documentUploadData`, `serviceAreaData`, and `bankDetailsData` as the canonical draft keys.
- Do not store raw `File` objects in `sessionStorage`.
- Keep raw document files in Redux onboarding state.
- Preserve `Please re-upload all documents before submitting.` exactly.
- `/technician/onboarding/skill-tagging` is only a compatibility redirect.
- Current technician final registration is one multipart `POST /users/register`.
- `GET /auth/profile` is used for onboarding/profile sync and dashboard protection.
- The codebase contains some mojibake in comments from earlier edits; patch against stable code lines when editing those files.
- Use `pnpm` scripts in `frontend/`, for example `pnpm lint`.

---

## 15. Current Gaps / Follow-up Targets

Auth and routing:

- No Redux auth bootstrap/refresh flow is currently implemented in `Provider.tsx`.
- Login does not persist tokens to localStorage, but refresh loses Redux tokens.
- `ENDPOINTS` does not currently include logout or refresh-token routes.
- `PublicRoute` consumes stored redirect paths on public-route visits.
- Technician approval routing is not strict enough for rejected profiles or ACTIVE-but-unapproved profiles.

Onboarding:

- Pending verification page uses hardcoded status.
- Types and redirect logic disagree about possible `INCOMPLETE` technician profile status.
- `useOnboardingGuard` is mount-only and suppresses exhaustive deps.

Booking:

- `booking.service.ts` is empty.
- Booking submission API is pending.

Dashboard/API:

- Some dashboard pages still use mock data or skeleton content.
- Technician profile save is not fully implemented.
- Customer booking detail page may need real content/API integration.

---

## 16. Quick Verification Commands

Run from `frontend/`:

```bash
pnpm lint
pnpm build
```

For targeted lint:

```bash
pnpm lint -- src/path/to/file.tsx
```

---

Update this file whenever auth behavior, onboarding routes, API contracts, or dashboard integration status changes.
