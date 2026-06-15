# HiChandra Frontend — Master Project Context

> **Last updated:** June 15, 2026
> **Purpose:** Permanent handoff document. Paste this file into any new chat to restore full project context instantly.

---

## 1. Project Overview

**HiChandra** is a home-services platform (think Urban Company / Housejoy) that connects customers with technicians for services like AC servicing, solar panel cleaning, electrical, and plumbing.

The frontend is a **UI-complete, backend-less** Next.js app. All data is currently mocked via constants. The next major phase is **backend integration**.

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
| State Management | Zustand v5 |
| Package Manager | pnpm |
| React Compiler | Enabled (`babel-plugin-react-compiler 1.0.0`) |
| Fonts | Geist + Geist Mono (`next/font/google`) |

**Config notes:**
- `next.config.ts` → `reactCompiler: true`, `turbopack` enabled, `allowedDevOrigins: ['192.168.1.17']`
- Google profile images whitelisted for `next/image`
- ESLint + Prettier configured; `eslint-plugin-simple-import-sort` and `eslint-plugin-unused-imports` active

---

## 3. Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # All UI components (deeply nested by domain)
│   ├── store/                  # Zustand stores + React Context
│   ├── services/               # API service layer (currently empty/mock)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities (validation, pricing, auth redirects)
│   ├── types/                  # TypeScript type definitions (per domain)
│   ├── constants/              # All mock data (the current "backend")
│   ├── data/                   # Additional mock datasets
│   └── dashboard/              # ⚠️ DEAD CODE — legacy abandoned folder
├── public/
│   └── images/
│       └── services/           # Service images (solar, ac, electrical, plumbing, home-cleaning)
```

---

## 4. Routes & Status

### Public

| Route | Component | Status |
|---|---|---|
| `/` | `HeroSection`, `ServiceSection`, `ChooseSection`, `TestimonialSection` | ✅ Complete |
| `/login` | `LoginForm` | ✅ Complete (mock auth only) |
| `/signup` | `SignupForm` | ✅ Complete (mock auth only) |
| `/services` | `ServiceSection` | ✅ Complete |
| `/services/[slug]` | Dynamic service detail page | ✅ Complete (4 services via `generateStaticParams`) |
| `/services/[category]/[service]` | — | ❌ Directory exists, no `page.tsx` |

### Booking Flow

| Route | Status | Notes |
|---|---|---|
| `/booking` | ✅ Complete | `BookingAuthGuard` + `UnifiedBookingPage` (3-step: address → slot → details) |
| `/booking/summary` | ✅ Complete | Full price breakdown + confirmation trigger |
| `/booking/confirmation` | ✅ Complete | Success screen via `BookingConfirmation` component |
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
| `/technicianOnboarding/pending-verification` | — | 🔶 Hardcoded `'pending'` status — needs backend |
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
| `/dashboard/technician` | ✅ Complete | Stats, job cards, active job tracker, earnings chart, loyalty — all mock |
| `/dashboard/technician/nearby-jobs` | ✅ Complete | `useNearbyJobs` hook, filters, search, job cards |
| `/dashboard/technician/profile` | ❌ Skeleton | Disabled static inputs, no save functionality |

---

## 5. Services (Data / Domain)

4 services are fully defined in `src/constants/services/serviceData.ts`:

| Slug | Title | Pricing Engine |
|---|---|---|
| `solar-panel-cleaning` | Solar Cleaning | Dynamic (`panelCount × basePrice + propertyType addon`) |
| `ac-servicing` | AC Servicing | By service type selection |
| `electrical-servicing` | Electrical Servicing | Fixed |
| `plumber-servicing` | Plumber Servicing | Fixed |

Each service definition includes: `bookingForm[]` field configs, `formConfig.pricingEngine`, `includes[]`, and `overview` text.

---

## 6. State Management

| Store | File | Status | Notes |
|---|---|---|---|
| `useAuthStore` | `src/store/useAuthStore.ts` | 🔶 Mock | `isAuthenticated: true` hardcoded, dummy user `Akash` — **needs real API** |
| `useBookingStore` | `src/store/bookingStore.ts` | ✅ Complete | Holds full booking state: service, price, address, slot, service-specific data |
| `ServiceContext` | `src/store/ServiceContext.tsx` | ✅ Complete | Admin service CRUD context (in-memory only) |
| `customerDashboardStore` | `src/store/customerDashboardStore.ts` | ❌ Empty file | Needs implementation |
| `useSidebarStore` | `src/store/useSidebarStore.ts` | ❌ Empty file | Needs implementation |

---

## 7. Services / API Layer

> ⚠️ **There are ZERO real API calls in the project.** Everything is mocked.

| File | Status |
|---|---|
| `src/services/booking.service.ts` | ❌ Empty — no implementation |
| `src/services/customerDashboard/customerDashboard.service.ts` | 🔶 Mock only — returns from constants |

**All data lives in:** `src/constants/` and `src/data/`

---

## 8. Hooks

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

## 9. Lib / Utilities

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

## 10. Key Types

| File | Key Types |
|---|---|
| `types/services.types.ts` | `Service`, `BookingFormField`, `BookingFormData` |
| `types/auth.types.ts` | `SignupFormData`, `SignupErrors`, `SignupFieldsProps` |
| `types/bookingTypes/bookingForm.types.ts` | `UnifiedBookingPageProps`, `TimeSlots`, `BookingStep`, `AddressOption` |
| `types/admin.types.ts` | `DashboardStat`, `Technician`, `ActiveJob`, `AdminProfile` |
| `types/admin/service.types.ts` | `AdminService`, `Category`, `Subcategory`, `ServiceStatus` |
| `types/invoicesTypes/invoice.types.ts` | `Invoice` |
| `types/addressTypes/address.types.ts` | `Address` |
| `types/technicianApplication/` | 8 files covering full onboarding domain |

---

## 11. What's Complete vs Pending

### ✅ Completed (UI-ready, needs only backend wiring)
- Full public site (home, services, service detail pages)
- Booking flow (service selection → address → slot → summary → confirmation)
- Customer dashboard (all 6 sections)
- Admin dashboard (all 9 sections)
- Technician dashboard (main + nearby jobs)
- Technician onboarding (all 7 steps)
- All form validators
- All pricing calculation logic
- Auth forms (login + signup UI)

### 🔶 In Progress / Partial
- `useAuthStore` — UI wired, API call missing
- `/technicianOnboarding/pending-verification` — status hardcoded to `'pending'`
- `/dashboard/admin/finance/edit` — stub save callbacks
- `ServiceContext` — in-memory CRUD, no API persistence
- `customerDashboard.service.ts` — mock returns, no HTTP

### ❌ Pending / Empty / Skeleton
- `/services/[category]/[service]` — directory only, no `page.tsx`
- `/dashboard/customer/bookings/[id]` — no booking detail content
- `/dashboard/technician/profile` — disabled placeholder inputs
- `src/services/booking.service.ts` — completely empty
- `src/store/customerDashboardStore.ts` — empty file
- `src/store/useSidebarStore.ts` — empty file
- All real API integration (auth, bookings, technicians, admin)

### ⚠️ Dead Code (do not touch)
- `src/dashboard/` — entire folder is an abandoned earlier architecture. Not used by any route. Safe to delete.

---

## 12. Next Development Priorities

1. **Backend API integration** — Connect `useAuthStore` to real login/signup/logout endpoints
2. **Booking service** — Implement `src/services/booking.service.ts` with real POST/GET calls
3. **Customer booking detail** — Build out `/dashboard/customer/bookings/[id]`
4. **Technician profile** — Enable edit + save on `/dashboard/technician/profile`
5. **Pending verification** — Wire `/technicianOnboarding/pending-verification` to actual status API
6. **Sidebar + dashboard stores** — Implement the two empty Zustand stores
7. **Services category route** — Add `page.tsx` for `/services/[category]/[service]`
8. **Clean up dead code** — Delete `src/dashboard/` folder

---

## 13. Development Notes

- **Auth is fully simulated.** `useAuthStore.isAuthenticated` is hardcoded `true` with dummy user `{ id: '1', name: 'Akash', email: 'akash@test.com' }`. Login/Signup forms call `store.login()` directly — no HTTP.
- **Post-login redirect** uses `sessionStorage` via `lib/auth/redirectUtils.ts` to restore intended destination after auth.
- **Service data** drives both public pages and booking forms. Adding a new service means adding an entry to `src/constants/services/serviceData.ts`.
- **Dynamic pricing** is handled client-side in `lib/pricing/`. AC and Solar have custom engines; Electrical and Plumbing are fixed-price.
- **Tailwind v4 syntax** — uses `@import "tailwindcss"` and `@theme inline { ... }` blocks in `globals.css`. Not the classic `tailwind.config.js` approach.
- **MUI + Tailwind** coexist — MUI handles complex components (tables, drawers, modals), Tailwind handles layout and custom styles.
- **pnpm** — always use `pnpm` not `npm` or `yarn` for installing packages.

---

*This document was auto-generated by analyzing the full project structure. Update this file whenever a module status changes.*
