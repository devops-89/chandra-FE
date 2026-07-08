# HiChandra Frontend — Master Project Context

> **Last updated:** July 8, 2026
> **Purpose:** Permanent handoff document. Paste this file into any new chat to restore full project context instantly.

---

## 1. Project Overview

HiChandra is a home-services platform connecting customers with technicians for services such as AC servicing, solar cleaning, electrical work, and plumbing.

The app is a Next.js App Router frontend with live auth integration, live services integration, customer/admin/technician dashboards, a multi-step technician onboarding flow, and a mostly UI-complete booking flow.

Roles:
1. **CUSTOMER** — browses services, books appointments, manages profile
2. **TECHNICIAN** — completes onboarding, waits for approval, uses technician dashboard
3. **ADMIN** — manages bookings, complaints, technicians, finance, reviews, and services

---

## 2. Tech Stack

| Area | Setup |
|---|---|
| Framework | Next.js 16.2.6, App Router |
| React | 19.2.4 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI libraries | MUI v9, Lucide React, Material Symbols |
| Animation | Framer Motion v12 |
| State | Redux Toolkit + legacy Zustand booking store |
| HTTP | Axios (with refresh token rotation interceptor) |
| Package manager | pnpm |
| React Compiler | Enabled in `next.config.ts` |

Config notes:
- `allowedDevOrigins` includes `192.168.1.6`
- `images.remotePatterns` allows Google images and `*.s3.eu-north-1.amazonaws.com`
- `images.minimumCacheTTL: 3600`
- S3 images use `unoptimized={true}` on `<Image>` to bypass 7s server-side proxy timeout
- `/api/:path*` rewrites to `http://13.53.114.78/api/:path*` (unused by Axios clients)

---

## 3. API Layer

### Base URLs (`src/api/endpoints.ts`)
```ts
auth:        'http://192.168.1.33:8000/api'  // IP changes per network
userService: 'http://192.168.1.33:8001/api'
```

### Endpoints
| Key | Method/path | Notes |
|---|---|---|
| `LOGIN` | `POST /auth/login` | Email or phone login |
| `REFRESH_TOKEN` | `POST /auth/refresh-token` | Refresh Token Rotation — returns both new tokens |
| `GENERATE_OTP` | `POST /auth/generate-otp` | Customer and technician OTP |
| `VERIFY_OTP` | `POST /auth/verify-otp` | OTP verification |
| `GET_PROFILE` | `GET /auth/profile` | Used by technician guards and login redirect |
| `REGISTER_CUSTOMER` | `POST /users/register` | Multipart customer registration |
| `REGISTER_TECHNICIAN` | `POST /users/register` | Same endpoint, technician payload |
| `GET_ALL_SERVICES` | `GET /users/service/all` | Services grid and admin services |
| `GET_SERVICE_BY_ID` | `GET /users/service/:id` | Detail page |
| `CREATE_SERVICE` | `POST /users/admin/service` | Multipart admin service creation |
| `UPDATE_SERVICE` | `PATCH /users/update/service/:id` | JSON update, includes specifications |
| `DELETE_SERVICE` | `DELETE /users/delete/service/:id` | Admin delete |
| `UPDATE_PROFILE` | `PATCH /users/profile` | Admin/customer profile update |
| `CHANGE_PASSWORD` | `POST /users/change-password` | |
| `GET_CUSTOMER_ADDRESSES` | `GET /users/customer/addresses` | |
| `CREATE_ADDRESS` | `POST /users/customer/address` | |
| `UPDATE_ADDRESS` | `PATCH /users/customer/address` | |
| `DELETE_ADDRESS` | `DELETE /users/customer/address/:id` | |
| `GET_CUSTOMER_BOOKINGS` | `GET /bookings/all` | |
| `CREATE_BOOKING` | `POST /bookings` | |
| `CREATE_COMPLAINT` | `POST /bookings/complaint` | |
| `UPDATE_COMPLAINT` | `PATCH /bookings/complaint` | |

### Axios (`src/api/axios.ts`)
- Creates `authApi` (port 8000) and `userServiceApi` (port 8001)
- **Request interceptor:** reads `localStorage.accessToken` → falls back to Redux store
- **Response interceptor (401 handler — Refresh Token Rotation):**
  - On 401: reads `localStorage.refreshToken`, POSTs to `ENDPOINTS.REFRESH_TOKEN`
  - Backend returns **both** `accessToken` AND `refreshToken` (old refresh token immediately invalid)
  - Validates both tokens present before updating state
  - Dispatches `updateTokens({ accessToken, refreshToken })` — updates Redux + localStorage
  - Queues concurrent 401 requests while refresh is in-flight
  - **Force logout ONLY on 401 or 403 from the refresh endpoint itself**
  - Does NOT logout on: network failure, timeout, 500, validation error, backend unavailable
  - Retries original request with new access token

### Auth Service (`src/services/auth.service.ts`)
Functions: `loginService`, `generateOtpService`, `verifyOtpService`, `registerCustomerService`, `registerTechnicianService`, `getProfileService`

---

## 4. Auth State

Redux auth slice (`src/redux/slices/authSlice.ts`):
```ts
{ user: User | null; accessToken: string | null; refreshToken: string | null; isAuthenticated: boolean }
```

Actions:
- `setCredentials({ user, accessToken, refreshToken? })` — writes all 3 to localStorage
- `updateTokens({ accessToken, refreshToken })` — called by refresh interceptor, updates both tokens in Redux + localStorage
- `logout()` — clears Redux + removes all 3 localStorage keys
- `updateUser(partial)` — patches user in Redux + localStorage

**Persistence:** All three (`accessToken`, `refreshToken`, `user`) written to localStorage on login/signup/registration. Survive page refresh and tab close.

**Bootstrap:** `ReduxProvider` (`src/redux/Provider.tsx`) contains `AuthHydrator` that reads all three from localStorage on mount and dispatches `setCredentials` if valid tokens exist. No bootstrap API call needed.

---

## 5. Redux Store

`src/redux/store.ts` registers:
```ts
auth, services, nearbyJobs, activeJobs, support, onboarding
```

`serializableCheck: false` — `onboardingSlice` stores raw `File` objects for document upload.

Not wired: `activitySlice`, `bookingSlice`, `dashboardStatsSlice`, `loyaltySlice`, `performanceSlice`

Legacy Zustand: `src/redux/legacy/bookingStore.ts` — active for booking flow only.

---

## 6. Admin Header — Dynamic Page Titles

`src/components/adminDashboard/layout/AdminHeader.tsx` uses `usePathname()` to derive the page title and subtitle from a `PAGE_META` map keyed by route. The heading updates automatically on every sidebar navigation — no props needed.

```ts
const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  '/dashboard/admin':             { title: 'Admin Dashboard', ... },
  '/dashboard/admin/bookings':    { title: 'Bookings', ... },
  '/dashboard/admin/technicians': { title: 'Technicians', ... },
  // ...all 8 admin routes
}
```

---

## 7. Admin Services — Edit Service

Specification fields in edit service are now fully wired:

**`UpdateServiceRequest.specifications` shape** (per backend contract):
```ts
{ name: string; type: 'text'|'number'|'select'|'image'; isRequired: boolean; isActive: boolean; values?: string[] }
```

**`useServiceManager.saveEdit`** maps specs with `isActive: true` and `values: values ?? []`.

**`SpecificationsStep`** FIELD_TYPES: `text`, `number`, `select (dropdown)`, `image upload`. `textarea` removed — backend enum rejects it.

**Edit Service fix:** Specs loaded from backend have no `id`. `EditServiceForm` now assigns a stable `uid()` to each on init so `SpecificationsStep` can key and update them correctly.

---

## 8. Public Routes And Route Guards

Public pages: `/`, `/login`, `/signup`, `/services`, `/services/[slug]`, `/technician`, `/technician/apply`

`PublicRoute.tsx` — checks Redux `isAuthenticated` + `localStorage.user` on mount, redirects authenticated users to their dashboard.

`PublicNavbar.tsx` — shows auth state. Logout dispatches `logout()` (clears all localStorage keys) and routes to `/`.

`AdminDashboardLayout.tsx` — guard uses `localStorage.user`, ADMIN role check only.

`DashboardLayout.tsx` — guard uses `localStorage.user`, CUSTOMER role check.

`dashboard/technician/layout.tsx` — calls `getProfileService()`, uses `getTechnicianRedirectPath()`.

---

## 9. Login And Signup

**Login** (`LoginForm.tsx`):
- Accepts email or 10-digit mobile
- Writes `localStorage.user`, `localStorage.accessToken`, `localStorage.refreshToken`
- Dispatches `setCredentials({ user, accessToken, refreshToken })`
- TECHNICIAN: fetches `GET /auth/profile` → `getTechnicianRedirectPath()`
- Others: `handlePostAuthRedirect(user.role)`

**Customer signup** (`useSignupForm.ts`):
- Phone OTP → register → auto-login
- Writes all 3 localStorage keys, dispatches `setCredentials`

---

## 10. Technician Onboarding

### Routes
| Step | Route |
|---|---|
| 0 | `/technician/onboarding/register` |
| 1 | `/technician/onboarding/skills-equipment` |
| 2 | `/technician/onboarding/document-upload` |
| 3 | `/technician/onboarding/service-area` |
| 4 | `/technician/onboarding/bank-details` |
| 5 | `/technician/onboarding/review-submit` |
| status | `/technician/onboarding/pending-verification` |

`/technician/onboarding/skill-tagging` → compatibility redirect to skills-equipment.

### Draft keys (sessionStorage)
`registerData`, `skillsEquipmentData`, `documentUploadData`, `serviceAreaData`, `bankDetailsData`

### Step 0 behavior
- `usePersonalInfoForm` handles mobile OTP for `role: 'TECHNICIAN'`
- OTP verification only — does NOT call `/users/register`
- After verify: saves `registerData`, marks step 0 complete, routes to skills-equipment

### Final submit
- `useReviewSubmit` reads all draft keys, builds one multipart `POST /users/register`
- After success: writes all 3 localStorage keys, dispatches credentials, clears Redux onboarding files

### Onboarding guard (`useOnboardingGuard.ts`)
- Feature flag: `NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=true`
- Bitmask key: `localStorage.technician_onboarding_progress`
- On missing/zero bitmask with token present: calls `GET /auth/profile` + `syncProgressFromProfile()`
- `stepIndex: -1` = dashboard guard

### Bitmask rules
| Bit | Step | Required |
|---|---|---|
| 0 | Register | `profile.id` |
| 1 | Skills | services + yearsOfExperience + languages |
| 2 | Documents | all 5 document URLs |
| 3 | Service area | `serviceAreas.length > 0` |
| 4 | Bank | accountHolder + accountNumber + IFSC |
| 5 | Submitted | `profile.status === 'PENDING_APPROVAL'` |

---

## 11. Technician Redirect Logic

`getTechnicianRedirectPath({ userStatus, technicianProfile })`:
| Condition | Destination |
|---|---|
| `technicianProfile === null` | `/technician/onboarding/register` |
| `status === 'PENDING_APPROVAL'` | `/technician/onboarding/pending-verification` |
| `isVerified === true` | `/dashboard/technician` |
| `userStatus === 'ACTIVE'` and onboarding complete | `/dashboard/technician` |
| `status === 'INCOMPLETE'` | `firstIncompleteRoute()` |
| fallback | `/dashboard/technician` |

---

## 12. Booking Flow

Routes: `/booking?serviceId=N`, `/booking/address`, `/booking/slot`, `/booking/summary`, `/booking/confirmation`, `/dashboard/customer/booking/*`

Core files: `BookingAuthGuard.tsx`, `UnifiedBookingPage.tsx`, `DynamicServiceDetailPage.tsx`, `bookingStore.ts` (Zustand), `booking.service.ts` (empty)

Status: UI complete, booking submission API pending.

---

## 13. Services

`service.service.ts` is live. Handles: fetch-all, fetch-by-ID, create (multipart), update (JSON PATCH with specifications), delete.

Backend response shape handling: double-wrap and triple-wrap defensive parsing.

---

## 14. Auth Rotation Report

`AUTH_ROTATION_CHANGES.md` documents the refresh token rotation implementation.
`AUTH_REFRESH_ROOT_CAUSE_REPORT.md` documents the root cause investigation.

---

## 15. Current Gaps / Follow-up

| Area | Status |
|---|---|
| `booking.service.ts` | Empty — booking submission pending |
| Pending verification page | Hardcoded `'pending'` status |
| Technician profile save | Partially implemented |
| Customer booking detail `/bookings/[id]` | Skeleton |
| Some dashboard pages | Mock data |
| `REJECTED` technician routing | Not explicitly handled |

---

## 16. Quick Verification

Run from `frontend/`:
```bash
pnpm lint
pnpm build
```
