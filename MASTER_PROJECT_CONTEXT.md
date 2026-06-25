# HiChandra Frontend — Master Project Context

> **Last updated:** June 25, 2026
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

---

## 3. Project Structure

```
frontend/
├── src/
│   ├── api/                    # Axios instance + API endpoint constants
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # All UI components (deeply nested by domain)
│   ├── constants/              # All mock data (current "backend" for non-auth/non-services modules)
│   ├── data/                   # Additional mock datasets
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities (validation, pricing, auth redirects)
│   ├── redux/                  # Redux Toolkit store, slices, RTK Query services
│   │   ├── slices/             # authSlice, servicesSlice, bookingSlice, onboardingSlice,
│   │   │                       #   nearbyJobsSlice, activeJobsSlice, supportSlice,
│   │   │                       #   activitySlice, dashboardStatsSlice, loyaltySlice,
│   │   │                       #   onboardingSlice, performanceSlice
│   │   ├── selectors/          # nearbyJobsSelectors, activeJobsSelectors, supportSelectors
│   │   ├── services/           # authApi, bookingApi, serviceApi, userApi (RTK Query — empty)
│   │   ├── legacy/             # bookingStore (Zustand, active), customerDashboardStore, useSidebarStore
│   │   ├── store.ts            # configureStore — all active reducers wired
│   │   ├── hooks.ts            # useAppDispatch / useAppSelector typed hooks
│   │   ├── Provider.tsx        # <Provider store={store}> wrapper
│   │   └── ServiceContext.tsx  # Admin service CRUD React Context (in-memory)
│   ├── services/               # REST service functions (Axios calls)
│   ├── styles/                 # dashboard.css, mui-theme.ts
│   ├── types/                  # TypeScript type definitions (per domain)
│   └── dashboard/              # ⚠️ DEAD CODE — legacy abandoned folder, safe to delete
├── public/
│   └── images/
│       └── services/           # Service images (solar, ac, electrical, plumbing, home-cleaning)
```

---

## 4. API Layer

### `src/api/`
| File | Purpose |
|---|---|
| `axios.ts` | Axios instance with base URL + Bearer token interceptor |
| `endpoints.ts` | Central endpoint constants |

### Endpoints

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
| `customerDashboard/customerDashboard.service.ts` | 🔶 Mock | Returns from constants |


---

## 5. State Management

### Redux Store (`src/redux/store.ts`)
```ts
configureStore({
  reducer: {
    auth:       authReducer,
    services:   servicesReducer,
    nearbyJobs: nearbyJobsReducer,   // ← added June 25
    activeJobs: activeJobsReducer,   // ← added June 25
    support:    supportReducer,      // ← added June 25
  }
})
```

### Slices
| Slice | File | Store Key | Status | Notes |
|---|---|---|---|---|
| `authSlice` | `redux/slices/authSlice.ts` | `auth` | ✅ Live | `setCredentials`, `logout` |
| `servicesSlice` | `redux/slices/servicesSlice.ts` | `services` | ✅ Live | `fetchServices`, `fetchServiceById`, `createService`, `updateService`, `clearSelectedService` |
| `nearbyJobsSlice` | `redux/slices/nearbyJobsSlice.ts` | `nearbyJobs` | ✅ Wired | Mock data; selectors in `redux/selectors/nearbyJobsSelectors.ts` |
| `activeJobsSlice` | `redux/slices/activeJobsSlice.ts` | `activeJobs` | ✅ Wired | Mock data; selectors in `redux/selectors/activeJobsSelectors.ts` |
| `supportSlice` | `redux/slices/supportSlice.ts` | `support` | ✅ Wired | Mock data; selectors in `redux/selectors/supportSelectors.ts` |
| `bookingSlice` | `redux/slices/bookingSlice.ts` | — | 🔶 Scaffolded | Not wired to store or UI |
| `onboardingSlice` | `redux/slices/onboardingSlice.ts` | — | 🔶 Scaffolded | Not wired to store or UI |
| `activitySlice` | `redux/slices/activitySlice.ts` | — | 🔶 Scaffolded | Not wired to store or UI |
| `dashboardStatsSlice` | `redux/slices/dashboardStatsSlice.ts` | — | 🔶 Scaffolded | Not wired to store or UI |
| `loyaltySlice` | `redux/slices/loyaltySlice.ts` | — | 🔶 Scaffolded | Not wired to store or UI |
| `performanceSlice` | `redux/slices/performanceSlice.ts` | — | 🔶 Scaffolded | Not wired to store or UI |

### Legacy Zustand (`src/redux/legacy/`)
| File | Status | Notes |
|---|---|---|
| `bookingStore.ts` | ✅ **Active** | Zustand store used by entire booking flow. Fields: `service`, `serviceId`, `serviceSlug`, `servicePrice`, `serviceSpecificData`, `bookingFormFields`, `name`, `phone`, `address`, `date`, `slot`, `instructions`. |
| `customerDashboardStore.ts` | ❌ Empty | Never implemented |
| `useSidebarStore.ts` | ❌ Empty | Never implemented |

### React Context
| File | Status | Notes |
|---|---|---|
| `redux/ServiceContext.tsx` | ✅ Complete | Admin service CRUD — in-memory only, no API |

---

## 6. Routes & Status

### Public

| Route | Component | Status |
|---|---|---|
| `/` | `HeroSection`, `ServiceSection`, `ChooseSection`, `TestimonialSection` | ✅ Complete — `PublicRoute` guard |
| `/login` | `LoginForm` | ✅ Complete — real API, `PublicRoute` guard, post-login redirect via `handlePostAuthRedirect()` |
| `/signup` | `SignupForm` | ✅ Complete — real API (OTP flow), `PublicRoute` guard |
| `/services` | `ServiceGrid` (backend) | ✅ Complete — fetches `GET /users/service/all` |
| `/services/[slug]` | `DynamicServiceDetailPage` | ✅ Complete — slug URL, backend data |

### Booking Flow

| Route | Status | Notes |
|---|---|---|
| `/booking?serviceId=N` | ✅ Complete | `BookingAuthGuard` + `UnifiedBookingPage`. Dynamic Form → Address → Date & Time → Book Service (4 steps). |
| `/booking/summary` | ✅ Complete | Shows service name + price from Zustand store |
| `/booking/confirmation` | ✅ Complete | Shows booking details from Zustand store |

### Customer Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/customer` | ✅ Complete | Stats, active booking, recent bookings |
| `/dashboard/customer/services` | ✅ Complete | Backend service grid inside `DashboardLayout`. No navbar/footer. |
| `/dashboard/customer/services/[slug]` | ✅ Complete | Reuses `DynamicServiceDetailPage` inside `DashboardLayout`. `bookingBasePath="/dashboard/customer/booking"` |
| `/dashboard/customer/booking?serviceId=N` | ✅ Complete | `UnifiedBookingPage` inside `DashboardLayout`. `summaryPath="/dashboard/customer/booking/summary"` |
| `/dashboard/customer/booking/summary` | ✅ Complete | Inside `DashboardLayout` |
| `/dashboard/customer/booking/confirmation` | ✅ Complete | Inside `DashboardLayout` |
| `/dashboard/customer/bookings` | ✅ Complete | Table with mock data |
| `/dashboard/customer/bookings/[id]` | ❌ Skeleton | No detail content |
| `/dashboard/customer/addresses` | ✅ Complete | Address list + add/edit |
| `/dashboard/customer/invoices` | ✅ Complete | Invoice summary + table |
| `/dashboard/customer/profile` | ✅ Complete | Profile form + change password |
| `/dashboard/customer/support` | ✅ Complete | FAQ + raise ticket + contact card |

**Sidebar Navigation:**
- Dashboard → `/dashboard/customer`
- Services → `/dashboard/customer/services`
- My Bookings → `/dashboard/customer/bookings`
- Addresses → `/dashboard/customer/addresses`
- Support → `/dashboard/customer/support`
- Profile → `/dashboard/customer/profile`
- Invoices → `/dashboard/customer/invoices`

Active state: Services link highlights on `/dashboard/customer/services*` AND `/dashboard/customer/booking*`.

### Admin Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/admin` | ✅ Complete | Stats, approval queue, revenue trend, live map |
| `/dashboard/admin/bookings` | ✅ Complete | Table, filters, timeline drawer, row actions |
| `/dashboard/admin/complaints` | ✅ Complete | Table + assign/resolve/refund modals |
| `/dashboard/admin/customers` | ✅ Complete | Table + profile drawer with sub-tabs |
| `/dashboard/admin/technicians` | ✅ Complete | Table + approval queue + profile drawer |
| `/dashboard/admin/services` | ✅ Complete | Table + add/edit/delete modals |
| `/dashboard/admin/services/add` | ✅ Complete | 2-step form (Service Info → Pricing) |
| `/dashboard/admin/finance` | ✅ Complete | Overview, commissions, payouts, transactions |
| `/dashboard/admin/reviews` | ✅ Complete | Table + detail drawer + stats |

### Technician

| Route | Status | Notes |
|---|---|---|
| `/technicianOnboarding` through `/review-submit` | ✅ Complete | All 7 onboarding steps |
| `/technicianOnboarding/pending-verification` | 🔶 Partial | Status hardcoded to `'pending'` |
| `/dashboard/technician` | ✅ Complete | Mock data — uses `nearbyJobs` + `activeJobs` Redux slices |
| `/dashboard/technician/nearby-jobs` | ✅ Complete | Self-contained feature |
| `/dashboard/technician/profile` | ❌ Skeleton | No save functionality |


---

## 7. Booking Flow — Full Detail

### Booking Steps (4 steps)
```
Step 0 — Dynamic Form:   backend service specifications → BookingFormField[]
Step 1 — Select Address: address confirmed by user click
Step 2 — Date & Time:    date + slot both set
Step 3 — Book Service:   name / phone / instructions → submit
```

`BOOKING_STEPS = ['Dynamic Form', 'Select Address', 'Select Date & Time', 'Book Service']`

### Flow (Guest User — Dashboard Path)
```
/services  →  /services/[slug]
  → click "Sign In to Book"
  → useBookingAuth: NOT authenticated → router.push('/login') [no redirect stored]
  → Login succeeds → /dashboard/customer
  → Services → service card → service detail → "Book Now"
  → handleBookingClick: seeds bookingStore (service, serviceId, serviceSlug, servicePrice, bookingFormFields)
  → router.push('/booking?serviceId=N')
  → BookingAuthGuard passes → UnifiedBookingPage
  → Dynamic Form → Address → Date & Time → Book Service → /booking/summary → /booking/confirmation
```

### Flow (Logged-in Customer via Dashboard)
```
/dashboard/customer/services
  → service card → /dashboard/customer/services/[slug]
  → DynamicServiceDetailPage (inside DashboardLayout, bookingBasePath="/dashboard/customer/booking")
  → click "Book Now"
  → handleBookingClick: seeds bookingStore
  → router.push('/dashboard/customer/booking?serviceId=N')
  → UnifiedBookingPage (inside DashboardLayout)
  → summaryPath="/dashboard/customer/booking/summary"
  → /dashboard/customer/booking/summary → /dashboard/customer/booking/confirmation → My Bookings
```

### Dynamic Form — Specifications Flow
```
Admin creates service with specifications[]
  ↓
GET /users/service/:id → ApiService.specifications[]
  ↓
normalizeService() → AdminService.specifications: ApiSpecification[]
  ↓
DynamicServiceDetailPage.handleBookingClick()
  → maps specs to BookingFormField[]
  → stores in bookingStore.bookingFormFields[]
  ↓
UnifiedBookingPage reads bookingStore.bookingFormFields
  → if non-empty: use as dynamicFields
  → if empty: DEFAULT_FIELDS (serviceDescription textarea + photos multi-file)
  ↓
DynamicBookingFields renders fields via DynamicFieldRenderer
```

### Key Files
| File | Role |
|---|---|
| `hooks/useBookingAuth.ts` | Auth check for CTAs. Guest → `/login` (no redirect stored). Auth → `onBookingClick()`. |
| `components/serviceDetails/DynamicServiceDetailPage.tsx` | Maps `AdminService` → `Service`, seeds Zustand store including `bookingFormFields`, routes to booking |
| `components/serviceDetails/DynamicServiceHero.tsx` | CTA — "Book Now" (auth) / "Sign In to Book" (guest) |
| `components/serviceDetails/DynamicServiceCTA.tsx` | Bottom CTA — same pattern |
| `components/booking/UnifiedBookingPage.tsx` | 4-step form. Reads `bookingFormFields` from store, falls back to DEFAULT_FIELDS |
| `components/booking/DynamicBookingFields.tsx` | Renders `BookingFormField[]`, handles conditional visibility |
| `components/booking/DynamicFieldRenderer.tsx` | Single field renderer — delegates to `FormField` / `FileField` |
| `components/booking/BookingAuthGuard.tsx` | Stores `pathname+search` in sessionStorage, redirects to `/login` if unauthenticated |
| `redux/legacy/bookingStore.ts` | Zustand: `service`, `serviceId`, `serviceSlug`, `servicePrice`, `serviceSpecificData`, `bookingFormFields`, `name`, `phone`, `address`, `date`, `slot`, `instructions` |
| `lib/authApi/redirectUtils.ts` | `storeRedirectPath()`, `getAndClearRedirectPath()`, `handlePostAuthRedirect()` |
| `components/auth/LoginForm.tsx` | Reads redirect BEFORE `dispatch(setCredentials(...))`, then `router.push(redirectTo)` |
| `components/auth/PublicRoute.tsx` | Mount-only `useEffect` (empty deps). Never re-fires on fresh login. |

### Auth Redirect Logic
1. `redirectTo = handlePostAuthRedirect()` — reads + clears sessionStorage
2. `dispatch(setCredentials(...))`
3. `router.push(redirectTo)` — LoginForm owns navigation

`BookingAuthGuard` stores full URL (`pathname + search`) before redirecting unauthenticated users.

---

## 8. Services Integration — Full Detail

### Data Flow
```
Backend API
  GET /users/service/all  →  servicesSlice.items[]  →  ServiceGrid
  GET /users/service/:id  →  servicesSlice.selectedService  →  DynamicServiceDetailPage
```

### Dynamic Booking Form — Specification Mapping
```typescript
// ApiSpecification → BookingFormField
{
  spec.id         → field.name  (`spec_${spec.id}`, e.g. "spec_14")
  spec.name       → field.label  ("Number of solar panels")
  spec.type       → field.type   ('number', 'select', 'text', ...)
  spec.isRequired → field.required
  spec.values[]   → field.options[].value + .label  (for select type)
  spec.placeholder → field.placeholder
}
```

### AdminService → Service Mapping
```typescript
{
  id          → id (String(service.id))
  name        → title, slug (kebab-case), ctaTitle
  description → description, overview, ctaDescription
  image/iconUrl → image (fallback: '/images/service-placeholder.png')
  isActive    → badge ('Available Now' / 'Unavailable')
  price       → price (serviceBasePrice)
  includes: ['Professional certified technicians', ...]
  bookingForm: []
  formConfig: { showPriceSummary: true, pricingEngine: 'fixed' }
}
```

### Slug Generation
```ts
slug = service.name.toLowerCase().replace(/\s+/g, '-')
```

---

## 9. Components Map

```
src/components/
├── auth/                 LoginForm, SignupForm (OTP flow), OtpModal, PublicRoute
├── common/               PublicNavbar, PublicFooter, NavbarLinks, NavbarLogo, MobileMenu, AvatarGroup
├── heroSection/          HeroSection + 5 sub-components
├── servicesSection/      ServiceSection, ServiceGrid (linkPrefix prop), ServiceCard (linkPrefix prop)
├── serviceDetails/       DynamicServiceDetailPage (reused public + dashboard),
│                         DynamicServiceHero, DynamicServiceCTA, DynamicServiceOverview,
│                         DynamicServiceFeatures, DynamicServicePricing
├── booking/              UnifiedBookingPage, BookingAuthGuard, BookingSummary,
│                         BookingConfirmation, BookingStepper,
│                         DynamicBookingFields, DynamicFieldRenderer,
│                         AddressSelector, TimeSlotSelector, BookingDetailsForm,
│                         ConfirmButton, ErrorMessage
├── customerDashboard/
│   ├── layout/           DashboardLayout, DashboardHeader, DashboardSidebar
│   └── ...               (overview, bookings, addresses, invoices, profile, support)
├── adminDashboard/       (layout, dashboard, bookings, complaints, customers,
│                          finance, reviews, services, technicians)
├── technicianDashboard/  (dashboard overview, nearby-jobs, active-jobs, earnings,
│                          jobs, profile, support)
└── technicianApplication/ (full onboarding flow — 7 steps)
```

---

## 10. Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useBookingAuth` | Auth check for CTAs. Guest → `/login`. Auth → `onBookingClick()`. |
| `useSignupForm` | Signup + OTP flow + auto-login + `router.push('/dashboard/customer')` |
| `useFormValidation` | Generic form validation |
| `useActiveBooking` | Customer dashboard active booking (mock) |
| `useFavoriteTechnicians` | Customer dashboard favorites (mock) |
| `useInvoices` | Customer invoices (mock) |
| `useLatestReview` | Latest customer review (mock) |
| `useRecentBookings` | Recent bookings list (mock) |
| `useCategoryManager` | Admin category CRUD |
| `useServiceManager` | Admin service CRUD |

---

## 11. Lib / Utilities (`src/lib/`)

| Path | Purpose |
|---|---|
| `lib/authApi/redirectUtils.ts` | `storeRedirectPath()`, `getAndClearRedirectPath()`, `handlePostAuthRedirect()` |
| `lib/booking/formatBookingData.ts` | Formats booking store data for display |
| `lib/pricing/calculateACPrice.ts` | AC dynamic price calculation |
| `lib/pricing/calculateSolarPrice.ts` | Solar price calculation |
| `lib/utils/addressUtils.ts` | Address selection helpers |
| `lib/validation/bookingValidation.ts` | Booking form validation |
| `lib/validation/fileValidation.ts` | File upload validation |
| `lib/validator/` | email, password, phone, pincode, signup validators |

---

## 12. Key Types (`src/types/`)

| File | Key Types |
|---|---|
| `types/services.types.ts` | `Service`, `BookingFormField`, `BookingFormData`, `ServiceCardProps` (with `linkPrefix`) |
| `types/auth.types.ts` | `User`, `LoginRequest/Response`, `SignupFormData`, OTP types, `CustomerAddress` |
| `types/bookingTypes/bookingForm.types.ts` | `UnifiedBookingPageProps` (`service: string`, `serviceId?: number`), `TimeSlots`, `BookingStep`, `AddressOption` |
| `types/admin/service.types.ts` | `AdminService`, `ApiService`, `ApiPricingRule`, `ApiSpecification`, `CreateServiceRequest`, `UpdateServiceRequest`, `GetAllServicesResponse` |
| `types/admin.types.ts` | `DashboardStat`, `Technician`, `ActiveJob`, `AdminProfile` |
| `types/technicianDashboard/nearbyJobs.types.ts` | `NearbyJob`, `NearbyJobsState` |
| `types/invoicesTypes/invoice.types.ts` | `Invoice` |
| `types/addressTypes/address.types.ts` | `Address` |
| `types/technicianApplication/` | 8 files covering full onboarding |


---

## 13. Constants & Mock Data (`src/constants/`)

Services listing + detail no longer use mock data. All other non-auth data is still mocked:

| Folder | Contents |
|---|---|
| `constants/services/serviceData.ts` | Legacy 4-service mock — **no longer imported anywhere in active code** |
| `constants/admin/` | 15 files: bookings, customers, technicians, complaints, reviews, finance, etc. |
| `constants/customerDashboard/` | activeBooking, invoices, recentBookings, reviews, favourites, stats |
| `constants/dashboard/` | addresses, bookings, faqs, invoices |
| `constants/booking/` | savedAddresses, timeSlots |
| `constants/technicianDashboard/` | nearby-jobs mock data (`MOCK_NEARBY_JOBS`), active job mock (`MOCK_ACTIVE_JOB`) |
| `constants/technicianApplication/` | documentUpload, onboardingSteps, serviceAreaOptions, etc. |
| `constants/auth/` | loginContent, signupContent |
| `constants/hero/`, `chooseUs/`, `footer/`, `navigation/`, `testimonials/` | Static UI content |

---

## 14. What's Complete vs Pending

### ✅ Completed (June 25, 2026)

**Redux store — missing slices wired:**
- `nearbyJobsSlice` registered as `nearbyJobs` — fixes technician dashboard 500 error
- `activeJobsSlice` registered as `activeJobs` — fixes `state.activeJobs.currentJob` TypeError
- `supportSlice` registered as `support` — fixes `state.support.tickets` TypeError
- Root cause: all three slices had reducers and selectors defined but were never added to `configureStore`

**Dynamic booking form — backend specifications:**
- `types/admin/service.types.ts` — added `ApiSpecification` interface; added `specifications: ApiSpecification[]` to `AdminService`
- `services/service.service.ts` — `specToBookingField()` mapper; `normalizeService()` passes `specifications` through
- `redux/legacy/bookingStore.ts` — added `bookingFormFields: BookingFormField[]` field
- `components/serviceDetails/DynamicServiceDetailPage.tsx` — `handleBookingClick` maps specs → `BookingFormField[]`, seeds store
- `components/booking/UnifiedBookingPage.tsx` — reads `bookingFormFields` from store; falls back to `DEFAULT_FIELDS`; imports removed `servicesData`
- `constants/booking/timeSlots.ts` — `BOOKING_STEPS` updated to 4 steps starting with `'Dynamic Form'`
- `components/booking/DynamicBookingFields.tsx` — new component: renders `BookingFormField[]`, conditional visibility
- `components/booking/DynamicFieldRenderer.tsx` — new component: single field renderer by type

**Dashboard booking flow (customer stays in dashboard):**
- `app/dashboard/customer/services/[slug]/page.tsx` — passes `bookingBasePath="/dashboard/customer/booking"`
- `app/dashboard/customer/booking/page.tsx` — `UnifiedBookingPage` inside `DashboardLayout`, `summaryPath="/dashboard/customer/booking/summary"`
- Dashboard booking/summary and booking/confirmation pages inside `DashboardLayout`

### ✅ Previously Completed (June 19, 2026)
- Full public site (home, services listing, service detail)
- Login + signup — real APIs, OTP flow
- Auth guards (`PublicRoute`, `DashboardLayout`, `AdminDashboardLayout`)
- Admin services: list (backend), create (2-step form, multipart + JSON)
- All customer dashboard pages (mock data)
- All admin dashboard pages (mock data)
- Technician onboarding (all 7 steps, UI)
- Booking flow UI (Dynamic Form → Address → Date & Time → summary → confirmation)
- Dashboard Services pages + sidebar link update
- `ServiceGrid` / `ServiceCard` `linkPrefix` prop
- `BookingAuthGuard` sessionStorage redirect
- `LoginForm` reads redirect BEFORE dispatching credentials
- `PublicRoute` mount-only guard

### 🔶 In Progress / Partial
- `/technicianOnboarding/pending-verification` — status hardcoded to `'pending'`
- `/dashboard/admin/finance/edit` — stub save callbacks
- `ServiceContext` — in-memory CRUD, no API persistence
- Admin service edit/delete not wired to API
- RTK Query services (`authApi`, `bookingApi`, `serviceApi`, `userApi`) — empty files

### ❌ Pending / Skeleton
- `/dashboard/customer/bookings/[id]` — no booking detail content
- `/dashboard/technician/profile` — disabled inputs, no save
- `src/services/booking.service.ts` — completely empty
- Booking submission API integration (POST endpoint + `serviceSpecifications[]`)
- All other non-auth API integration (bookings, profile, technicians)
- Technician auth guard (`role === 'TECHNICIAN'`)

### ⚠️ Dead Code (safe to delete)
- `src/dashboard/` — abandoned earlier architecture
- `redux/legacy/customerDashboardStore.ts` — empty
- `redux/legacy/useSidebarStore.ts` — empty
- `constants/services/serviceData.ts` — no longer imported anywhere

---

## 15. Next Development Priorities

1. **Booking submission API** — POST booking endpoint; send `serviceSpecifications[]` (spec id + value) from `dynamicFormData`
2. **Customer booking detail** — `/dashboard/customer/bookings/[id]`
3. **Admin service edit/delete API** — `PATCH /users/admin/service/:id`, `DELETE /users/admin/service/:id`
4. **Technician auth guard** — `role === 'TECHNICIAN'` guard on `/dashboard/technician/*`
5. **Technician profile save** — enable edit + save
6. **Pending verification** — wire to status API
7. **RTK Query** — implement `bookingApi`, `userApi`
8. **Clean up dead code** — `src/dashboard/`, `redux/legacy/` empty files, `serviceData.ts`

---

## 16. Development Notes

- **Redux store** — always register new slices in `src/redux/store.ts`. Forgetting causes runtime `TypeError: Cannot read properties of undefined` when any selector tries to access the slice key.
- **Auth guards all run on mount only** — empty `useEffect` deps `[]`.
- **Post-login redirect** uses `sessionStorage` via `lib/authApi/redirectUtils.ts`. `LoginForm` reads the stored path BEFORE dispatching credentials to avoid race with `PublicRoute`.
- **`BookingAuthGuard`** stores `pathname + search` before redirecting unauthenticated users.
- **`useBookingAuth` hook** — guest CTA → `/login` with no stored redirect → lands on `/dashboard/customer`.
- **`bookingStore.ts` (Zustand)** — active booking store. Contains `bookingFormFields: BookingFormField[]` seeded by service detail page from backend `specifications[]`.
- **Dynamic form fallback** — when `bookingFormFields` is empty, `UnifiedBookingPage` shows default fields: `serviceDescription` (textarea) + `photos` (multi-file).
- **Booking submission payload** — `serviceSpecificData` in the store holds `{ [fieldName]: value }` where fieldName is `spec_${id}`. On API submission, map to `serviceSpecifications: [{ specificationId: id, value }]`.
- **`DynamicServiceDetailPage`** — pure component, works inside both public layout and `DashboardLayout`. `bookingBasePath` prop controls where booking navigates (`/booking` vs `/dashboard/customer/booking`).
- **`ServiceGrid` + `ServiceCard` `linkPrefix`** — default `/services`. Pass `/dashboard/customer/services` for dashboard.
- **Slug generation** — `name.toLowerCase().replace(/\s+/g, '-')`. Consistent everywhere.
- **Tailwind v4 syntax** — `@import "tailwindcss"` + `@theme inline { ... }`. No `tailwind.config.js`.
- **MUI + Tailwind** — MUI for tables/drawers/modals, Tailwind for layout.
- **pnpm** — always use `pnpm`.
- **ESLint rules** — unused params prefixed with `_`, escape HTML entities in JSX.

---

*Update this file whenever a module status changes, a new route is added, or an API is integrated.*
