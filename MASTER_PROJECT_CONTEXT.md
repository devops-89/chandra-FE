# HiChandra Frontend — Master Project Context

> **Last updated:** June 19, 2026
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
│   │   ├── slices/             # authSlice, servicesSlice, bookingSlice, onboardingSlice
│   │   ├── services/           # authApi, bookingApi, serviceApi, userApi (RTK Query — empty)
│   │   ├── legacy/             # bookingStore (Zustand, active), customerDashboardStore, useSidebarStore
│   │   ├── store.ts            # configureStore — auth + services reducers wired
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
configureStore({ reducer: { auth: authReducer, services: servicesReducer } })
```

### Slices
| Slice | File | Status | Key Actions |
|---|---|---|---|
| `authSlice` | `redux/slices/authSlice.ts` | ✅ Live | `setCredentials`, `logout` |
| `servicesSlice` | `redux/slices/servicesSlice.ts` | ✅ Live | `fetchServices`, `fetchServiceById`, `createService`, `updateService`, `clearSelectedService` |
| `bookingSlice` | `redux/slices/bookingSlice.ts` | 🔶 Scaffolded | Not wired to UI |
| `onboardingSlice` | `redux/slices/onboardingSlice.ts` | 🔶 Scaffolded | Not wired to UI |

### Legacy Zustand (`src/redux/legacy/`)
| File | Status | Notes |
|---|---|---|
| `bookingStore.ts` | ✅ **Active** | Zustand store used by entire booking flow. Fields: `service`, `serviceId`, `serviceSlug`, `servicePrice`, `serviceSpecificData`, `name`, `phone`, `address`, `date`, `slot`, `instructions`. `serviceId` added to support future booking API. |
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
| `/booking?serviceId=N` | ✅ Complete | `BookingAuthGuard` + `UnifiedBookingPage`. Reads `serviceId` from query param, falls back to `service` (slug). Service data pre-seeded in Zustand store by service detail page. |
| `/booking/summary` | ✅ Complete | Shows service name + price from Zustand store |
| `/booking/confirmation` | ✅ Complete | Shows booking details from Zustand store |

### Customer Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/customer` | ✅ Complete | Stats, active booking, recent bookings |
| `/dashboard/customer/services` | ✅ **New** | Backend service grid inside `DashboardLayout`. No navbar/footer. Cards link to `/dashboard/customer/services/[slug]`. |
| `/dashboard/customer/services/[slug]` | ✅ **New** | Reuses `DynamicServiceDetailPage` inside `DashboardLayout`. No navbar/footer. |
| `/dashboard/customer/bookings` | ✅ Complete | Table with mock data |
| `/dashboard/customer/bookings/[id]` | ❌ Skeleton | No detail content |
| `/dashboard/customer/addresses` | ✅ Complete | Address list + add/edit |
| `/dashboard/customer/invoices` | ✅ Complete | Invoice summary + table |
| `/dashboard/customer/profile` | ✅ Complete | Profile form + change password |
| `/dashboard/customer/support` | ✅ Complete | FAQ + raise ticket + contact card |

**Sidebar Navigation (updated):**
- Dashboard → `/dashboard/customer`
- **Services** → `/dashboard/customer/services` ← updated (was `/services`)
- My Bookings → `/dashboard/customer/bookings`
- Addresses → `/dashboard/customer/addresses`
- Support → `/dashboard/customer/support`
- Profile → `/dashboard/customer/profile`
- Invoices → `/dashboard/customer/invoices`

Active state: Services link highlights on `/dashboard/customer/services*` AND `/booking*`.

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
| `/dashboard/technician` | ✅ Complete | Mock data |
| `/dashboard/technician/nearby-jobs` | ✅ Complete | Self-contained feature |
| `/dashboard/technician/profile` | ❌ Skeleton | No save functionality |

---

## 7. Booking Flow — Full Detail

### Flow (Guest User)
```
/services  →  /services/[slug]
  → click "Sign In to Book"
  → useBookingAuth: NOT authenticated → router.push('/login')  [no redirect stored]
  → Login succeeds → handlePostAuthRedirect() → no stored path → /dashboard/customer
  → User navigates to Services → clicks service → "Book Now"
  → setBooking({ service, serviceId, serviceSlug, servicePrice }) in Zustand
  → router.push('/booking?serviceId=N')
  → BookingAuthGuard passes → UnifiedBookingPage
  → Fill address + slot + details → /booking/summary → /booking/confirmation
```

### Flow (Logged-in Customer via Dashboard)
```
/dashboard/customer/services
  → click service card → /dashboard/customer/services/[slug]
  → DynamicServiceDetailPage (inside DashboardLayout)
  → click "Book Now"
  → setBooking({ service, serviceId, serviceSlug, servicePrice }) in Zustand
  → router.push('/booking?serviceId=N')
  → UnifiedBookingPage (with PublicNavbar/PublicFooter)
  → /booking/summary → /booking/confirmation → My Bookings CTA
```

### Key Files
| File | Role |
|---|---|
| `hooks/useBookingAuth.ts` | Checks auth; if guest → `router.push('/login')` (no redirect stored); if auth → runs `onBookingClick()` |
| `components/serviceDetails/DynamicServiceDetailPage.tsx` | Maps `AdminService` → `Service`, seeds Zustand store, calls `router.push('/booking?serviceId=N')` |
| `components/serviceDetails/DynamicServiceHero.tsx` | CTA button — "Book Now" (auth) / "Sign In to Book" (guest) via `useBookingAuth` |
| `components/serviceDetails/DynamicServiceCTA.tsx` | Bottom CTA — same auth-conditional button |
| `components/booking/UnifiedBookingPage.tsx` | Reads `serviceId` from props + Zustand store; 3-step form |
| `components/booking/BookingAuthGuard.tsx` | Stores `pathname+search` in sessionStorage then redirects to `/login` if unauthenticated |
| `redux/legacy/bookingStore.ts` | Zustand store: `service`, `serviceId`, `serviceSlug`, `servicePrice`, `name`, `phone`, `address`, `date`, `slot`, `instructions` |
| `lib/authApi/redirectUtils.ts` | `storeRedirectPath()`, `getAndClearRedirectPath()`, `handlePostAuthRedirect()` |
| `components/auth/LoginForm.tsx` | On success: reads redirect target BEFORE dispatching credentials, then `router.push(redirectTo)` |
| `components/auth/PublicRoute.tsx` | Mount-only check (empty deps `[]`). If already authenticated: checks stored redirect → else role dashboard. Does NOT re-fire on fresh login. |

### Auth Redirect Logic (important)
`PublicRoute` runs its `useEffect` **only on mount** (empty deps). This prevents it from racing with `LoginForm`'s own `router.push()` after a fresh login. The correct sequence on login:
1. `redirectTo = handlePostAuthRedirect()` — reads + clears sessionStorage
2. `dispatch(setCredentials(...))`
3. `router.push(redirectTo)` — LoginForm controls navigation

`BookingAuthGuard` stores the full URL (`pathname + search`, e.g. `/booking?serviceId=6`) before redirecting to `/login`, so if a user bookmarks a booking URL and is not logged in, they land back after login.

---

## 8. Services Integration — Full Detail

### Data Flow
```
Backend API
  GET /users/service/all  →  servicesSlice.items[]  →  ServiceGrid (listing)
  GET /users/service/:id  →  servicesSlice.selectedService  →  DynamicServiceDetailPage

ServiceGrid
  - accepts linkPrefix prop (default: '/services')
  - used with '/dashboard/customer/services' for dashboard context
  - maps AdminService → Service format inline

ServiceCard
  - accepts linkPrefix prop (default: '/services')
  - href = `${linkPrefix}/${slug}`

DynamicServiceDetailPage (reusable component)
  - accepts: { service: AdminService | null, isLoading, error, onRetry }
  - maps AdminService → Service for child components
  - used by: /services/[slug] (public) AND /dashboard/customer/services/[slug] (dashboard)
  - both use identical UI — no duplication
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
  // Always added:
  includes: ['Professional certified technicians', ...]
  bookingForm: []
  formConfig: { showPriceSummary: true, pricingEngine: 'fixed' }
}
```

### Slug Generation
```ts
slug = service.name.toLowerCase().replace(/\s+/g, '-')
// "AC Service" → "ac-service"
// "Plumber Details" → "plumber-details"
```

---

## 9. Components Map

```
src/components/
├── auth/                 LoginForm, SignupForm (OTP flow), OtpModal, PublicRoute
├── common/               PublicNavbar, PublicFooter, NavbarLinks, NavbarLogo, MobileMenu, AvatarGroup
├── heroSection/          HeroSection + 5 sub-components
├── servicesSection/      ServiceSection, ServiceGrid (linkPrefix prop), ServiceCard (linkPrefix prop),
│                         ServiceHeading, ServiceImage
├── serviceDetails/       DynamicServiceDetailPage (reused in public + dashboard),
│                         DynamicServiceHero, DynamicServiceCTA, DynamicServiceOverview,
│                         DynamicServiceFeatures, DynamicServicePricing
├── booking/              UnifiedBookingPage, BookingAuthGuard, BookingSummary,
│                         BookingConfirmation, BookingStepper, DynamicBookingForm,
│                         AddressSelector, TimeSlotSelector, BookingDetailsForm,
│                         ConfirmButton, ErrorMessage
├── customerDashboard/
│   ├── layout/           DashboardLayout, DashboardHeader, DashboardSidebar
│   └── ...               (overview, bookings, addresses, invoices, profile, support, etc.)
├── adminDashboard/       (layout, dashboard, bookings, complaints, customers, finance, reviews, services, technicians)
└── technicianApplication/ (full onboarding flow)
```

---

## 10. Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useBookingAuth` | Auth check for booking CTAs. Guest → `router.push('/login')` (no redirect stored). Auth → runs `onBookingClick()`. |
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
| `lib/authApi/redirectUtils.ts` | `storeRedirectPath(path?)`, `getAndClearRedirectPath()`, `handlePostAuthRedirect()` — sessionStorage-based post-login redirect |
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
| `types/admin/service.types.ts` | `AdminService`, `ApiService`, `ApiPricingRule`, `CreateServiceRequest`, `UpdateServiceRequest`, `GetAllServicesResponse` |
| `types/admin.types.ts` | `DashboardStat`, `Technician`, `ActiveJob`, `AdminProfile` |
| `types/invoicesTypes/invoice.types.ts` | `Invoice` |
| `types/addressTypes/address.types.ts` | `Address` |
| `types/technicianApplication/` | 8 files covering full onboarding |

---

## 13. Constants & Mock Data (`src/constants/`)

Services listing + detail pages no longer use mock data. All other non-auth data is still mocked:

| Folder | Contents |
|---|---|
| `constants/services/serviceData.ts` | Legacy 4-service mock — **no longer imported anywhere in active code** |
| `constants/admin/` | 15 files: bookings, customers, technicians, complaints, reviews, finance, etc. |
| `constants/customerDashboard/` | activeBooking, invoices, recentBookings, reviews, favourites, stats |
| `constants/dashboard/` | addresses, bookings, faqs, invoices |
| `constants/booking/` | savedAddresses, timeSlots |
| `constants/technicianApplication/` | documentUpload, onboardingSteps, serviceAreaOptions, etc. |
| `constants/auth/` | loginContent, signupContent |
| `constants/hero/`, `chooseUs/`, `footer/`, `navigation/`, `testimonials/` | Static UI content |

---

## 14. What's Complete vs Pending

### ✅ Completed (June 19, 2026 — this session)

**Booking entry flow refactored:**
- `DynamicServiceDetailPage` — removed duplicate function definitions; seeds Zustand store (`service`, `serviceId`, `serviceSlug`, `servicePrice`) on "Book Now"; navigates to `/booking?serviceId=N`
- `DynamicServiceHero` / `DynamicServiceCTA` — fixed missing `type="button"` attributes
- `useBookingAuth` — guest click sends to `/login` with no stored redirect (→ lands on dashboard after login)
- `BookingAuthGuard` — now stores `pathname+search` before redirecting unauthenticated users to `/login`
- `LoginForm` — reads redirect target BEFORE `dispatch(setCredentials(...))` to prevent race with `PublicRoute`
- `PublicRoute` — mount-only `useEffect` (empty deps); checks stored redirect first, then role dashboard; never re-fires on fresh login
- `bookingStore.ts` — added `serviceId: number | null` field
- `UnifiedBookingPage` — accepts `serviceId` prop, reads/saves `serviceId` from store
- `booking/page.tsx` — passes `serviceId` param to `UnifiedBookingPage`
- `BookingSummary` — removed dead `servicesData` import; price reads directly from store

**Dashboard Services integration:**
- `/dashboard/customer/services` — new page: `ServiceGrid` inside `DashboardLayout`, no navbar/footer
- `/dashboard/customer/services/[slug]` — new page: `DynamicServiceDetailPage` inside `DashboardLayout`
- `ServiceCard` — added `linkPrefix` prop (default `/services`)
- `ServiceGrid` — added `linkPrefix` prop, forwarded to `ServiceCard`
- Sidebar "Services" link updated: `/services` → `/dashboard/customer/services`
- `DashboardSidebar` `isActive` logic updated for new route

**Cleanup:**
- Removed empty conflicting route folders: `src/app/services/[id]/`, `src/app/services/[category]/`
- Deleted unused `src/utils/serviceHelpers.ts`
- `BookingSummary` no longer imports `servicesData` or `formatBookingData`

### ✅ Previously Completed
- Full public site (home, services listing, service detail)
- Login + signup — real APIs, OTP flow
- Auth guards (`PublicRoute`, `DashboardLayout`, `AdminDashboardLayout`)
- Admin services: list (backend), create (2-step form, multipart + JSON)
- All customer dashboard pages (mock data)
- All admin dashboard pages (mock data)
- Technician onboarding (all 7 steps, UI)
- Booking flow UI (address → slot → details → summary → confirmation)

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
- Booking submission API integration (POST endpoint)
- All other non-auth API integration (bookings, profile, technicians)
- Technician auth guard (`role === 'TECHNICIAN'`)

### ⚠️ Dead Code (safe to delete)
- `src/dashboard/` — abandoned earlier architecture
- `redux/legacy/customerDashboardStore.ts` — empty
- `redux/legacy/useSidebarStore.ts` — empty
- `constants/services/serviceData.ts` — no longer imported anywhere

---

## 15. Next Development Priorities

1. **Booking submission API** — POST endpoint, use `serviceId` from Zustand store (`bookingStore.serviceId`)
2. **Customer booking detail** — `/dashboard/customer/bookings/[id]`
3. **Admin service edit/delete API** — `PATCH /users/admin/service/:id`, `DELETE /users/admin/service/:id`
4. **Technician auth guard** — `role === 'TECHNICIAN'` guard on `/dashboard/technician/*`
5. **Technician profile save** — enable edit + save
6. **Pending verification** — wire to status API
7. **RTK Query** — implement `bookingApi`, `userApi`
8. **Clean up dead code** — `src/dashboard/`, `redux/legacy/` empty files, `serviceData.ts`

---

## 16. Development Notes

- **Auth guards all run on mount only** — empty `useEffect` deps `[]`. This prevents interference with logout redirects and login navigation.
- **`PublicRoute` mount-check pattern** — Checks if user is already authenticated when the page first loads. Does NOT react to Redux changes. A fresh login is handled entirely by `LoginForm`.
- **Post-login redirect** uses `sessionStorage` via `lib/authApi/redirectUtils.ts`. `LoginForm` reads the stored path BEFORE dispatching credentials to avoid race with `PublicRoute`.
- **`BookingAuthGuard`** stores `pathname + search` (full URL including query params) before redirecting unauthenticated users to `/login`. This handles deep links like `/booking?serviceId=6`.
- **`useBookingAuth` hook** — guest CTA click → `router.push('/login')` with no stored redirect → lands on `/dashboard/customer` after login. Auth CTA click → runs `onBookingClick()` directly.
- **Services reducer is wired** — `store.ts` includes `services: servicesReducer`. `servicesSlice` has `fetchServices`, `fetchServiceById`, `createService`, `updateService` thunks.
- **`bookingStore.ts` (Zustand)** — still the active store for the booking flow. Contains `serviceId: number | null` for future booking API use.
- **`ServiceGrid` + `ServiceCard` `linkPrefix` prop** — default `/services` (public). Pass `/dashboard/customer/services` for dashboard context. Backward compatible.
- **`DynamicServiceDetailPage`** is a pure component — accepts `AdminService | null`, works inside both `PublicNavbar/Footer` wrapper and `DashboardLayout`. No internal navigation logic — caller controls layout.
- **Slug generation** — `name.toLowerCase().replace(/\s+/g, '-')`. Consistent across `ServiceGrid`, `DynamicServiceDetailPage`, and both `[slug]` route pages.
- **Tailwind v4 syntax** — `@import "tailwindcss"` + `@theme inline { ... }` in `globals.css`. No `tailwind.config.js`.
- **MUI + Tailwind** — MUI for complex components (tables, drawers, modals), Tailwind for layout/custom styles.
- **pnpm** — always use `pnpm`, not `npm` or `yarn`.
- **ESLint rules** — unused params prefixed with `_`, no `console.log` in production, escape HTML entities in JSX.

---

*Update this file whenever a module status changes, a new route is added, or an API is integrated.*
