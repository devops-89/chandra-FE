# Codex Change Plan

This document summarizes the code changes that would be applied across the current frontend auth, redirect, and dashboard flow files.

## Scope

The affected files are:

- `src/api/axios.ts`
- `src/api/endpoints.ts`
- `src/app/dashboard/technician/layout.tsx`
- `src/components/adminDashboard/layout/AdminDashboardLayout.tsx`
- `src/components/adminDashboard/layout/AdminSidebar.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/PublicRoute.tsx`
- `src/components/common/PublicNavbar.tsx`
- `src/components/customerDashboard/layout/DashboardLayout.tsx`
- `src/components/customerDashboard/layout/DashboardSidebar.tsx`
- `src/components/technicianApplication/registration/reviewSubmit/hooks/useReviewSubmit.ts`
- `src/hooks/useOnboardingGuard.ts`
- `src/hooks/useSignupForm.ts`
- `src/lib/authApi/redirectUtils.ts`
- `src/redux/Provider.tsx`
- `src/redux/slices/authSlice.ts`
- `src/services/auth.service.ts`

## Planned Changes

### 1. API client and endpoint cleanup

- Keep authentication state in memory through `src/api/axios.ts` and use the refresh-token flow to restore sessions.
- Normalize the request/response refresh handling so 401 retries, token queueing, and redirect-to-login behavior stay consistent.
- Consolidate endpoint constants in `src/api/endpoints.ts` so login, logout, refresh, profile, and user-service routes stay aligned with the backend contract.
- Reduce formatting drift in the API layer while preserving the current behavior.

### 2. Auth bootstrap and Redux sync

- Keep `src/redux/Provider.tsx` responsible for silent session restoration on app start.
- Keep `src/redux/slices/authSlice.ts` as the single source of truth for authenticated user state while syncing the in-memory access token.
- Preserve the `auth:tokenRefreshed` event bridge so Axios refreshes can update Redux without circular imports.

### 3. Redirect and route guard behavior

- Keep `src/lib/authApi/redirectUtils.ts` as the central redirect resolver for admin, technician, and customer routes.
- Maintain role-aware post-login routing so stored redirect paths are only used when they are safe for the signed-in role.
- Preserve technician-specific onboarding redirects and the onboarding progress sync path.
- Ensure `src/hooks/useOnboardingGuard.ts` continues to block dashboard access until the technician profile is approved.

### 4. Login, signup, and logout flows

- Keep `src/components/auth/LoginForm.tsx` and `src/hooks/useSignupForm.ts` aligned with the current auth contract.
- Continue writing the user object to `localStorage` while keeping the access token out of persistent storage.
- Preserve auto-login after customer signup and technician redirect resolution after login.
- Keep logout best-effort through the backend and clear local auth state on the client.

### 5. Dashboard access protection

- Keep `src/components/customerDashboard/layout/DashboardLayout.tsx` and `src/components/adminDashboard/layout/AdminDashboardLayout.tsx` redirecting unauthenticated or wrongly scoped users away from protected areas.
- Preserve the technician dashboard wrapper in `src/app/dashboard/technician/layout.tsx` so onboarding and approval checks run before rendering.
- Maintain the sidebar/logout interactions in the customer and admin dashboard layouts.

### 6. Supporting service calls

- Keep `src/services/auth.service.ts` as the thin API wrapper for login, OTP, profile, registration, and logout requests.
- Preserve multipart handling for customer and technician registration payloads.
- Keep the service layer consistent with the endpoint map and token refresh flow.

## Expected Outcome

After these changes, the frontend should have:

- one consistent auth/token flow,
- role-aware redirects for admin, technician, and customer users,
- guarded dashboard routes that respect onboarding state,
- and a cleaner API surface for login, refresh, and profile calls.

## Notes

This document is descriptive only. It does not change runtime behavior by itself; it is meant to capture the intended Codex work for the current codebase snapshot.
