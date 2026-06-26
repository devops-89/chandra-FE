# HiChandra Frontend — Master Project Context

> **Last updated:** June 26, 2026
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
- `next.config.ts` → `reactCompiler: true`, `turbopack` enabled, `allowedDevOrigins: ['192.168.1.17']`
- Google profile images whitelisted for `next/image`
- ESLint + Prettier configured; `eslint-plugin-simple-import-sort`, `eslint-plugin-unused-imports` active
- `@typescript-eslint/no-unused-vars` configured with `argsIgnorePattern: '^_'`
- `.env.local` — `NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=false` (set to `true` for production)

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
│   │   └── useOnboardingGuard.ts  # Sequential onboarding lock
│   ├── lib/                    # Utilities
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
LOGIN:               POST /auth/login
GENERATE_OTP:        POST /auth/generate-otp
VERIFY_OTP:          POST /auth/verify-otp
REGISTER_CUSTOMER:   POST /users/register
GET_ALL_SERVICES:    GET  /users/service/all
GET_SERVICE_BY_ID:   GET  /users/service/:id
CREATE_SERVICE:      POST /users/admin/service
UPDATE_SERVICE:      PATCH /users/admin/service/:id
```

### `src/services/` — REST Service Functions
| File | Status | Notes |
|---|---|---|
| `auth.service.ts` | ✅ Live | `loginService()`, `generateOtpService()`, `verifyOtpService()`, `registerCustomerService()` |
| `service.service.ts` | ✅ Live | `getAllServicesService()`, `getServiceByIdService()`, `createServiceService()`, `updateServiceApiCall()` |
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
| `authSlice` | `auth` | ✅ Live | `setCredentials`, `logout` |
| `servicesSlice` | `services` | ✅ Live | `fetchServices`, `fetchServiceById`, `createService`, `updateService` |
| `nearbyJobsSlice` | `nearbyJobs` | ✅ Wired | Mock data; `redux/selectors/nearbyJobsSelectors.ts` |
| `activeJobsSlice` | `activeJobs` | ✅ Wired | Mock data; `redux/selectors/activeJobsSelectors.ts` |
| `supportSlice` | `support` | ✅ Wired | Mock data; `redux/selectors/supportSelectors.ts` |
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
| `/login` | ✅ Complete | Real API, post-login redirect |
| `/signup` | ✅ Complete | OTP flow |
| `/services` | ✅ Complete | `GET /users/service/all` |
| `/services/[slug]` | ✅ Complete | Backend data |
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

**Base route:** `/technician/onboarding/*` (old `/technicianOnboarding/*` removed — was all redirects)

| Route | Step | Status | Notes |
|---|---|---|---|
| `/technician/onboarding/register` | 0 | ✅ Complete | Personal info + account creation |
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
| `/dashboard/technician` | ✅ Complete | Mock data — `nearbyJobs` + `activeJobs` slices |
| `/dashboard/technician/nearby-jobs` | ✅ Complete | |
| `/dashboard/technician/profile` | ❌ Skeleton | No save |


---

## 7. Onboarding Lock System

### Feature Flag
```
NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=false   # dev (all steps freely accessible)
NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=true    # production (sequential enforcement)
```

### Implementation Files

| File | Purpose |
|---|---|
| `lib/onboarding/onboardingProgress.ts` | localStorage bitmask — `markStepComplete(n)`, `isStepComplete(n)`, `firstIncompleteRoute()`, `isOnboardingComplete()`, `syncProgressFromProfile(profile)`, `clearOnboardingProgress()`, `isOnboardingLockEnabled()` |
| `hooks/useOnboardingGuard.ts` | Mount-only hook. `stepIndex: N` → redirects to `firstIncompleteRoute()` if step N-1 incomplete. `stepIndex: -1` → dashboard guard (redirects if onboarding incomplete) |

### How it works
- Progress stored as a 6-bit bitmask in `localStorage` key `technician_onboarding_progress`
- Bit 0 = Register done, bit 1 = Skills done, ..., bit 5 = Submitted
- Each step's success navigation calls `markStepComplete(stepIndex)` before routing
- On login with TECHNICIAN role: call `syncProgressFromProfile(profile)` to seed from backend
- `useOnboardingGuard({ stepIndex: N })` placed at top of each locked page component
- Dashboard layout (`app/dashboard/technician/layout.tsx`) uses `useOnboardingGuard({ stepIndex: -1 })`
- When lock disabled: hook returns immediately — zero redirect overhead

### Sidebar visual states (when lock enabled)
- **Active step** — green background (`bg-green-100`)
- **Completed step** — shows ✓ icon
- **Locked step** — non-interactive div with 🔒, `cursor-not-allowed`

---

## 8. Technician Landing Page (`/technician`)

Sections (components in `src/components/technicianLanding/`):
- `TechnicianHero` → CTA links to `/technician/onboarding/register`
- `WhyJoinSection` — 4 benefit cards
- `HowItWorksSection` — 6-step grid
- `BenefitsSection` → "Register now" links to `/technician/onboarding/register`
- `CategoriesSection` — 4 service categories (Solar, AC, Plumbing, Electrical)
- `RequirementsSection` → "Verify Now" links to `/technician/onboarding/register`
- `TestimonialsSection` — 3 partner testimonials
- `FAQSection` — accordion FAQ
- `CTASection` → "Start Registration Now" links to `/technician/onboarding/register`

All CTA links in footer (`footerContent.ts`) also point to `/technician/onboarding/register`.

---

## 9. Booking Flow — Full Detail

### Booking Steps
```
BOOKING_STEPS = ['Dynamic Form', 'Select Address', 'Select Date & Time', 'Book Service']
```

Step 0 — Dynamic Form: backend service `specifications[]` → `BookingFormField[]`
Step 1 — Address: user selects address
Step 2 — Date & Time: date + slot
Step 3 — Book Service: name / phone / instructions → submit

### Key Files
| File | Role |
|---|---|
| `hooks/useBookingAuth.ts` | Guest → `/login`. Auth → `onBookingClick()`. |
| `components/serviceDetails/DynamicServiceDetailPage.tsx` | Seeds Zustand store, routes to booking |
| `components/booking/UnifiedBookingPage.tsx` | 4-step form, reads `bookingFormFields` from store |
| `components/booking/DynamicBookingFields.tsx` | Renders `BookingFormField[]` |
| `components/booking/BookingAuthGuard.tsx` | Stores `pathname+search`, redirects unauthenticated |
| `redux/legacy/bookingStore.ts` | Zustand booking state |
| `lib/authApi/redirectUtils.ts` | `storeRedirectPath`, `handlePostAuthRedirect` |
| `components/auth/LoginForm.tsx` | Reads redirect BEFORE `dispatch`, then `router.push` |
| `components/auth/PublicRoute.tsx` | Mount-only `useEffect` guard |

---

## 10. Components Map

```
src/components/
├── auth/                 LoginForm, SignupForm (OTP), OtpModal, PublicRoute
├── common/               PublicNavbar, PublicFooter, NavbarLinks, NavbarLogo, MobileMenu
├── heroSection/          HeroSection + sub-components
├── servicesSection/      ServiceSection, ServiceGrid (linkPrefix), ServiceCard (linkPrefix)
├── serviceDetails/       DynamicServiceDetailPage (reused public + dashboard),
│                         DynamicServiceHero, DynamicServiceCTA, DynamicServiceOverview,
│                         DynamicServiceFeatures, DynamicServicePricing
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
└── technicianApplication/ (full 6-step onboarding — layout, registration steps)
    └── layout/           OnboardingLayout, OnboardingSidebar (lock-aware), OnboardingHeader
```

---

## 11. Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useBookingAuth` | Auth check for booking CTAs |
| `useOnboardingGuard` | Sequential onboarding lock — mount-only, flag-gated |
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

## 12. Lib / Utilities (`src/lib/`)

| Path | Purpose |
|---|---|
| `lib/authApi/redirectUtils.ts` | `storeRedirectPath`, `getAndClearRedirectPath`, `handlePostAuthRedirect`, `getDashboardPathForRole` |
| `lib/onboarding/onboardingProgress.ts` | Onboarding progress bitmask — `markStepComplete`, `isStepComplete`, `firstIncompleteRoute`, `isOnboardingComplete`, `syncProgressFromProfile`, `isOnboardingLockEnabled` |
| `lib/booking/formatBookingData.ts` | Formats booking store data for display |
| `lib/pricing/calculateACPrice.ts` | AC dynamic pricing |
| `lib/pricing/calculateSolarPrice.ts` | Solar pricing |
| `lib/utils/addressUtils.ts` | Address selection helpers |
| `lib/validation/bookingValidation.ts` | Booking form validation |
| `lib/validation/fileValidation.ts` | File upload validation |
| `lib/validator/` | email, password, phone, pincode, signup validators |


---

## 13. Key Types (`src/types/`)

| File | Key Types |
|---|---|
| `types/services.types.ts` | `Service`, `BookingFormField`, `BookingFormData`, `ServiceCardProps` |
| `types/auth.types.ts` | `User`, `LoginRequest/Response`, `SignupFormData`, OTP types, `CustomerAddress` |
| `types/bookingTypes/bookingForm.types.ts` | `UnifiedBookingPageProps`, `TimeSlots`, `BookingStep`, `AddressOption` |
| `types/admin/service.types.ts` | `AdminService`, `ApiService`, `ApiPricingRule`, `ApiSpecification`, `CreateServiceRequest`, `UpdateServiceRequest` |
| `types/admin.types.ts` | `DashboardStat`, `Technician`, `ActiveJob`, `AdminProfile` |
| `types/technicianDashboard/nearbyJobs.types.ts` | `NearbyJob`, `NearbyJobsState` |
| `types/technicianApplication/` | 8 files: `personalInfo`, `skillTagging`, `toolInventory`, `documentUpload`, `bankDetails`, `reviewSubmit`, `onboarding`, `verification` |
| `types/technicianOnboarding/serviceArea.types.ts` | `ServiceAreaState`, `AreaOption`, component prop types |

---

## 14. Constants & Mock Data (`src/constants/`)

| Folder | Contents |
|---|---|
| `constants/services/serviceData.ts` | Legacy 4-service mock — **no longer imported** |
| `constants/admin/` | 15 files: bookings, customers, technicians, complaints, reviews, finance |
| `constants/customerDashboard/` | activeBooking, invoices, recentBookings, reviews, favourites, stats |
| `constants/booking/` | savedAddresses, timeSlots, BOOKING_STEPS |
| `constants/technicianDashboard/` | `MOCK_NEARBY_JOBS`, `MOCK_ACTIVE_JOB` |
| `constants/technicianApplication/` | documentUpload, **onboardingSteps** (labels), serviceAreaOptions, skillTagging |
| `constants/footer/footerContent.ts` | Footer links — Register as Technician → `/technician/onboarding/register` |

### `onboardingSteps` labels
```ts
["Register", "Skill Tagging", "Document Upload", "Service Area", "Bank Details", "Review & Submit"]
```

---

## 15. What's Complete vs Pending

### ✅ Completed (June 26, 2026)

**Technician Landing Page (`/technician`):**
- Full marketing page with 9 sections
- All CTAs → `/technician/onboarding/register`
- Footer "Register as Technician" → `/technician/onboarding/register`

**Onboarding route migration (`/technicianOnboarding/*` → `/technician/onboarding/*`):**
- All 7 step pages moved to new path
- Old folder entirely removed (was all redirects)
- All navigation, sidebar, back buttons, edit handlers updated
- Sidebar step 0 label: "Personal Info" → "Register"

**Onboarding lock system:**
- `lib/onboarding/onboardingProgress.ts` — localStorage bitmask progress
- `hooks/useOnboardingGuard.ts` — mount-only sequential lock
- `NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK` feature flag in `.env.local`
- `markStepComplete(N)` wired into every step's success navigation
- `useOnboardingGuard({ stepIndex: N })` on steps 1–5 pages
- Dashboard layout protected with `useOnboardingGuard({ stepIndex: -1 })`
- Sidebar shows locked (🔒) / completed (✓) states when lock enabled

**Redux store fixes:**
- `nearbyJobsSlice`, `activeJobsSlice`, `supportSlice` all registered (fixed technician dashboard 500s)

**Dynamic booking form:**
- `ApiSpecification` interface + `specifications[]` on `AdminService`
- `specToBookingField()` in `service.service.ts`
- `bookingFormFields` in Zustand bookingStore
- `DynamicBookingFields` + `DynamicFieldRenderer` components
- `UnifiedBookingPage` reads fields from store, falls back to default

### 🔶 In Progress / Partial
- `/technician/onboarding/pending-verification` — status hardcoded to `'pending'`
- `ServiceContext` — in-memory CRUD, no API persistence
- Admin service edit/delete not wired to API
- RTK Query services (`authApi`, `bookingApi`, `serviceApi`, `userApi`) — empty files

### ❌ Pending / Skeleton
- `/dashboard/customer/bookings/[id]` — no booking detail content
- `/dashboard/technician/profile` — disabled inputs, no save
- `src/services/booking.service.ts` — completely empty
- Booking submission API integration (POST + `serviceSpecifications[]`)
- All other non-auth API integration (bookings, profile, technicians)
- Technician auth guard (`role === 'TECHNICIAN'`)
- `syncProgressFromProfile()` — not yet called on TECHNICIAN login (no backend profile fetch)

### ⚠️ Dead Code (safe to delete)
- `src/dashboard/` — abandoned earlier architecture
- `redux/legacy/customerDashboardStore.ts` — empty
- `redux/legacy/useSidebarStore.ts` — empty
- `constants/services/serviceData.ts` — no longer imported

---

## 16. Next Development Priorities

1. **Booking submission API** — POST booking; send `serviceSpecifications[]` from `dynamicFormData`
2. **Technician auth guard** — `role === 'TECHNICIAN'` check on `/dashboard/technician/*`
3. **Technician profile API** — `GET /users/technician/profile` → call `syncProgressFromProfile()` on TECHNICIAN login
4. **Pending verification** — wire real status from backend profile
5. **Customer booking detail** — `/dashboard/customer/bookings/[id]`
6. **Admin service edit/delete API** — `PATCH` + `DELETE /users/admin/service/:id`
7. **Technician profile save** — enable edit + save on `/dashboard/technician/profile`
8. **Clean up dead code** — `src/dashboard/`, empty Zustand files, `serviceData.ts`

---

## 17. Development Notes

- **Redux store** — always register new slices in `src/redux/store.ts`. Missing registration → runtime `TypeError: Cannot read properties of undefined`.
- **Auth guards all mount-only** — empty `useEffect` deps `[]` prevents interference with login navigation.
- **`useOnboardingGuard`** — mount-only, same pattern. Flag-gated: when `NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK=false` the hook is a no-op.
- **Onboarding progress** — stored as 6-bit localStorage bitmask. Bit N set = step N complete. On login: call `syncProgressFromProfile(profile)` to seed from backend.
- **Post-login redirect** — `sessionStorage` via `lib/authApi/redirectUtils.ts`. `LoginForm` reads BEFORE `dispatch(setCredentials(...))`.
- **`BookingAuthGuard`** stores full URL (`pathname + search`) before redirecting unauthenticated users.
- **`bookingStore.ts` (Zustand)** — active booking state. `bookingFormFields[]` seeded from backend `specifications[]`.
- **Dynamic form fallback** — empty `bookingFormFields` → show `serviceDescription` (textarea) + `photos` (multi-file).
- **`DynamicServiceDetailPage`** — pure component. `bookingBasePath` prop: `/booking` (public) or `/dashboard/customer/booking` (dashboard).
- **`ServiceGrid` + `ServiceCard` `linkPrefix`** — default `/services`. Dashboard uses `/dashboard/customer/services`.
- **Slug generation** — `name.toLowerCase().replace(/\s+/g, '-')`. Consistent everywhere.
- **Tailwind v4** — `@import "tailwindcss"` + `@theme inline { ... }`. No `tailwind.config.js`. Use `bg-linear-to-*` not `bg-gradient-to-*`.
- **MUI + Tailwind** — MUI for tables/drawers/modals, Tailwind for layout.
- **pnpm** — always use `pnpm`, never npm or yarn.
- **ESLint** — unused params prefixed `_`, escape HTML entities in JSX.

---

*Update this file whenever a module status changes, a new route is added, or an API is integrated.*
