# HiChandra Frontend — Master Project Context

> **Last updated:** July 10, 2026
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
- `allowedDevOrigins` updated per network IP
- `images.remotePatterns` allows Google images and `*.s3.eu-north-1.amazonaws.com`
- `images.minimumCacheTTL: 3600`
- S3 images use `unoptimized={true}` on `<Image>` to bypass 7s server-side proxy timeout
- `/api/:path*` rewrites to `http://13.53.114.78/api/:path*` (unused by Axios clients)

---

## 3. API Layer

### Base URLs (`src/api/endpoints.ts`)
```ts
auth:        'http://<IP>:8000/api'   // IP changes per network
userService: 'http://<IP>:8001/api'
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

### Login error handling (`LoginForm.tsx`)
Three distinct error cases:
- `error.response` present → use backend message; fallback to `'Invalid credentials'` on 401/403
- `error.request` present, no response → CORS/network: `'Unable to reach the server...'`
- Neither → `'Something went wrong. Please try again.'`

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

**Bootstrap:** `ReduxProvider` (`src/redux/Provider.tsx`) contains `AuthHydrator` that reads all three from localStorage on mount and dispatches `setCredentials` if valid tokens exist.

### ApiTechnicianProfileData type (`src/types/auth.types.ts`)
Now includes `createdAt?: string` and `updatedAt?: string` — used by `LoginForm` to store the application submission date into `localStorage.user`.

---

## 5. Redux Store

`src/redux/store.ts` registers:
```ts
auth, services, nearbyJobs, activeJobs, support, onboarding
```

`serializableCheck: false` — `onboardingSlice` stores raw `File` objects for document upload.

Legacy Zustand: `src/redux/legacy/bookingStore.ts` — active for booking flow only.

---

## 6. Admin Header — Dynamic Page Titles

`src/components/adminDashboard/layout/AdminHeader.tsx` uses `usePathname()` to derive the page title and subtitle from a `PAGE_META` map keyed by route. Updates automatically on every sidebar navigation.

---

## 7. Admin Services — Edit Service

**`UpdateServiceRequest.specifications`** shape (per backend contract):
```ts
{ name: string; type: 'text'|'number'|'select'|'image'; isRequired: boolean; isActive: boolean; values: string[] }
```

- `useServiceManager.saveEdit` maps specs with `isActive: true` and `values: values ?? []`
- `SpecificationsStep` FIELD_TYPES: `text`, `number`, `select`, `image`. `textarea` removed.
- `EditServiceForm` assigns stable `uid()` to specs loaded from backend (which have no client-side `id`)

---

## 8. Public Routes And Route Guards

Public pages: `/`, `/login`, `/signup`, `/services`, `/services/[slug]`, `/technician`, `/technician/apply`

`PublicRoute.tsx` — checks Redux `isAuthenticated` + `localStorage.user` on mount.

`AdminDashboardLayout.tsx` — ADMIN role guard via `localStorage.user`.

`DashboardLayout.tsx` — CUSTOMER role guard via `localStorage.user`.

`dashboard/technician/layout.tsx` — calls `getProfileService()`, uses `getTechnicianRedirectPath()`.

---

## 9. Login And Signup

**Login** (`LoginForm.tsx`):
- Accepts email or 10-digit mobile
- Writes all 3 localStorage keys; dispatches `setCredentials`
- TECHNICIAN: fetches `GET /auth/profile` → stores `technicianProfile.createdAt` into `localStorage.user` → `getTechnicianRedirectPath()`
- Others: `handlePostAuthRedirect(user.role)`
- Error messages distinguish CORS/network failures from credential errors

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

### Pending Verification page
- **Applicant** — `localStorage.user.username`
- **Submitted On** — `localStorage.user.technicianProfile.createdAt` (formatted `Month D, YYYY`), fallback to `user.createdAt`
- **Back to Home** — navigates to `/technician`
- Props `applicationId` and `submittedDate` removed — values derived directly from localStorage

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

### URL scheme (updated)
- **Before:** `/booking?serviceId=55`
- **After:** `/booking?service=electrical-service` (human-readable slug)

The numeric `serviceId` travels via the Zustand booking store (pre-seeded in `handleBookingClick` before navigation) — never exposed in the URL. `UnifiedBookingPage` reads `savedServiceId` from the store, not from the URL.

Routes: `/booking?service=<slug>`, `/booking/address`, `/booking/slot`, `/booking/summary`, `/booking/confirmation`, `/dashboard/customer/booking/*`

Core files: `BookingAuthGuard.tsx`, `UnifiedBookingPage.tsx`, `DynamicServiceDetailPage.tsx`, `bookingStore.ts` (Zustand), `booking.service.ts` (empty)

Status: UI complete, booking submission API pending.

---

## 13. Services

`service.service.ts` is live. Handles: fetch-all, fetch-by-ID, create (multipart), update (JSON PATCH with specifications), delete.

Backend response shape handling: double-wrap and triple-wrap defensive parsing.

---

## 14. Reference Documents

| File | Contents |
|---|---|
| `AUTH_ROTATION_CHANGES.md` | Refresh token rotation implementation |
| `AUTH_REFRESH_ROOT_CAUSE_REPORT.md` | Root cause investigation for logout bug |
| `docs/TECHNICIAN_PENDING_APPROVAL_FLOW.md` | Complete technician application lifecycle |

---

## 15. Current Gaps / Follow-up

| Area | Status |
|---|---|
| `booking.service.ts` | Empty — booking submission pending |
| Pending verification page | Shows real username + submission date; status still hardcoded `'pending'` |
| Technician profile save | Partially implemented |
| Customer booking detail `/bookings/[id]` | Skeleton |
| Some dashboard pages | Mock data |
| `REJECTED` technician routing | Not explicitly handled |
| Admin dashboard `/dashboard/admin` 404 | Turbopack dev artefact; page.tsx exists and is correct |

---

## 16. Quick Verification

Run from `frontend/`:
```bash
pnpm lint
pnpm build
```
