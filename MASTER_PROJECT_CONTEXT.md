# HiChandra Frontend — Master Project Context

> **Last updated:** June 18, 2026
> **Purpose:** Permanent handoff document. Paste this file into any new chat to restore full project context instantly.

---

## 1. Project Overview

**HiChandra** is a home-services platform (think Urban Company / Housejoy) that connects customers with technicians for services like AC servicing, solar panel cleaning, electrical, and plumbing.

The frontend is a **UI-complete** Next.js app. Auth API integration is live. All other data is still mocked via constants. The current phase is **backend integration**.

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
| State Management | Redux Toolkit (RTK) — replaces old Zustand setup |
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
│   ├── constants/              # All mock data (current "backend" for non-auth modules)
│   ├── data/                   # Additional mock datasets
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities (validation, pricing, auth redirects)
│   ├── redux/                  # Redux Toolkit store, slices, RTK Query services
│   │   ├── slices/             # authSlice, bookingSlice, onboardingSlice
│   │   ├── services/           # authApi, bookingApi, serviceApi, userApi (RTK Query)
│   │   ├── legacy/             # Old Zustand stores (bookingStore, customerDashboardStore, useSidebarStore)
│   │   ├── store.ts            # configureStore — auth reducer wired
│   │   ├── hooks.ts            # useAppDispatch / useAppSelector typed hooks
│   │   ├── Provider.tsx        # <Provider store={store}> wrapper
│   │   └── ServiceContext.tsx  # Admin service CRUD React Context (in-memory)
│   ├── services/               # REST service functions (Axios calls)
│   ├── styles/                 # dashboard.css, mui-theme.ts
│   ├── types/                  # TypeScript type definitions (per domain)
│   ├── utils/                  # serviceHelpers + personalInfoValidation
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
| `axios.ts` | Configured Axios instance (`api`) with base URL |
| `endpoints.ts` | Central endpoint constants — `LOGIN`, `GENERATE_OTP`, `VERIFY_OTP`, `REGISTER_CUSTOMER` |

### `src/services/` — REST Service Functions
| File | Status | Notes |
|---|---|---|
| `auth.service.ts` | ✅ **Live** | `loginService()`, `generateOtpService()`, `verifyOtpService()`, `registerCustomerService()` — all wired to real APIs |
| `booking.service.ts` | ❌ Empty | No implementation |
| `customerDashboard/customerDashboard.service.ts` | 🔶 Mock | Returns from constants, no HTTP |

### `src/redux/services/` — RTK Query (scaffolded, not yet used)
| File | Status |
|---|---|
| `authApi.ts` | ❌ Empty |
| `bookingApi.ts` | ❌ Empty |
| `serviceApi.ts` | ❌ Empty |
| `userApi.ts` | ❌ Empty |

---

## 5. State Management

### Redux Store (`src/redux/store.ts`)
Only `auth` reducer is currently wired:
```ts
configureStore({ reducer: { auth: authReducer } })
```

### Slices
| Slice | File | Status | Key Actions |
|---|---|---|---|
| `authSlice` | `redux/slices/authSlice.ts` | ✅ Live | `setCredentials`, `logout` |
| `bookingSlice` | `redux/slices/bookingSlice.ts` | 🔶 Scaffolded | Needs wiring |
| `onboardingSlice` | `redux/slices/onboardingSlice.ts` | 🔶 Scaffolded | Needs wiring |

### Legacy Zustand (moved to `src/redux/legacy/`)
| File | Notes |
|---|---|
| `bookingStore.ts` | Superseded by `bookingSlice` — not actively used |
| `customerDashboardStore.ts` | Empty — never implemented |
| `useSidebarStore.ts` | Empty — never implemented |

### React Context
| File | Status | Notes |
|---|---|---|
| `redux/ServiceContext.tsx` | ✅ Complete | Admin service CRUD — in-memory only, no API |

---

## 6. Routes & Status

### Public

| Route | Component | Status |
|---|---|---|
| `/` | `HeroSection`, `ServiceSection`, `ChooseSection`, `TestimonialSection` | ✅ Complete — `PublicRoute` guard prevents logged-in access |
| `/login` | `LoginForm` | ✅ Complete — **real API** (`loginService` → POST `/auth/login`), `PublicRoute` guard |
| `/signup` | `SignupForm` | ✅ Complete — **real API** (OTP flow → registration → auto-login), `PublicRoute` guard |
| `/services` | `ServiceSection` | ✅ Complete |
| `/services/[slug]` | Dynamic service detail page | ✅ Complete (4 services, `generateStaticParams`) |
| `/services/[category]/[service]` | — | ❌ Directory exists, no `page.tsx` |

### Booking Flow

| Route | Status | Notes |
|---|---|---|
| `/booking` | ✅ Complete | `BookingAuthGuard` + `UnifiedBookingPage` (3-step: address → slot → details) |
| `/booking/summary` | ✅ Complete | Full price breakdown + confirmation trigger |
| `/booking/confirmation` | ✅ Complete | Success screen via `BookingConfirmation` |
| `/booking/address` | ↩️ Redirect | Redirects to `/booking` |
| `/booking/slot` | ↩️ Redirect | Redirects to `/booking` |

### Technician Onboarding

| Route | Step | Status |
|---|---|---|
| `/technicianOnboarding` | 0 | ✅ Complete |
| `/technicianOnboarding/personal-info` | 0 | ✅ Complete |
| `/technicianOnboarding/skill-tagging` | 1 | ✅ Complete |
| `/technicianOnboarding/document-upload` | 2 | ✅ Complete |
| `/technicianOnboarding/service-area` | 3 | ✅ Complete |
| `/technicianOnboarding/bank-details` | 4 | ✅ Complete |
| `/technicianOnboarding/review-submit` | 5 | ✅ Complete |
| `/technicianOnboarding/pending-verification` | — | 🔶 Hardcoded `'pending'` — needs backend |
| `/technician/apply` | — | ↩️ Redirects to `/technicianOnboarding` |

### Customer Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/customer` | ✅ Complete | Stats cards, active booking, recent bookings, quick rebook. Sidebar includes Services link. |
| `/dashboard/customer/bookings` | ✅ Complete | Table with mock data |
| `/dashboard/customer/bookings/[id]` | ❌ Skeleton | Only shows booking ID, no detail content |
| `/dashboard/customer/addresses` | ✅ Complete | Address list + add/edit |
| `/dashboard/customer/invoices` | ✅ Complete | Invoice summary + table |
| `/dashboard/customer/profile` | ✅ Complete | Profile form + change password |
| `/dashboard/customer/support` | ✅ Complete | FAQ + raise ticket + contact card |

**Sidebar Navigation:**
- Dashboard (exact match)
- **Services** → `/services` (active on `/services*`, `/booking*`)
- My Bookings
- Saved Addresses
- Invoices
- Profile Settings
- Help & Support

### Admin Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/admin` | ✅ Complete | Stats, approval queue, revenue trend, live map |
| `/dashboard/admin/bookings` | ✅ Complete | Table, filters, timeline drawer, row actions |
| `/dashboard/admin/complaints` | ✅ Complete | Table + assign/resolve/refund modals |
| `/dashboard/admin/customers` | ✅ Complete | Table + profile drawer with sub-tabs |
| `/dashboard/admin/technicians` | ✅ Complete | Table + approval queue + profile drawer |
| `/dashboard/admin/services` | ✅ Complete | Table + add/edit/delete modals |
| `/dashboard/admin/services/add` | ✅ Complete | **2-step form** (Service Info → Pricing) — simplified and backend-aligned |
| `/dashboard/admin/finance` | ✅ Complete | Overview, commissions, payouts, transactions |
| `/dashboard/admin/finance/edit` | 🔶 Partial | Stub `onClose/onSave` callbacks — needs real save logic |
| `/dashboard/admin/reviews` | ✅ Complete | Table + detail drawer + stats |

### Technician Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/technician` | ✅ Complete | Stats, job cards, active job tracker, earnings chart — all mock |
| `/dashboard/technician/nearby-jobs` | ✅ Complete | Self-contained feature (own components/, hooks/, constants/, types/) |
| `/dashboard/technician/profile` | ❌ Skeleton | Disabled static inputs, no save functionality |

---

## 7. Services (Data / Domain)

4 services defined in `src/constants/services/serviceData.ts`:

| Slug | Title | Pricing Engine |
|---|---|---|
| `solar-panel-cleaning` | Solar Cleaning | Dynamic (`panelCount × basePrice + propertyType addon`) |
| `ac-servicing` | AC Servicing | By service type selection |
| `electrical-servicing` | Electrical Servicing | Fixed |
| `plumber-servicing` | Plumber Servicing | Fixed |

---

## 8. Components Map

```
src/components/
├── auth/                          LoginForm (with API error banner), SignupForm (full OTP flow), OtpModal, PublicRoute
├── common/                        PublicNavbar (auth-conditional Login/Signup vs Dashboard/Logout), PublicFooter, NavbarLinks, NavbarLogo, MobileMenu, AvatarGroup
├── heroSection/                   HeroSection + 5 sub-components (animated variants)
├── servicesSection/               ServiceSection + 4 sub-components
├── chooseUsSection/               ChooseSection + 9 sub-components (animated variants)
├── testimonial&StarRating section/ TestimonialSection + 5 sub-components
├── footerSection/                 5 sub-components
├── serviceAvailabilityModal/      ServiceAvailabilityModal + 5 sub-components (3 states)
├── serviceDetails/                DynamicServiceDetailPage + 5 sub-components
├── booking/                       UnifiedBookingPage, BookingAuthGuard, BookingSummary,
│                                  BookingConfirmation, BookingStepper, DynamicBookingForm,
│                                  AddressSelector, TimeSlotSelector, PriceSummary,
│                                  SubmitButton, ConfirmButton, ErrorMessage, BookingDetailsForm
│   └── fields/                    FormField, FileField
├── adminDashboard/
│   ├── layout/                    AdminDashboardLayout (role-based auth guard, ADMIN-only), AdminHeader (displays logged-in admin user), AdminSidebar (logout clears localStorage + Redux)
│   ├── dashboard/                 AdminDashboard + overview, activeJobs, liveJobsMap, technicianApprovals, shared
│   ├── bookings/                  Bookings + list, details, actions, stats
│   ├── complaints/                Complaints + list, details, actions, stats
│   ├── customers/                 Customers + list, profile (5 sub-tabs)
│   ├── finance/                   Finance + overview, commission, payouts, transactions
│   ├── reviews/                   Reviews + list, details, stats
│   ├── services/                  Services + serviceList, categories, addService (5-step refactored form), manageService
│   ├── technicians/               Technicians + list, approvals, profile
│   └── shared/                    badges, cards, forms, modals, table, EmptyState
├── customerDashboard/
│   ├── layout/                    DashboardLayout (auth guard on mount), DashboardHeader (displays logged-in user from Redux/localStorage), DashboardSidebar (Services link, active state logic)
│   ├── overview/                  HeroBookingCard, ServiceProgress
│   ├── activeBooking/             ActiveBookingCard, BookingProgressTracker, BookingTechnicianCard
│   ├── recentBookings/            RecentBookings, RecentBookingRow
│   ├── bookings/                  BookingTable, BookingRow, StatusBadge
│   ├── quickRebook/               QuickRebook, RebookCard
│   ├── addresses/                 AddressList, AddressCard, AddAddressButton
│   ├── invoices/                  InvoiceTable, InvoiceSummaryCard, InvoiceRow, RecentInvoices
│   ├── profile/                   ProfileForm, ProfileAvatar, ChangePasswordCard
│   ├── support/                   SupportOverview, FAQSection, RaiseTicketForm, ContactCard
│   ├── favoriteTechnicians/       FavoriteTechnicians, TechnicianCard
│   ├── reviews/                   LatestReview
│   └── shared/                    DashboardCard, EmptyState, StatusBadge
├── dashboard/technician/          TechnicianDashboardLayout, TechnicianHeader, TechnicianSidebar
├── technicianApplication/
│   ├── layout/                    OnboardingLayout, OnboardingHeader, OnboardingFooter, OnboardingSidebar
│   ├── shared/                    FileUpload, FormInput, FormTextarea, ProgressIndicator, StepCard, StepNavigation
│   └── registration/
│       ├── personalInfo/          PersonalInfoForm + 7 sub-components + usePersonalInfoForm hook
│       ├── skillTagging/          SkillTaggingPage + 6 sub-components
│       ├── documentUpload/        DocumentUploadPage + 6 sub-components
│       ├── serviceArea/           ServiceArea + 6 sub-components + useServiceArea hook
│       ├── bankDetails/           BankDetailsSection + 8 sub-components
│       └── reviewSubmit/          ReviewSubmit + 7 components + useReviewSubmit hook + animations
├── technicianOnboarding/
│   ├── pendingVerification/       PendingVerificationFooter
│   └── verificationStatus/        VerificationStatusContainer, PendingStatus, ApprovedStatus,
│                                  ActionRequiredStatus + common/ (StatusCard, StatusIcon, StatusBadge, StatusActionButtons)
└── technicianStatus/              PendingStatus, types.ts
```

---

## 9. Hooks (`src/hooks/`)

| Hook | Status | Purpose |
|---|---|---|
| `useBookingAuth` | ✅ | Auth check + redirect to login |
| `useSignupForm` | ✅ | Signup validation + OTP flow (3-step: send OTP → verify → register) + auto-login + redirect |
| `useFormValidation` | ✅ | Generic form validation |
| `useActiveBooking` | ✅ | Customer dashboard active booking (mock) |
| `useFavoriteTechnicians` | ✅ | Customer dashboard favorites (mock) |
| `useInvoices` | ✅ | Customer invoices (mock) |
| `useLatestReview` | ✅ | Latest customer review (mock) |
| `useRecentBookings` | ✅ | Recent bookings list (mock) |
| `useCategoryManager` | ✅ | Admin category CRUD |
| `useServiceManager` | ✅ | Admin service CRUD |

---

## 10. Lib / Utilities (`src/lib/`)

| Path | Purpose |
|---|---|
| `lib/auth/redirectUtils.ts` | sessionStorage-based post-login redirect |
| `lib/booking/formatBookingData.ts` | Formats booking store data for display/submit |
| `lib/pricing/calculateACPrice.ts` | AC dynamic price calculation |
| `lib/pricing/calculateSolarPrice.ts` | Solar `panelCount × basePrice` calculation |
| `lib/utils/addressUtils.ts` | Address selection helpers |
| `lib/validation/bookingValidation.ts` | Booking form validation rules |
| `lib/validation/fileValidation.ts` | File upload size/type validation |
| `lib/validator/email.validator.ts` | Email regex |
| `lib/validator/password.validator.ts` | Password strength rules |
| `lib/validator/phone.validator.ts` | Phone number format |
| `lib/validator/pincode.validator.ts` | Pincode format |
| `lib/validator/signup.validator.ts` | Composite signup validator |

---

## 11. Key Types (`src/types/`)

| File | Key Types |
|---|---|
| `types/services.types.ts` | `Service`, `BookingFormField`, `BookingFormData` |
| `types/auth.types.ts` | `User`, `LoginRequest`, `LoginResponse`, `SignupFormData`, `SignupErrors`, `GenerateOtpRequest`, `GenerateOtpResponse`, `VerifyOtpRequest`, `VerifyOtpResponse`, `RegisterCustomerRequest`, `RegisterCustomerResponse`, `CustomerAddress` |
| `types/bookingTypes/bookingForm.types.ts` | `UnifiedBookingPageProps`, `TimeSlots`, `BookingStep`, `AddressOption` |
| `types/admin.types.ts` | `DashboardStat`, `Technician`, `ActiveJob`, `AdminProfile` |
| `types/admin/service.types.ts` | `AdminService`, `Category`, `Subcategory`, `ServiceStatus` |
| `types/invoicesTypes/invoice.types.ts` | `Invoice` |
| `types/addressTypes/address.types.ts` | `Address` |
| `types/technicianApplication/` | 8 files: bankDetails, documentUpload, onboarding, personalInfo, reviewSubmit, skillTagging, toolInventory, verification |
| `types/technicianOnboarding/serviceArea.types.ts` | `ServiceAreaState` |

---

## 12. Services Integration Status

### Customer-Facing Services (`/services` and homepage)

**Service Listing**
- ✅ GET endpoint integrated: `GET /users/service/all`
- ✅ Redux slice: `servicesSlice.ts` with `fetchServices` thunk used
- ✅ Loading state: Animated spinner with "Loading services..." message
- ✅ Error state: Red error card with retry button
- ✅ Empty state: "No Services Available" message when no active services
- ✅ Only shows services where `isActive === true`
- ✅ Maps backend `AdminService` → customer-facing `Service` format
- ✅ Falls back to placeholder image if `iconUrl` is missing
- ✅ Works on both `/services` page and homepage
- ✅ Links to `/services/[id]` for service details

**Service Detail Page (`/services/[slug]`)**
- ✅ SEO-friendly slug URLs (e.g., `/services/ac-service`, `/services/plumber-details`)
- ✅ Slug generated from service name: `name.toLowerCase().replace(/\s+/g, '-')`
- ✅ Looks up service ID by matching slug to service name
- ✅ GET endpoint integrated: `GET /users/service/:id` (fetches by ID after slug lookup)
- ✅ Redux thunk: `fetchServiceById(id)` stores service in `selectedService`
- ✅ Loads services list first (if not already loaded) to enable slug-to-ID lookup
- ✅ Loading state: Centered spinner
- ✅ Error state: Error card with retry button
- ✅ Empty state: "Service Not Found" with link to browse services
- ✅ Displays: name, description, iconUrl (with fallback), serviceBasePrice
- ✅ Hides internal pricing fields: perHourRate, perKmRate, surgeFactor, weekendMultiplier, peakHourMultiplier, distanceChargePerKm, freeDistanceKm
- ✅ Shows customer-focused pricing: base price, GST, platform fee, emergency charge
- ✅ "Book Now" button redirects to `/booking?serviceId={id}`
- ❌ Specifications display not implemented yet (backend doesn't return specifications field)
- ❌ Booking flow not integrated yet

**Data Mapping**
```typescript
AdminService (backend) → Service (customer UI - listing)
{
  id → id (converted to string)
  name → title, slug (kebab-case)
  description → description, overview
  image (iconUrl) → image
  price (serviceBasePrice) → price
  isActive → filtered (only show if true)
}

AdminService (backend) → ServiceDetailContent (detail page)
{
  id, name, description, image (iconUrl)
  price (serviceBasePrice) → displayed as "Starting From"
  gst, platformFee, emergencyCharge → shown as separate cards
  isActive → controls "Book Now" button availability
  // Hidden: perHourRate, perKmRate, surgeFactor, etc.
}
```

### Admin Service Management (`/dashboard/admin/services`)

**Service List (`/dashboard/admin/services`)**
- ✅ GET endpoint integrated: `GET /users/service/all`
- ✅ Normalizer handles backend shape: `ApiService` (with nested `pricingRule`) → `AdminService` (flattened)
- ✅ Double-wrapped response handling: `response.data.data.data[]` or `response.data.data[]`
- ✅ Redux slice: `servicesSlice.ts` with `fetchServices`, `createService`, `updateService` thunks
- ⚠️ Edit/Delete still use in-memory `ServiceContext` (not wired to API)

**Create Service (`/dashboard/admin/services/add`)**
- ✅ 2-step form: Service Info (name, description, icon, isActive) → Pricing (all fare fields)
- ✅ Multipart upload: If `icon` file provided, sends `FormData` with `Content-Type: multipart/form-data`
- ✅ JSON fallback: If no icon, sends JSON with `Content-Type: application/json`
- ✅ Backend endpoint: `POST /users/admin/service`
- ✅ Type-safe: `CreateServiceRequest` type matches form payload
- ❌ API not tested end-to-end yet (previous 500 errors from stale fields now fixed)

**Service Types (`types/admin/service.types.ts`)**
```typescript
CreateServiceRequest {
  name, description, icon, isActive,
  serviceBasePrice, perHourRate?, perKmRate?,
  platformFee?, gst?, emergencyCharge?
}

ApiService { // Backend response shape
  id, name, description?, iconUrl?, isActive?,
  pricingRule: { serviceBasePrice, perHourRate, ... }
}

AdminService { // UI shape (normalized)
  id, name, description, image, isActive,
  price, perHourRate, perKmRate, platformFee, gst, emergencyCharge,
  status, bookings
}
```

## 12. Constants & Mock Data (`src/constants/`)

All non-auth data (except admin services list) is still fully mocked here:

| Folder | Contents |
|---|---|
| `constants/services/` | `serviceData.ts` — 4 services with full booking form configs |
| `constants/admin/` | 15 files: bookings, customers, technicians, complaints, reviews, finance, dashboard stats, etc. |
| `constants/customerDashboard/dashboard/` | activeBooking, invoices, recentBookings, reviews, FavouriteTechnician, serviceProgress, rebookServices |
| `constants/customerDashboard/sidebar/` | sidebarLinks, dashboardStats |
| `constants/dashboard/` | addresses, bookings, faqs, invoices |
| `constants/booking/` | savedAddresses, timeSlots |
| `constants/technicianApplication/` | documentUpload, onboardingSteps, serviceAreaOptions, skillOptions, skillTagging |
| `constants/technician/` | navigationConfig |
| `constants/auth/` | loginContent, signupContent |
| `constants/hero/`, `chooseUs/`, `footer/`, `navigation/`, `testimonials/`, `serviceAvailability/` | Static UI content |

---

## 13. What's Complete vs Pending

### ✅ Completed (June 18, 2026 Update)
- **Service detail page with SEO-friendly URLs** — `/services/[slug]` uses slug URLs like `/services/ac-service` instead of `/services/16`. Slug is generated from service name (kebab-case). Page looks up service by slug from Redux services list, then fetches full details by ID from `GET /users/service/:id`. Shows loading/error/empty states. Displays name, description, iconUrl, base price, GST, platform fee, emergency charge. Hides internal pricing fields. "Book Now" button ready for future booking flow.
- **Customer-facing services integrated** — `/services` page and homepage now fetch from `GET /users/service/all`. Shows loading spinner, error state with retry, empty state. Only displays active services. No dependency on `serviceData.ts` for listing. Backend `AdminService` mapped to customer `Service` format. Service cards link to `/services/[slug]`.
- **Admin service creation simplified** — Form reduced from 5 steps to 2 steps (Service Info + Pricing). Removed stale fields that don't exist in backend API: `specifications`, `skills`, `tools`, `technicianInstructions`. Both JSON and multipart branches cleaned up in `service.service.ts`. No TypeScript errors.

### ✅ Completed
- **Full public site** (home, services)
- **Services listing and detail** — backend-integrated. Listing on `/services` page and homepage fetches from `GET /users/service/all`. Detail page `/services/[slug]` uses slug in URL (SEO-friendly) but fetches by ID from `GET /users/service/:id`. Shows loading/error/empty states, filters to active services only.
- **Login** — real API integrated (POST `/auth/login`, JWT stored, Redux auth state, invalid credentials banner, responsive)
- **Signup** — **real API integrated** (OTP flow: generate OTP → verify → register → auto-login → redirect to customer dashboard, responsive)
- **Auth guards** — `PublicRoute` prevents logged-in users from accessing `/`, `/login`, `/signup`; redirects to correct dashboard based on role (ADMIN → `/dashboard/admin`, CUSTOMER → `/dashboard/customer`)
- **Admin route protection** — `AdminDashboardLayout` guards all `/dashboard/admin/*` routes; checks token + `role === 'ADMIN'`; redirects non-admins to `/login`
- **Public navbar** — conditionally shows Login/Signup buttons OR Dashboard/Logout based on auth state; Dashboard button routes based on user role
- **Customer dashboard header** — displays logged-in user's name and initials from Redux/localStorage
- **Admin dashboard header** — displays logged-in admin's name and initials from Redux/localStorage
- **Admin sidebar logout** — clears Redux state + localStorage (tokens + user) → redirects to `/`
- **Customer dashboard sidebar** — includes "Services" link (active on `/services*`, `/booking*`), smart active state detection
- **Logout flow** — clears Redux state + localStorage (tokens + user) → redirects to `/`
- **Admin service creation** — simplified to **2-step backend-aligned form**: Service Info (name, description, icon upload, active toggle) → Pricing (serviceBasePrice, perHourRate, perKmRate, platformFee, GST, emergencyCharge). All stale fields removed (specifications, skills, tools, technicianInstructions).
- **Material Symbols icon flash fix** — changed `display=optional` to `display=swap` + CSS `font-size:0` hide-during-load pattern in `globals.css`
- **Hydration fixes** — `<body suppressHydrationWarning>` for browser extension attributes; `<motion.p>` → `<motion.div>` in `ContactHero`
- **`ServiceProvider`** mounted in admin layout — wraps all `/dashboard/admin/*` routes
- Booking flow UI (all steps complete, API not wired)
- Customer dashboard (all 6 sections, mock data)
- Admin dashboard (all 9 sections, mock data)
- Technician dashboard (main + nearby jobs, mock data)
- Technician onboarding (all 7 steps, UI complete)
- All form validators (including letters-only validation for names)
- All pricing calculation logic
- Redux Toolkit store setup (auth slice live)
- Axios instance + endpoints config

### 🔶 In Progress / Partial
- `/technicianOnboarding/pending-verification` — status hardcoded to `'pending'`
- `/dashboard/admin/finance/edit` — stub save callbacks
- `ServiceContext` — in-memory CRUD, no API persistence
- `customerDashboard.service.ts` — mock returns, no HTTP
- Redux slices `bookingSlice`, `onboardingSlice` — scaffolded, not wired to UI
- RTK Query services (`authApi`, `bookingApi`, `serviceApi`, `userApi`) — empty files

### ❌ Pending / Skeleton
- `/services/[category]/[service]` — directory only, no `page.tsx`
- `/dashboard/customer/bookings/[id]` — no booking detail content
- `/dashboard/technician/profile` — disabled placeholder inputs, no save
- `src/services/booking.service.ts` — completely empty
- `redux/legacy/customerDashboardStore.ts` — empty, superseded by Redux
- `redux/legacy/useSidebarStore.ts` — empty, never implemented
- All non-auth API integration (bookings, profile, technicians, admin)

### ⚠️ Dead Code (safe to delete)
- `src/dashboard/` — abandoned earlier architecture, not used by any route

---

## 14. Next Development Priorities

1. **Booking flow backend** — Integrate booking submission with POST endpoint, update to use `serviceId` instead of `slug`
2. **Customer booking detail** — Build out `/dashboard/customer/bookings/[id]`
3. **Technician profile** — Enable edit + save on `/dashboard/technician/profile`
4. **Technician auth guard** — Protect `/dashboard/technician/*` routes (same pattern as admin/customer, `role === 'TECHNICIAN'`)
5. **Pending verification** — Wire `/technicianOnboarding/pending-verification` to status API
6. **RTK Query services** — Implement `bookingApi`, `userApi` in `src/redux/services/`
7. **Services category route** — Add `page.tsx` for `/services/[category]/[service]`
8. **Admin service edit/delete API** — Wire edit modal + delete action to real `PATCH /users/admin/service/:id` and `DELETE /users/admin/service/:id` endpoints
9. **Admin service creation testing** — Test end-to-end `POST /users/admin/service` with both icon (multipart) and no-icon (JSON) scenarios
10. **Clean up dead code** — Delete `src/dashboard/` folder and `src/redux/legacy/`

---

## 15. Development Notes

- **Auth is fully live.** Login AND signup both call real APIs:
  - **Login**: `POST /auth/login` → JWT tokens stored in `localStorage` + Redux
  - **Signup**: 3-step flow → `POST /auth/generate-otp` → OTP modal → `POST /auth/verify-otp` → `POST /users/register` (multipart) → auto-login → redirect to customer dashboard
  - **Customer role**: Signup always uses `role: "CUSTOMER"` (hardcoded, no role selector)
- **Auth state hydration**: Redux state is empty on page refresh. Components check `localStorage.getItem('accessToken')` and `localStorage.getItem('user')` as fallback until Redux rehydrates. This prevents flashing of unauthenticated UI.
- **Auth guards**:
  - `PublicRoute` wraps `/`, `/login`, `/signup` → reads user role from Redux/localStorage, redirects to `/dashboard/admin` (ADMIN) or `/dashboard/customer` (CUSTOMER)
  - `DashboardLayout` wraps all `/dashboard/customer/*` routes → redirects unauthenticated users to `/login`
  - `AdminDashboardLayout` wraps all `/dashboard/admin/*` routes → checks token + `role === 'ADMIN'`; redirects non-admins/unauthenticated to `/login`
  - All layout guards run only on mount (`useEffect` with empty deps `[]`) to avoid interfering with logout redirects
- **Admin route protection**: Same pattern as customer — mount-only `useEffect`, rehydrates Redux from `localStorage`, role check before allowing render
- **Logout flow**: Sidebar logout buttons (both customer + admin) clear `localStorage` (accessToken, refreshToken, user) + dispatch Redux `logout()` + redirect to `/`
- **Public navbar**: Dashboard button routes to `/dashboard/admin` or `/dashboard/customer` based on role read from `localStorage`
- **Admin service creation form** — **2-step flow** maps to backend contract:
  - Step 1 (Service Info): `name`, `description`, `icon` (File upload), `isActive` (toggle)
  - Step 2 (Pricing): `serviceBasePrice`, `perHourRate`, `perKmRate`, `platformFee`, `gst`, `emergencyCharge`
  - **Removed fields**: `specifications[]`, `skills`, `tools`, `technicianInstructions` (no longer in backend API)
  - Form submits on step 2 completion (no separate publish step needed)
- **Material Symbols font flash**: Fixed by `display=swap` on Google Fonts link + `.material-symbols-outlined { font-size: 0 }` CSS rule that hides raw text during load; `@supports` block restores size once font is available
- **ServiceProvider context**: Mounted in `/dashboard/admin/layout.tsx` — wraps all admin routes so `useServices()` is always available
- **Post-login redirect** uses `sessionStorage` via `lib/auth/redirectUtils.ts`.
- **All other data is mocked** — bookings, customers, technicians (not service listings anymore), etc. still come from `src/constants/`.
- **Redux over Zustand** — old `src/store/` folder is gone. State lives in `src/redux/`. Legacy Zustand files are in `src/redux/legacy/` for reference. Services reducer wired and active.
- **Service listing** — `/services` page and homepage use `GET /users/service/all` via Redux `fetchServices` thunk. Only active services shown. Falls back to placeholder image if no `iconUrl`. Service cards link to `/services/[slug]` using SEO-friendly slugs.
- **Service detail pages** — `/services/[slug]` uses SEO-friendly slug URLs (e.g., `/services/ac-service`). Slug is generated from service name as kebab-case. Page looks up service ID by matching slug, then fetches details via `GET /users/service/:id` using Redux `fetchServiceById` thunk. Shows name, description, image, base price, GST, platform fee, emergency charge. Hides internal pricing fields. "Book Now" button ready.
- **Dynamic pricing** is client-side in `lib/pricing/`. AC and Solar have custom engines; Electrical and Plumbing are fixed-price.
- **Tailwind v4 syntax** — `@import "tailwindcss"` + `@theme inline { ... }` in `globals.css`. No `tailwind.config.js`.
- **MUI + Tailwind** coexist — MUI for complex components (tables, drawers, modals), Tailwind for layout and custom styles.
- **pnpm** — always use `pnpm`, not `npm` or `yarn`.
- **Auth pages responsive** — Login and signup forms hide left image panel on mobile (`hidden lg:flex`), form fills full screen on small devices.
- **Form validation**: Signup form validates names with letters-only regex (`/^[A-Za-z\s'-]+$/`), email, phone, password strength
- **OTP modal**: 6-digit input boxes, paste support, backspace navigation, 30s resend countdown, separate error state from form errors
- **ESLint fixes applied**:
  - Use `setTimeout` defer pattern for `setState` in `useEffect` to avoid React hooks ESLint errors
  - Prefix intentionally unused function params with `_` (e.g., `_e`, `_index`)
  - Remove `console.log` statements from production code
  - Escape HTML entities in JSX strings (`&apos;`, `&quot;`)
  - Replace `any` types with proper TypeScript types

---

*Update this file whenever a module status changes, a new route is added, or an API is integrated.*
