# HiChandra Frontend â€” Master Project Context

> **Last updated:** August 3, 2026
> **Purpose:** Permanent handoff document. Paste this file into any new chat to restore full project context instantly.

---

## 1. Project Overview

HiChandra is a home-services platform connecting customers with technicians for services such as AC servicing, solar cleaning, electrical work, and plumbing.

The app is a Next.js App Router frontend with live auth integration, live services integration, customer/admin/technician dashboards, a multi-step technician onboarding flow, and a mostly UI-complete booking flow.

Roles:
1. **CUSTOMER** â€” browses services, books appointments, manages profile
2. **TECHNICIAN** â€” completes onboarding, waits for approval, uses technician dashboard
3. **ADMIN** â€” manages bookings, complaints, technicians, finance, reviews, and services

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
| Package manager | pnpm (`pnpm dev` runs `next dev --turbopack`) |
| React Compiler | Enabled in `next.config.ts` |

Config notes:
- **Dev Server Port:** Runs on Next.js default port `3000` (via `"dev": "next dev --turbopack"` in `package.json`).
- `allowedDevOrigins` updated per network IP
- `images.remotePatterns` allows Google images and `*.s3.eu-north-1.amazonaws.com`
- `images.minimumCacheTTL: 3600`
- S3 images use `unoptimized={true}` on `<Image>` to bypass 7s server-side proxy timeout
- `/api/:path*` rewrites to `http://13.53.114.78/api/:path*` (unused by Axios clients)

---

## 3. API Layer

### Base URLs (`src/api/endpoints.ts`)
```ts
auth:        'http://<IP>/api'   // single load-balanced IP; no port
userService: 'http://<IP>/api'
```

### Endpoints
| Key | Method/path | Notes |
|---|---|---|
| `LOGIN` | `POST /auth/login` | Email or phone login |
| `REFRESH_TOKEN` | `POST /auth/refresh-token` | Refresh Token Rotation â€” returns both new tokens |
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
- Creates `authApi` and `userServiceApi` (both point to same base URL)
- **Request interceptor:** reads `localStorage.accessToken` â†’ falls back to Redux store
- **Response interceptor (401 handler â€” Refresh Token Rotation):**
  - On 401: reads `localStorage.refreshToken`, POSTs to `ENDPOINTS.REFRESH_TOKEN`
  - Backend returns **both** `accessToken` AND `refreshToken` (old refresh token immediately invalid)
  - Validates both tokens present before updating state
  - Dispatches `updateTokens({ accessToken, refreshToken })` â€” updates Redux + localStorage
  - Queues concurrent 401 requests while refresh is in-flight
  - **Force logout ONLY on 401 or 403 from the refresh endpoint itself**
  - Does NOT logout on: network failure, timeout, 500, validation error, backend unavailable
  - Retries original request with new access token

### Login error handling (`LoginForm.tsx`)
Three distinct error cases:
- `error.response` present â†’ use backend message; fallback to `'Invalid credentials'` on 401/403
- `error.request` present, no response â†’ CORS/network: `'Unable to reach the server...'`
- Neither â†’ `'Something went wrong. Please try again.'`

### Auth Service (`src/services/auth.service.ts`)
Functions: `loginService`, `generateOtpService`, `verifyOtpService`, `registerCustomerService`, `registerTechnicianService`, `getProfileService`

---

## 4. Auth State

Redux auth slice (`src/redux/slices/authSlice.ts`):
```ts
{ user: User | null; accessToken: string | null; refreshToken: string | null; isAuthenticated: boolean }
```

Actions:
- `setCredentials({ user, accessToken, refreshToken? })` â€” writes all 3 to localStorage
- `updateTokens({ accessToken, refreshToken })` â€” called by refresh interceptor, updates both tokens in Redux + localStorage
- `logout()` â€” clears Redux + removes all 3 localStorage keys
- `updateUser(partial)` â€” patches user in Redux + localStorage

**Persistence:** All three (`accessToken`, `refreshToken`, `user`) written to localStorage on login/signup/registration. Survive page refresh and tab close.

**Bootstrap:** `ReduxProvider` (`src/redux/Provider.tsx`) contains `AuthHydrator` that reads all three from localStorage on mount and dispatches `setCredentials` if valid tokens exist.

### ApiTechnicianProfileData type (`src/types/auth.types.ts`)
Now includes `createdAt?: string` and `updatedAt?: string` â€” used by `LoginForm` to store the application submission date into `localStorage.user`.

---

## 5. Redux Store

`src/redux/store.ts` registers:
```ts
auth, services, nearbyJobs, activeJobs, support, onboarding
```

`serializableCheck: false` â€” `onboardingSlice` stores raw `File` objects for document upload.

`onboardingSlice` fields: `selfieFile`, `aadharFile`, `panFile`, `policeCertFile`, `tradeLicenseFile` (all `File | null`).

Legacy Zustand: `src/redux/legacy/bookingStore.ts` â€” active for booking flow only.

---

## 6. Admin Header â€” Dynamic Page Titles

`src/components/adminDashboard/layout/AdminHeader.tsx` uses `usePathname()` to derive the page title and subtitle from a `PAGE_META` map keyed by route. Updates automatically on every sidebar navigation.

---

## 7. Admin Services â€” Edit Service

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

`PublicRoute.tsx` â€” checks Redux `isAuthenticated` + `localStorage.user` on mount.

`AdminDashboardLayout.tsx` â€” ADMIN role guard via `localStorage.user`.

`DashboardLayout.tsx` â€” CUSTOMER role guard via `localStorage.user`.

`dashboard/technician/layout.tsx` â€” calls `getProfileService()`, uses `getTechnicianRedirectPath()`.

---

## 9. Login And Signup

**Login** (`LoginForm.tsx`):
- Accepts email or 10-digit mobile
- Writes all 3 localStorage keys; dispatches `setCredentials`
- TECHNICIAN: fetches `GET /auth/profile` â†’ stores `technicianProfile.createdAt` into `localStorage.user` â†’ `getTechnicianRedirectPath()`
- Others: `handlePostAuthRedirect(user.role)`
- Error messages distinguish CORS/network failures from credential errors

**Customer signup** (`useSignupForm.ts`):
- Phone OTP â†’ register â†’ auto-login
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

### Session Storage Keys
| Key | Contents |
|---|---|
| `registerData` | `firstName`, `lastName`, `username`, `email`, `phoneNumber`, `password` |
| `skillsEquipmentData` | `services[]`, `yearsOfExperience`, `languages[]`, `brandExpertise[]`, `hasLadder`, `hasACGauges`, `hasSafetyEquipment`, `hasVehicle`, `gst` |
| `documentUploadData` | `selfieUrl`, `aadharUrl`, `panUrl`, `policeCertUrl`, `tradeLicenseUrl` (S3 URLs after registration) |
| `serviceAreaData` | `radius`, `pincodes[]`, `latitude?`, `longitude?`, `fullAddress?`, `city?`, `state?`, `pincode?` |
| `bankDetailsData` | `payoutMethod` + either `{ upiId }` or `{ accountHolderName, accountNumber, ifscCode, bankName }` |

### Document Upload Rules
- Only **Aadhaar Card** is mandatory â€” all other documents (PAN, police verification, trade license, selfie) are optional
- Selfie is captured via camera or file upload; uses plain `<img>` tag (not Next.js `<Image>`) because `blob:` URLs are not handled by the Next.js image optimizer
- After successful registration, blob URLs in `documentUploadData` are replaced with real S3 URLs from `response.data.user.technicianProfile`

### Bank Details Rules
- Payout method is mutually exclusive: either `bank-transfer` (accountHolderName + accountNumber + ifscCode required) or `upi` (upiId required)
- Session storage stores **only** the fields for the selected method â€” never both
- Bank transfer fields appear inline inside the Payout Method card (same animated expand behaviour as UPI ID field)
- Validation runs on "Save & Continue"; blocks navigation if required fields for the chosen method are missing

### technicianProfile payload (sent to `POST /users/register`)
```json
{
  "yearsOfExperience": 5,
  "languages": ["English", "Hindi"],
  "services": [{ "serviceId": 56 }],
  "brandExpertise": [{ "brandName": "Samsung" }],
  "hasLadder": true,
  "hasACGauges": true,
  "hasSafetyEquipment": true,
  "hasVehicle": true,
  "serviceRadiusKm": 10,
  "gst": "22AAAAA0000A1Z5",          // optional â€” omitted when blank
  "upiId": "9817361209@ybl",          // OR bank transfer fields below (never both)
  "accountHolderName": "...",          // bank transfer only
  "accountNumber": "...",              // bank transfer only
  "ifscCode": "...",                   // bank transfer only
  "bankName": "",                      // bank transfer only
  "address": "123 Main Street",        // location fields â€” only when geolocation captured
  "latitude": 28.6139,
  "longitude": 77.2090,
  "city": "New Delhi",
  "state": "Delhi",
  "pincode": "110001"
}
```

**Removed from payload:** `preferredAreas` â€” no longer accepted by the backend.

### Submit Approval validation
- Blocks submission if Aadhaar Card is missing from session storage
- Blocks submission if bank/UPI details are missing or incomplete
- All other documents are optional for submission

### Pending Verification page
- **Applicant** â€” `localStorage.user.username`
- **Submitted On** â€” `localStorage.user.technicianProfile.createdAt` (formatted `Month D, YYYY`), fallback to `user.createdAt`
- **Back to Home** â€” navigates to `/technician`
- Props `applicationId` and `submittedDate` removed â€” values derived directly from localStorage

### Bitmask rules (onboarding progress)
| Bit | Step | Required |
|---|---|---|
| 0 | Register | `profile.id` |
| 1 | Skills | services + yearsOfExperience + languages |
| 2 | Documents | Aadhaar URL only (others optional) |
| 3 | Service area | `pincodes.length > 0` or location set |
| 4 | Bank | upiId OR (accountHolder + accountNumber + IFSC) |
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

The numeric `serviceId` travels via the Zustand booking store (pre-seeded in `handleBookingClick` before navigation) â€” never exposed in the URL. `UnifiedBookingPage` reads `savedServiceId` from the store, not from the URL.

Routes: `/booking?service=<slug>`, `/booking/address`, `/booking/slot`, `/booking/summary`, `/booking/confirmation`, `/dashboard/customer/booking/*`

Core files: `BookingAuthGuard.tsx`, `UnifiedBookingPage.tsx`, `DynamicServiceDetailPage.tsx`, `bookingStore.ts` (Zustand), `booking.service.ts` (empty)

Status: UI complete, booking submission API pending.

---

## 13. Services

`service.service.ts` is live. Handles: fetch-all, fetch-by-ID, create (multipart), update (JSON PATCH with specifications), delete.

Backend response shape handling: double-wrap and triple-wrap defensive parsing.

---

## 14. Service Area

- `preferredAreas` **removed** from state, session storage, API payload, and all UI â€” no longer accepted by backend
- Remaining fields: `radius`, `pincodes[]`, `latitude?`, `longitude?`, `fullAddress?`, `city?`, `state?`, `pincode?`
- `CoverageSummary` sidebar shows Service Area (km) and Pincodes count only
- `ServiceCoverageCard` (Review page) shows map + full address only â€” no areas list

---

## 15. Skills & Equipment â€” Business Details

A **Business Details** section was added at the bottom of the Skills & Equipment step (below Brand Expertise, above Equipment):
- **GST Number** (optional) â€” validated against Indian GST regex when non-empty; placeholder `22AAAAA0000A1Z5`
- Persisted in `skillsEquipmentData.gst` in session storage
- Sent as `technicianProfile.gst` (omitted from payload when blank)
- Displayed in Review & Submit under the Skills & Equipments card

---

## 16. Reference Documents

| File | Contents |
|---|---|
| `AUTH_ROTATION_CHANGES.md` | Refresh token rotation implementation |
| `AUTH_REFRESH_ROOT_CAUSE_REPORT.md` | Root cause investigation for logout bug |
| `docs/TECHNICIAN_PENDING_APPROVAL_FLOW.md` | Complete technician application lifecycle |

---

## 17. Current Gaps / Follow-up

| Area | Status |
|---|---|
| `booking.service.ts` | Empty â€” booking submission pending |
| Pending verification page | Shows real username + submission date; status still hardcoded `'pending'` |
| Technician profile save | Partially implemented |
| Customer booking detail `/bookings/[id]` | Skeleton |
| Some dashboard pages | Mock data |
| `REJECTED` technician routing | Not explicitly handled |
| Admin dashboard `/admin` 404 | Turbopack dev artefact; page.tsx exists and is correct |

---

## 18. Quick Verification

Run from `frontend/`:
```bash
pnpm lint
pnpm build
```
