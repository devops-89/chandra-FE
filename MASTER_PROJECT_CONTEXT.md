# HiChandra Frontend — Master Project Context

> **Last updated:** July 1, 2026
> **Purpose:** Permanent handoff document. Paste this file into any new chat to restore full project context instantly.

---

## 1. Project Overview

**HiChandra** is a home-services platform (think Urban Company / Housejoy) that connects customers with technicians for services like AC servicing, solar panel cleaning, electrical, and plumbing.

The frontend is a **UI-complete** Next.js app. Auth API integration is live. Services listing + detail are backend-integrated. Booking flow UI is complete (API submission pending). The current phase is **backend integration**.

**Three user roles:**
1. **Customer** — browses services, books appointments, manages profile
2. **Technician** — receives and manages jobs, onboards via a multi-step flow
3. **Admin** — manages all bookings, complaints, technicians, finance, services

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| React | 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline` tokens) |
| UI Library | MUI v9 (`@mui/material`, `@mui/icons-material`, `@emotion`) |
| Icons | Lucide React + Material Symbols (Google Fonts CDN) |
| Animations | Framer Motion v12 |
| State Management | Redux Toolkit (RTK) + Zustand (legacy booking store) |
| HTTP Client | Axios (via `src/api/axios.ts`) |
| Package Manager | pnpm |
| React Compiler | Enabled (`babel-plugin-react-compiler 1.0.0`) |
| Fonts | Geist + Geist Mono (`next/font/google`) |

**Config notes:**
- `next.config.ts` → `reactCompiler: true`, `turbopack` enabled, `allowedDevOrigins: ['192.168.1.45']`
- S3 images use `unoptimized={true}` on `<Image>` to bypass Next.js server-side proxy timeout
- ESLint + Prettier configured; `eslint-plugin-simple-import-sort`, `eslint-plugin-unused-imports` active
- `@typescript-eslint/no-unused-vars` configured with `argsIgnorePattern: '^_'`
- `.env.local` — `NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=true` (set to `false` for dev)
- API base URLs split: auth service `http://192.168.1.37:8000/api`, user service `http://192.168.1.37:8001/api`


---

## 3. Project Structure

```
frontend/
├── src/
│   ├── api/                    # Axios instance + API endpoint constants
│   ├── app/                    # Next.js App Router pages
│   │   ├── technician/         # /technician landing + /technician/onboarding/* steps
│   │   └── dashboard/technician/ # Technician dashboard (guarded)
│   ├── components/             # All UI components (deeply nested by domain)
│   │   └── technicianLanding/  # TechnicianHero, WhyJoinSection, HowItWorksSection, etc.
│   ├── constants/              # All mock data
│   ├── data/                   # Additional mock datasets
│   ├── hooks/                  # Custom React hooks
│   │   └── useOnboardingGuard.ts  # Sequential onboarding lock + backend profile re-sync
│   ├── lib/                    # Utilities
│   │   ├── authApi/redirectUtils.ts          # Post-auth redirects + getTechnicianRedirectPath
│   │   └── onboarding/onboardingProgress.ts  # Progress bitmask (localStorage)
│   ├── redux/                  # Redux Toolkit store + slices
│   ├── services/               # REST service functions
│   ├── styles/                 # dashboard.css, mui-theme.ts
│   └── types/                  # TypeScript type definitions
```

---

## 4. API Layer

### Endpoints (`src/api/endpoints.ts`)

```ts
// Auth service (port 8000)
LOGIN:               POST /auth/login
GENERATE_OTP:        POST /auth/generate-otp
VERIFY_OTP:          POST /auth/verify-otp
GET_PROFILE:         GET  /auth/profile

// User service (port 8001)
REGISTER_CUSTOMER:   POST /users/register
REGISTER_TECHNICIAN: POST /users/register   (same endpoint, no customerAddress = TECHNICIAN)
GET_ALL_SERVICES:    GET  /users/service/all
GET_SERVICE_BY_ID:   GET  /users/service/:id
CREATE_SERVICE:      POST /users/admin/service
UPDATE_SERVICE:      PATCH /users/update/service/:id
DELETE_SERVICE:      DELETE /users/delete/service/:id
```

### `src/services/` — REST Service Functions
| File | Status | Notes |
|---|---|---|
| `auth.service.ts` | ✅ Live | `loginService`, `generateOtpService`, `verifyOtpService`, `registerCustomerService`, `registerTechnicianService`, `getProfileService` |
| `service.service.ts` | ✅ Live | `getAllServicesService`, `getServiceByIdService`, `createServiceService`, `updateServiceApiCall`, `deleteServiceApiCall` |
| `booking.service.ts` | ❌ Empty | No implementation yet |

---

## 5. State Management

### Redux Store (`src/redux/store.ts`)
```ts
configureStore({
  reducer: {
    auth:       authReducer,
    services:   servicesReducer,
    nearbyJobs: nearbyJobsReducer,
    activeJobs: activeJobsReducer,
    support:    supportReducer,
  }
})
```

### Slices
| Slice | Store Key | Status | Notes |
|---|---|---|---|
| `authSlice` | `auth` | ✅ Live | `setCredentials`, `logout`. `User` type includes optional `status?: string` |
| `servicesSlice` | `services` | ✅ Live | `fetchServices`, `fetchServiceById`, `createService`, `updateService` |
| `nearbyJobsSlice` | `nearbyJobs` | ✅ Wired | Mock data |
| `activeJobsSlice` | `activeJobs` | ✅ Wired | Mock data |
| `supportSlice` | `support` | ✅ Wired | Mock data |
| `bookingSlice` | — | 🔶 Scaffolded | Not wired |
| `onboardingSlice` | — | 🔶 Scaffolded | Not wired |
| `activitySlice` | — | 🔶 Scaffolded | Not wired |
| `dashboardStatsSlice` | — | 🔶 Scaffolded | Not wired |
| `loyaltySlice` | — | 🔶 Scaffolded | Not wired |
| `performanceSlice` | — | 🔶 Scaffolded | Not wired |

### Legacy Zustand (`src/redux/legacy/`)
| File | Status | Notes |
|---|---|---|
| `bookingStore.ts` | ✅ **Active** | Fields: `service`, `serviceId`, `serviceSlug`, `servicePrice`, `serviceSpecificData`, `bookingFormFields`, `name`, `phone`, `address`, `date`, `slot`, `instructions` |
| `customerDashboardStore.ts` | ❌ Empty | Never implemented |
| `useSidebarStore.ts` | ❌ Empty | Never implemented |

---

## 6. Routes & Status

### Public

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Complete | `PublicRoute` guard |
| `/login` | ✅ Complete | Real API, post-login redirect. TECHNICIAN → `getTechnicianRedirectPath()` |
| `/signup` | ✅ Complete | OTP flow |
| `/services` | ✅ Complete | `GET /users/service/all` |
| `/services/[slug]` | ✅ Complete | Backend data, S3 images unoptimized |
| `/technician` | ✅ Complete | Landing page for technician recruitment |

### Booking Flow

| Route | Status | Notes |
|---|---|---|
| `/booking?serviceId=N` | ✅ Complete | `BookingAuthGuard` + `UnifiedBookingPage`. 4 steps. |
| `/booking/summary` | ✅ Complete | Zustand store |
| `/booking/confirmation` | ✅ Complete | Zustand store |

### Customer Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/customer` | ✅ Complete | Stats, active booking |
| `/dashboard/customer/services` | ✅ Complete | Backend service grid |
| `/dashboard/customer/services/[slug]` | ✅ Complete | `DynamicServiceDetailPage` inside `DashboardLayout` |
| `/dashboard/customer/booking?serviceId=N` | ✅ Complete | `UnifiedBookingPage` inside dashboard |
| `/dashboard/customer/booking/summary` | ✅ Complete | Inside dashboard |
| `/dashboard/customer/booking/confirmation` | ✅ Complete | Inside dashboard |
| `/dashboard/customer/bookings` | ✅ Complete | Mock data |
| `/dashboard/customer/bookings/[id]` | ❌ Skeleton | No detail content |
| `/dashboard/customer/addresses` | ✅ Complete | |
| `/dashboard/customer/invoices` | ✅ Complete | |
| `/dashboard/customer/profile` | ✅ Complete | |
| `/dashboard/customer/support` | ✅ Complete | |

### Admin Dashboard

| Route | Status |
|---|---|
| `/dashboard/admin` | ✅ Complete |
| `/dashboard/admin/bookings` | ✅ Complete |
| `/dashboard/admin/complaints` | ✅ Complete |
| `/dashboard/admin/customers` | ✅ Complete |
| `/dashboard/admin/technicians` | ✅ Complete |
| `/dashboard/admin/services` | ✅ Complete |
| `/dashboard/admin/services/add` | ✅ Complete |
| `/dashboard/admin/finance` | ✅ Complete |
| `/dashboard/admin/reviews` | ✅ Complete |

### Technician Onboarding

**Base route:** `/technician/onboarding/*`

| Route | Step | Status | Notes |
|---|---|---|---|
| `/technician/onboarding/register` | 0 | ✅ Complete | Personal info + OTP flow + account creation |
| `/technician/onboarding/skill-tagging` | 1 | ✅ Complete | Skills, level, brand expertise |
| `/technician/onboarding/document-upload` | 2 | ✅ Complete | Selfie + 5 documents |
| `/technician/onboarding/service-area` | 3 | ✅ Complete | Radius, areas, pincodes |
| `/technician/onboarding/bank-details` | 4 | ✅ Complete | Account + IFSC + payout method |
| `/technician/onboarding/review-submit` | 5 | ✅ Complete | Review all + final submit |
| `/technician/onboarding/pending-verification` | — | ✅ Complete | Status page (hardcoded `'pending'`) |

**Sidebar step labels:** Register → Skill Tagging → Document Upload → Service Area → Bank Details → Review & Submit

### Technician Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/technician` | ✅ Complete | Mock data — guarded by `useOnboardingGuard({ stepIndex: -1 })` |
| `/dashboard/technician/nearby-jobs` | ✅ Complete | |
| `/dashboard/technician/profile` | ❌ Skeleton | No save |


---

## 7. Technician Auth + Onboarding Flow

### Step 1 — Register (`/technician/onboarding/register`)

**OTP Flow:**
1. User fills firstName, lastName, username, phone, email, password
2. "Send OTP" → `POST /auth/generate-otp` `{ email, phone, role: "TECHNICIAN" }`
3. OTP input appears (AnimatePresence slide-in)
4. "Verify OTP" → `POST /auth/verify-otp` `{ email, phone, otp }`
5. `otpVerified = true` → "Create Account" button enables
6. "Create Account" → `POST /users/register` multipart/form-data
7. Tokens + user stored → `setCredentials` dispatched → `markStepComplete(0)` → navigate to skill-tagging

**Form fields removed:** `MobileVerificationCard`, `EmailVerificationCard` (not in API)
**Form fields split:** `fullName` → `firstName` + `lastName` + `username`
**Old validation file deleted:** `src/utils/validation/personalInfoValidation.ts`

### Login Redirect (TECHNICIAN)

After TECHNICIAN login, `LoginForm`:
1. Stores tokens → dispatches `setCredentials`
2. Calls `GET /auth/profile` (always, on every login)
3. Calls `getTechnicianRedirectPath({ userStatus, technicianProfile })`

**Redirect rules:**
| Condition | Destination |
|---|---|
| `technicianProfile === null` | `/technician/onboarding/register` |
| `profile.status === 'PENDING_APPROVAL'` | `/technician/onboarding/pending-verification` |
| `profile.isVerified` OR (`userStatus === 'ACTIVE'` AND onboarding complete) | `/dashboard/technician` |
| `profile.status === 'INCOMPLETE'` | `firstIncompleteRoute()` |
| Fallback | `/dashboard/technician` |

`syncProgressFromProfile()` is ALWAYS called (not just on INCOMPLETE) — this overwrites any stale localStorage bitmask.

---

## 8. Onboarding Lock System

### Feature Flag
```
NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=false   # dev (all steps freely accessible)
NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=true    # production (sequential enforcement)
```

### Implementation Files

| File | Purpose |
|---|---|
| `lib/onboarding/onboardingProgress.ts` | 6-bit localStorage bitmask. `markStepComplete(n)`, `isStepComplete(n)`, `firstIncompleteRoute()`, `isOnboardingComplete()`, `syncProgressFromProfile(profile)`, `clearOnboardingProgress()`, `isOnboardingLockEnabled()` |
| `hooks/useOnboardingGuard.ts` | Mount-only hook. Detects missing/stale bitmask (null or 0 with token present), fetches `GET /auth/profile`, re-syncs bitmask, then redirects to `firstIncompleteRoute()` if needed. `stepIndex: -1` = dashboard guard |

### Bitmask rules (from `syncProgressFromProfile`)
```
Bit 0 — Register:        profile.id exists
Bit 1 — Skill Tagging:   profile.skills.length > 0
Bit 2 — Document Upload: ALL 5 URLs non-null (aadharUrl, panUrl, policeCertUrl, tradeLicenseUrl, selfieUrl)
Bit 3 — Service Area:    profile.serviceAreas.length > 0
Bit 4 — Bank Details:    accountHolderName + accountNumber + ifscCode all present
Bit 5 — Submitted:       profile.status === 'PENDING_APPROVAL'
```

### localStorage recovery (key use-case)
When a technician clears localStorage (Application tab → Clear):
1. Page mounts → `useOnboardingGuard` runs
2. `needsSync()` = bitmask key is `null` OR bitmask is `0` AND `accessToken` exists → `true`
3. `GET /auth/profile` fetched → `syncProgressFromProfile()` rebuilds bitmask from backend
4. Guard redirects to `firstIncompleteRoute()` — technician resumes exactly where they left off

### Sidebar visual states (lock enabled)
- **Active step** — green background
- **Completed step** — shows ✓ icon
- **Locked step** — non-interactive div with 🔒

---

## 9. Technician Landing Page (`/technician`)

Sections: `TechnicianHero`, `WhyJoinSection`, `HowItWorksSection`, `BenefitsSection`, `CategoriesSection`, `RequirementsSection`, `TestimonialsSection`, `FAQSection`, `CTASection`

All CTAs + footer "Register as Technician" → `/technician/onboarding/register`

---

## 10. Booking Flow

### Booking Steps
```
BOOKING_STEPS = ['Dynamic Form', 'Select Address', 'Select Date & Time', 'Book Service']
```

Step 0 — Dynamic Form: `specifications[]` → `BookingFormField[]` (fallback: description + photos)
Step 1 — Address: user selects address
Step 2 — Date & Time: date + slot
Step 3 — Book Service: name / phone / instructions → submit

### Key Files
| File | Role |
|---|---|
| `hooks/useBookingAuth.ts` | Guest → `/login`. Auth → `onBookingClick()`. |
| `components/serviceDetails/DynamicServiceDetailPage.tsx` | Seeds Zustand store, routes to booking |
| `components/booking/UnifiedBookingPage.tsx` | 4-step form, reads `bookingFormFields` from store |
| `components/booking/BookingAuthGuard.tsx` | Stores `pathname+search`, redirects unauthenticated |
| `redux/legacy/bookingStore.ts` | Zustand booking state |
| `lib/authApi/redirectUtils.ts` | `handlePostAuthRedirect`, `getTechnicianRedirectPath` |
| `components/auth/LoginForm.tsx` | TECHNICIAN: fetches profile → `getTechnicianRedirectPath`. Others: `handlePostAuthRedirect`. |

---

## 11. Components Map

```
src/components/
├── auth/                 LoginForm, SignupForm (OTP), OtpModal, PublicRoute
├── common/               PublicNavbar, PublicFooter, NavbarLinks, NavbarLogo, MobileMenu
├── heroSection/          HeroSection + sub-components
├── servicesSection/      ServiceSection, ServiceGrid (linkPrefix), ServiceCard (linkPrefix)
├── serviceDetails/       DynamicServiceDetailPage, DynamicServiceHero, DynamicServiceCTA,
│                         DynamicServiceOverview, DynamicServiceFeatures, DynamicServicePricing
├── booking/              UnifiedBookingPage, BookingAuthGuard, BookingSummary,
│                         BookingConfirmation, BookingStepper,
│                         DynamicBookingFields, DynamicFieldRenderer,
│                         AddressSelector, TimeSlotSelector, BookingDetailsForm
├── technicianLanding/    TechnicianHero, WhyJoinSection, HowItWorksSection,
│                         BenefitsSection, CategoriesSection, RequirementsSection,
│                         TestimonialsSection, FAQSection, CTASection
├── customerDashboard/
│   ├── layout/           DashboardLayout, DashboardHeader, DashboardSidebar
│   └── ...               (overview, bookings, addresses, invoices, profile, support)
├── adminDashboard/       (layout, dashboard, bookings, complaints, customers,
│                          finance, reviews, services, technicians)
├── technicianDashboard/  (dashboard, nearby-jobs, active-jobs, earnings, jobs, profile)
└── technicianApplication/ (6-step onboarding)
    ├── layout/           OnboardingLayout, OnboardingSidebar (lock-aware), OnboardingHeader
    └── registration/
        ├── personalInfo/   PersonalInfoForm, BasicInfoFields, EmailAndPasswordFields,
        │                   ContinueButton, TermsAndPrivacy, hooks/usePersonalInfoForm
        ├── skillTagging/   SkillTaggingPage, SkillGrid, SkillLevelSelector,
        │                   BrandExpertiseInput, SkillTaggingFooter
        ├── documentUpload/ DocumentUploadPage, DocumentUploadGrid, SelfieVerificationCard,
        │                   DocumentUploadFooter, UploadHelpCard
        ├── serviceArea/    ServiceArea, AreaSelector, PreferredAreasInput, PincodeMapping,
        │                   CoverageSummary, ServiceAreaFooter, hooks/useServiceArea
        ├── bankDetails/    BankDetailsSection, AccountInformationCard, BankDetailsFooter,
        │                   AutoDetectedBankInfo, PayoutMethodCard, SecurityBanner,
        │                   VerificationDocumentsCard
        └── reviewSubmit/   ReviewSubmit, ProfileSummaryCard, SkillsSummaryCard,
                            VerificationSummaryCard, ServiceCoverageCard, LaunchSection,
                            hooks/useReviewSubmit
```

---

## 12. Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useBookingAuth` | Auth check for booking CTAs |
| `useOnboardingGuard` | Sequential onboarding lock — mount-only, flag-gated, backend re-sync |
| `useSignupForm` | Signup + OTP flow |
| `useFormValidation` | Generic form validation |
| `useActiveBooking` | Customer dashboard active booking (mock) |
| `useFavoriteTechnicians` | Customer dashboard favorites (mock) |
| `useInvoices` | Customer invoices (mock) |
| `useLatestReview` | Latest review (mock) |
| `useRecentBookings` | Recent bookings (mock) |
| `useCategoryManager` | Admin category CRUD |
| `useServiceManager` | Admin service CRUD |

---

## 13. Lib / Utilities (`src/lib/`)

| Path | Purpose |
|---|---|
| `lib/authApi/redirectUtils.ts` | `storeRedirectPath`, `getAndClearRedirectPath`, `handlePostAuthRedirect`, `getDashboardPathForRole`, `getTechnicianRedirectPath` |
| `lib/onboarding/onboardingProgress.ts` | 6-bit bitmask — `markStepComplete`, `isStepComplete`, `firstIncompleteRoute`, `isOnboardingComplete`, `syncProgressFromProfile`, `isOnboardingLockEnabled` |
| `lib/booking/formatBookingData.ts` | Formats booking store data |
| `lib/pricing/calculateACPrice.ts` | AC dynamic pricing |
| `lib/pricing/calculateSolarPrice.ts` | Solar pricing |
| `lib/utils/addressUtils.ts` | Address selection helpers |
| `lib/validation/bookingValidation.ts` | Booking form validation |
| `lib/validation/fileValidation.ts` | File upload validation |
| `lib/validator/` | email, password, phone, pincode, signup validators |

---

## 14. Key Types (`src/types/`)

| File | Key Types |
|---|---|
| `types/auth.types.ts` | `User` (includes `status?: string`), `LoginRequest/Response`, `RegisterTechnicianRequest/Response`, `GenerateOtpRequest` (role: CUSTOMER\|TECHNICIAN), `GetProfileResponse`, `ApiTechnicianProfileData`, `ApiTechnicianSkillEntry`, `ApiServiceArea` |
| `types/services.types.ts` | `Service`, `BookingFormField`, `BookingFormData`, `ServiceCardProps` |
| `types/bookingTypes/bookingForm.types.ts` | `UnifiedBookingPageProps`, `TimeSlots`, `BookingStep`, `AddressOption` |
| `types/admin/service.types.ts` | `AdminService`, `ApiService`, `ApiPricingRule`, `ApiSpecification`, `CreateServiceRequest`, `UpdateServiceRequest` |
| `types/admin.types.ts` | `DashboardStat`, `Technician`, `ActiveJob`, `AdminProfile` |
| `types/technicianDashboard/nearbyJobs.types.ts` | `NearbyJob`, `NearbyJobsState` |
| `types/technicianApplication/personalInfo.types.ts` | `PersonalInfoFormData` (firstName, lastName, username, phoneNumber, email, password), `ValidationErrors` |
| `types/technicianApplication/` | 7 more files covering skillTagging, toolInventory, documentUpload, bankDetails, reviewSubmit, onboarding, verification |
| `types/technicianOnboarding/serviceArea.types.ts` | `ServiceAreaState`, `AreaOption`, component prop types |

---

## 15. Constants & Mock Data (`src/constants/`)

| Folder | Contents |
|---|---|
| `constants/services/serviceData.ts` | Legacy 4-service mock — **no longer imported** |
| `constants/admin/` | 15 files: bookings, customers, technicians, complaints, reviews, finance |
| `constants/customerDashboard/` | activeBooking, invoices, recentBookings, reviews, favourites, stats |
| `constants/booking/` | savedAddresses, timeSlots, BOOKING_STEPS |
| `constants/technicianDashboard/` | `MOCK_NEARBY_JOBS`, `MOCK_ACTIVE_JOB` |
| `constants/technicianApplication/onboardingSteps.ts` | `["Register", "Skill Tagging", "Document Upload", "Service Area", "Bank Details", "Review & Submit"]` |
| `constants/footer/footerContent.ts` | Footer links — Register as Technician → `/technician/onboarding/register` |

---

## 16. What's Complete vs Pending

### ✅ Completed (July 1, 2026)

**Technician Register — OTP flow:**
- `GenerateOtpRequest.role` widened to `'CUSTOMER' | 'TECHNICIAN'`
- `User` type extended with `status?: string`
- `RegisterTechnicianRequest/Response`, `GetProfileResponse`, `ApiTechnicianProfileData` types added
- `getProfileService()` added to `auth.service.ts`
- `GET_PROFILE: '/auth/profile'` endpoint added
- Step 1 form: `fullName` split into `firstName` + `lastName` + `username`; OTP verification (Send OTP → Enter OTP → Verify → Create Account); `MobileVerificationCard` and `EmailVerificationCard` removed; old `personalInfoValidation.ts` deleted
- `usePersonalInfoForm` hook: `handleSendOtp`, `handleVerifyOtp`, `handleRegister`; `otpSent`, `otpVerified` state; Create Account disabled until OTP verified

**Technician login redirect:**
- `getTechnicianRedirectPath()` in `redirectUtils.ts` — routes by profile status
- `syncProgressFromProfile()` always called on TECHNICIAN login to overwrite stale bitmask
- `LoginForm` fetches `GET /auth/profile` for TECHNICIAN after login; non-TECHNICIAN path unchanged

**localStorage recovery:**
- `useOnboardingGuard` detects `bitmask === null OR (bitmask === 0 AND token exists)`
- Fetches `GET /auth/profile` → `syncProgressFromProfile()` → re-evaluates guard
- Technicians never forced to restart completed steps after storage clear

**Image loading fix:**
- `ServiceImage.tsx` + `DynamicServiceHero.tsx`: `unoptimized={isExternalUrl}` bypasses 7s server-side S3 fetch timeout
- `next.config.ts`: `minimumCacheTTL: 3600` added

### 🔶 In Progress / Partial
- `/technician/onboarding/pending-verification` — status hardcoded to `'pending'`
- RTK Query services — empty files

### ❌ Pending / Skeleton
- `/dashboard/customer/bookings/[id]` — no booking detail content
- `/dashboard/technician/profile` — disabled inputs, no save
- `src/services/booking.service.ts` — completely empty
- Booking submission API integration (POST + `serviceSpecifications[]`)
- Technician auth guard (`role === 'TECHNICIAN'` on dashboard routes)
- Remaining non-auth API integration

### ⚠️ Dead Code (safe to delete)
- `src/dashboard/` — abandoned earlier architecture
- `redux/legacy/customerDashboardStore.ts` — empty
- `redux/legacy/useSidebarStore.ts` — empty
- `constants/services/serviceData.ts` — no longer imported
- `src/utils/validation/personalInfoValidation.ts` — deleted (replaced by inline validators in hook)

---

## 17. Next Development Priorities

1. **Booking submission API** — POST booking; send `serviceSpecifications[]` from `dynamicFormData`
2. **Technician auth guard** — `role === 'TECHNICIAN'` check on `/dashboard/technician/*`
3. **Pending verification** — wire real backend status/details into the status page
4. **Technician profile save** — enable edit + save on `/dashboard/technician/profile`
5. **Customer booking detail** — `/dashboard/customer/bookings/[id]`
6. **Clean up dead code** — `src/dashboard/`, empty Zustand files, `serviceData.ts`

---

## 18. Development Notes

- **Redux store** — always register new slices in `src/redux/store.ts`. Missing → runtime TypeError.
- **Auth guards mount-only** — empty `useEffect` deps `[]` prevents racing with login navigation.
- **`useOnboardingGuard`** — flag-gated; when lock enabled and bitmask is missing/0+token exists, fetches profile and re-syncs before guarding. `stepIndex: -1` = dashboard mode.
- **Onboarding bitmask** — 6-bit localStorage. Bit N = step N complete. `syncProgressFromProfile()` called on login AND by guard when stale. localStorage.clear() never forces restart.
- **TECHNICIAN login** — always calls `GET /auth/profile` → `getTechnicianRedirectPath()`. Non-TECHNICIAN uses `handlePostAuthRedirect()` only.
- **`User.status`** — now optional in the type. Login response may or may not include it; `GET /auth/profile` response always has it.
- **OTP flow (register)** — Send OTP → Verify OTP → then Create Account enabled. Changing email or phone after OTP sent resets OTP state.
- **S3 images** — use `unoptimized={src.startsWith('http')}` on `<Image>` for all backend-served images to avoid Next.js proxy timeout.
- **Post-login redirect** — `sessionStorage` via `redirectUtils.ts`. `LoginForm` reads BEFORE `dispatch(setCredentials(...))`.
- **`bookingStore.ts` (Zustand)** — active booking state. `bookingFormFields[]` seeded from backend `specifications[]`.
- **Slug generation** — `name.toLowerCase().replace(/\s+/g, '-')`. Consistent everywhere.
- **Tailwind v4** — `bg-linear-to-*` not `bg-gradient-to-*`. No `tailwind.config.js`.
- **MUI + Tailwind** — MUI for tables/drawers/modals, Tailwind for layout.
- **pnpm** — always use `pnpm`, never npm or yarn.
- **ESLint** — unused params prefixed `_`, escape HTML entities in JSX.

---

*Update this file whenever a module status changes, a new route is added, or an API is integrated.*
