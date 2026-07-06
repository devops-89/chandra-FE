# Last-Time File Change Report

Generated on: 2026-07-03 11:00:46 +05:30

This report captures the most recent commit that touched each requested file, plus the exact file-level diff from that commit.

---

## File: src/hooks/useOnboardingGuard.ts

- Commit: 816617a646111d49eef292e031e94460336304bf
- Date: 2026-07-02 13:46:20 +0530
- Author: Akash God
- Message: logged-in user stuck on their dashboard only after clear the urls too.
- Line changes in this file: +2 / -2

### What Changed (Exact Diff)

```diff
diff --git a/frontend/src/hooks/useOnboardingGuard.ts b/frontend/src/hooks/useOnboardingGuard.ts
index b809a695..ba6e6ed2 100644
--- a/frontend/src/hooks/useOnboardingGuard.ts
+++ b/frontend/src/hooks/useOnboardingGuard.ts
@@ -21,7 +21,7 @@ import { getProfileService } from '@/services/auth.service';
  * When NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK === 'false' (dev): no redirects.
  *
  * Progress restoration:
- *   On every mount, if the user has a valid accessToken, we fetch GET /auth/profile
+ *   On every mount, if a logged-in user record is present, we fetch GET /auth/profile
  *   and call syncProgressFromProfile() to rebuild the bitmask from backend data.
  *   This handles:
  *     1. First visit after login (bitmask never seeded)
@@ -34,7 +34,7 @@ const STORAGE_KEY = 'technician_onboarding_progress';
 
 function needsSync(): boolean {
   if (typeof window === 'undefined') return false;
-  if (!localStorage.getItem('accessToken')) return false;   // not logged in
+  if (!localStorage.getItem('user')) return false;   // not logged in
   const raw = localStorage.getItem(STORAGE_KEY);
   if (raw === null) return true;                             // key wiped
   if (parseInt(raw, 10) === 0) return true;                 // mask is 0 ΓÇö may be stale
```

---

## File: src/types/auth.types.ts

- Commit: eaadac419887eed398acadac43359c3495299ae1
- Date: 2026-07-01 15:59:52 +0530
- Author: Akash God
- Message: feat: technician auth, onboarding flow, dynamic booking, service updates
- Line changes in this file: +2 / -1

### What Changed (Exact Diff)

```diff
diff --git a/frontend/src/types/auth.types.ts b/frontend/src/types/auth.types.ts
index 4162cdc0..4890d19f 100644
--- a/frontend/src/types/auth.types.ts
+++ b/frontend/src/types/auth.types.ts
@@ -41,7 +41,8 @@ export interface User {
 // ΓöÇΓöÇΓöÇ Login ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
 
 export interface LoginRequest {
-  email: string;
+  email?: string;
+  phone?: string;
   password: string;
 }
 
```

---

## File: src/lib/authApi/redirectUtils.ts

- Commit: 89b03678c157f2e8492ccf3918f79b87e60a9f83
- Date: 2026-06-29 13:16:01 +0530
- Author: Akash God
- Message: implement technician onboarding registration flow including skill tagging, document upload, and review submission components
- Line changes in this file: +14 / -12

### What Changed (Exact Diff)

```diff
diff --git a/frontend/src/lib/authApi/redirectUtils.ts b/frontend/src/lib/authApi/redirectUtils.ts
index e3d5c2c8..30ea1731 100644
--- a/frontend/src/lib/authApi/redirectUtils.ts
+++ b/frontend/src/lib/authApi/redirectUtils.ts
@@ -76,12 +76,12 @@ export function handlePostAuthRedirect(role?: string | null): string {
 // ΓöÇΓöÇΓöÇ Technician-specific redirect ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
 // Imported lazily to avoid circular deps ΓÇö called only from LoginForm for TECHNICIAN role.
 
-import type { ApiTechnicianProfileData } from '@/types/auth.types';
 import {
   firstIncompleteRoute,
   isOnboardingComplete,
   syncProgressFromProfile,
 } from '@/lib/onboarding/onboardingProgress';
+import type { ApiTechnicianProfileData } from '@/types/auth.types';
 
 /**
  * Determines where to redirect a TECHNICIAN after login based on live profile data.
@@ -109,18 +109,20 @@ export function getTechnicianRedirectPath(params: {
   // Always sync bitmask from backend ΓÇö overwrites any stale localStorage state.
   // This is the key to surviving localStorage.clear() ΓÇö every login re-syncs.
   syncProgressFromProfile({
-    id:              technicianProfile.id,
-    skills:          technicianProfile.skills,
-    aadharUrl:       technicianProfile.aadharUrl,
-    panUrl:          technicianProfile.panUrl,
-    policeCertUrl:   technicianProfile.policeCertUrl,
-    tradeLicenseUrl: technicianProfile.tradeLicenseUrl,
-    selfieUrl:       technicianProfile.selfieUrl,
-    serviceAreas:    technicianProfile.serviceAreas,
+    id:                technicianProfile.id,
+    services:          technicianProfile.services,
+    yearsOfExperience: technicianProfile.yearsOfExperience,
+    languages:         technicianProfile.languages,
+    aadharUrl:         technicianProfile.aadharUrl,
+    panUrl:            technicianProfile.panUrl,
+    policeCertUrl:     technicianProfile.policeCertUrl,
+    tradeLicenseUrl:   technicianProfile.tradeLicenseUrl,
+    selfieUrl:         technicianProfile.selfieUrl,
+    serviceAreas:      technicianProfile.serviceAreas,
     accountHolderName: technicianProfile.accountHolderName,
-    accountNumber:   technicianProfile.accountNumber,
-    ifscCode:        technicianProfile.ifscCode,
-    status:          technicianProfile.status,
+    accountNumber:     technicianProfile.accountNumber,
+    ifscCode:          technicianProfile.ifscCode,
+    status:            technicianProfile.status,
   });
 
   // 2. Submitted for admin review
```

---

## File: src/components/auth/LoginForm.tsx

- Commit: 816617a646111d49eef292e031e94460336304bf
- Date: 2026-07-02 13:46:20 +0530
- Author: Akash God
- Message: logged-in user stuck on their dashboard only after clear the urls too.
- Line changes in this file: +1 / -2

### What Changed (Exact Diff)

```diff
diff --git a/frontend/src/components/auth/LoginForm.tsx b/frontend/src/components/auth/LoginForm.tsx
index 2226be7b..874afd05 100644
--- a/frontend/src/components/auth/LoginForm.tsx
+++ b/frontend/src/components/auth/LoginForm.tsx
@@ -74,8 +74,7 @@ export const LoginForm = () => {
 
       const { user, tokens } = response.data;
 
-      localStorage.setItem('accessToken', tokens.accessToken);
-      localStorage.setItem('refreshToken', tokens.refreshToken);
+      // Persist only the user profile. Tokens stay out of localStorage.
       localStorage.setItem('user', JSON.stringify(user));
 
       dispatch(
```

---

## File: src/app/technician/onboarding/register/page.tsx

- Commit: 185dfd35c2afbf7ed2d67dfe9b6bcc80068467af
- Date: 2026-06-25 18:52:57 +0530
- Author: Akash God
- Message: url changed and steps lock enable in env
- Line changes in this file: +14 / -0

### What Changed (Exact Diff)

```diff
diff --git a/frontend/src/app/technician/onboarding/register/page.tsx b/frontend/src/app/technician/onboarding/register/page.tsx
new file mode 100644
index 00000000..734de38f
--- /dev/null
+++ b/frontend/src/app/technician/onboarding/register/page.tsx
@@ -0,0 +1,14 @@
+import OnboardingLayout from '@/components/technicianApplication/layout/OnboardingLayout';
+import Heading from '@/components/technicianApplication/registration/personalInfo/Heading';
+import PersonalInfoForm from '@/components/technicianApplication/registration/personalInfo/PersonalInfoForm';
+
+export default function RegisterRoute() {
+  return (
+    <OnboardingLayout currentStep={0}>
+      <div className="max-w-4xl">
+        <Heading />
+        <PersonalInfoForm />
+      </div>
+    </OnboardingLayout>
+  );
+}
```

---

## File: src/app/dashboard/technician/layout.tsx

- Commit: 185dfd35c2afbf7ed2d67dfe9b6bcc80068467af
- Date: 2026-06-25 18:52:57 +0530
- Author: Akash God
- Message: url changed and steps lock enable in env
- Line changes in this file: +9 / -6

### What Changed (Exact Diff)

```diff
diff --git a/frontend/src/app/dashboard/technician/layout.tsx b/frontend/src/app/dashboard/technician/layout.tsx
index 2c275fa8..2c45cff4 100644
--- a/frontend/src/app/dashboard/technician/layout.tsx
+++ b/frontend/src/app/dashboard/technician/layout.tsx
@@ -1,13 +1,16 @@
+'use client';
+
 import TechnicianDashboardLayout from '@/components/technicianDashboard/layout/TechnicianDashboardLayout';
+import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';
+
+export default function Layout({ children }: { children: React.ReactNode }) {
+  // stepIndex: -1 = dashboard mode ΓÇö redirects to first incomplete step
+  // when NEXT_PUBLIC_ENABLE_ONBOARDING_LOCK is true and onboarding is incomplete.
+  useOnboardingGuard({ stepIndex: -1 });
 
-export default function Layout({
-  children,
-}: {
-  children: React.ReactNode;
-}) {
   return (
     <TechnicianDashboardLayout>
       {children}
     </TechnicianDashboardLayout>
   );
-}
\ No newline at end of file
+}
```

---

## File: src/api/endpoints.ts

- Commit: 816617a646111d49eef292e031e94460336304bf
- Date: 2026-07-02 13:46:20 +0530
- Author: Akash God
- Message: logged-in user stuck on their dashboard only after clear the urls too.
- Line changes in this file: +2 / -2

### What Changed (Exact Diff)

```diff
diff --git a/frontend/src/api/endpoints.ts b/frontend/src/api/endpoints.ts
index d3908f4e..1b9db14c 100644
--- a/frontend/src/api/endpoints.ts
+++ b/frontend/src/api/endpoints.ts
@@ -1,6 +1,6 @@
 export const API_BASE_URLS = {
-  auth: 'http://10.248.126.88:8000/api',
-  userService: 'http://10.248.126.88:8001/api',
+  auth: 'http://192.168.1.39:8000/api',
+  userService: 'http://192.168.1.39:8001/api',
 } as const;
 
 export type ApiServicePurpose = keyof typeof API_BASE_URLS;
```

