# HiChandra Frontend — Master Project Context

> **Last updated:** June 16, 2026
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
| `endpoints.ts` | Central endpoint constants — `LOGIN`, `GENERATE_OTP`, `VERIFY_OTP` |

### `src/services/` — REST Service Functions
| File | Status | Notes |
|---|---|---|
| `auth.service.ts` | ✅ **Live** | `loginService()` → POST `/auth/login` via Axios |
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
| `/` | `HeroSection`, `ServiceSection`, `ChooseSection`, `TestimonialSection` | ✅ Complete |
| `/login` | `LoginForm` | ✅ Complete — **real API** (`loginService` → POST `/auth/login`) |
| `/signup` | `SignupForm` | ✅ Complete — mock auth only |
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
| `/dashboard/customer` | ✅ Complete | Stats cards, active booking, recent bookings, quick rebook |
| `/dashboard/customer/bookings` | ✅ Complete | Table with mock data |
| `/dashboard/customer/bookings/[id]` | ❌ Skeleton | Only shows booking ID, no detail content |
| `/dashboard/customer/addresses` | ✅ Complete | Address list + add/edit |
| `/dashboard/customer/invoices` | ✅ Complete | Invoice summary + table |
| `/dashboard/customer/profile` | ✅ Complete | Profile form + change password |
| `/dashboard/customer/support` | ✅ Complete | FAQ + raise ticket + contact card |

### Admin Dashboard

| Route | Status | Notes |
|---|---|---|
| `/dashboard/admin` | ✅ Complete | Stats, approval queue, revenue trend, live map |
| `/dashboard/admin/bookings` | ✅ Complete | Table, filters, timeline drawer, row actions |
| `/dashboard/admin/complaints` | ✅ Complete | Table + assign/resolve/refund modals |
| `/dashboard/admin/customers` | ✅ Complete | Table + profile drawer with sub-tabs |
| `/dashboard/admin/technicians` | ✅ Complete | Table + approval queue + profile drawer |
| `/dashboard/admin/services` | ✅ Complete | Table + add/edit/delete modals |
| `/dashboard/admin/services/add` | ✅ Complete | 5-step form (BasicInfo → Pricing → Publish) |
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
├── auth/                          LoginForm, SignupForm
├── common/                        PublicNavbar, PublicFooter, NavbarLinks, NavbarLogo, MobileMenu, AvatarGroup
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
│   ├── layout/                    AdminDashboardLayout, AdminHeader, AdminSidebar
│   ├── dashboard/                 AdminDashboard + overview, activeJobs, liveJobsMap, technicianApprovals, shared
│   ├── bookings/                  Bookings + list, details, actions, stats
│   ├── complaints/                Complaints + list, details, actions, stats
│   ├── customers/                 Customers + list, profile (5 sub-tabs)
│   ├── finance/                   Finance + overview, commission, payouts, transactions
│   ├── reviews/                   Reviews + list, details, stats
│   ├── services/                  Services + serviceList, categories, addService (5-step form), manageService
│   ├── technicians/               Technicians + list, approvals, profile
│   └── shared/                    badges, cards, forms, modals, table, EmptyState
├── customerDashboard/
│   ├── layout/                    DashboardLayout, DashboardHeader, DashboardSidebar
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
| `useSignupForm` | ✅ | Signup validation + store + redirect |
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
| `types/auth.types.ts` | `User`, `LoginRequest`, `LoginResponse`, `SignupFormData`, `SignupErrors` |
| `types/bookingTypes/bookingForm.types.ts` | `UnifiedBookingPageProps`, `TimeSlots`, `BookingStep`, `AddressOption` |
| `types/admin.types.ts` | `DashboardStat`, `Technician`, `ActiveJob`, `AdminProfile` |
| `types/admin/service.types.ts` | `AdminService`, `Category`, `Subcategory`, `ServiceStatus` |
| `types/invoicesTypes/invoice.types.ts` | `Invoice` |
| `types/addressTypes/address.types.ts` | `Address` |
| `types/technicianApplication/` | 8 files: bankDetails, documentUpload, onboarding, personalInfo, reviewSubmit, skillTagging, toolInventory, verification |
| `types/technicianOnboarding/serviceArea.types.ts` | `ServiceAreaState` |

---

## 12. Constants & Mock Data (`src/constants/`)

All non-auth data is still fully mocked here:

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

### ✅ Completed
- Full public site (home, services, service detail pages)
- Login — **real API integrated** (POST `/auth/login`, JWT stored, Redux auth state)
- Booking flow UI (all steps complete, API not wired)
- Customer dashboard (all 6 sections, mock data)
- Admin dashboard (all 9 sections, mock data)
- Technician dashboard (main + nearby jobs, mock data)
- Technician onboarding (all 7 steps, UI complete)
- All form validators
- All pricing calculation logic
- Redux Toolkit store setup (auth slice live)
- Axios instance + endpoints config
- `LoginForm` — responsive (left panel hidden on mobile), invalid credentials banner

### 🔶 In Progress / Partial
- `signupForm` — UI wired, API call missing (still calls mock)
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

1. **Signup API** — Wire `SignupForm` to a real `POST /auth/register` endpoint
2. **Booking service** — Implement `src/services/booking.service.ts` (POST booking, GET booking list/detail)
3. **Customer booking detail** — Build out `/dashboard/customer/bookings/[id]`
4. **Technician profile** — Enable edit + save on `/dashboard/technician/profile`
5. **Pending verification** — Wire `/technicianOnboarding/pending-verification` to status API
6. **RTK Query services** — Implement `bookingApi`, `userApi`, `serviceApi` in `src/redux/services/`
7. **Services category route** — Add `page.tsx` for `/services/[category]/[service]`
8. **Clean up dead code** — Delete `src/dashboard/` folder and `src/redux/legacy/`

---

## 15. Development Notes

- **Auth is live.** Login calls `POST /auth/login` via Axios. JWT tokens stored in `localStorage` (`accessToken`, `refreshToken`, `user`). Redux `authSlice` holds the session state. `DashboardLayout` restores auth state from `localStorage` on refresh.
- **Signup is still mock.** `SignupForm` calls `store.login()` directly — needs `POST /auth/register` wired.
- **Post-login redirect** uses `sessionStorage` via `lib/auth/redirectUtils.ts`.
- **All other data is mocked** — bookings, customers, technicians, services, etc. still come from `src/constants/`.
- **Redux over Zustand** — old `src/store/` folder is gone. State lives in `src/redux/`. Legacy Zustand files are in `src/redux/legacy/` for reference.
- **Service data** drives public pages and booking forms. Adding a new service = add entry to `src/constants/services/serviceData.ts`.
- **Dynamic pricing** is client-side in `lib/pricing/`. AC and Solar have custom engines; Electrical and Plumbing are fixed-price.
- **Tailwind v4 syntax** — `@import "tailwindcss"` + `@theme inline { ... }` in `globals.css`. No `tailwind.config.js`.
- **MUI + Tailwind** coexist — MUI for complex components (tables, drawers, modals), Tailwind for layout and custom styles.
- **pnpm** — always use `pnpm`, not `npm` or `yarn`.
- **Login page** — left panel (image) is hidden on mobile (`hidden lg:flex`), form fills full screen on small devices.

---

*Update this file whenever a module status changes, a new route is added, or an API is integrated.*
