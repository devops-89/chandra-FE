'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getAndClearRedirectPath } from '@/lib/authApi/redirectUtils';
import { useAppSelector } from '@/redux/hooks';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps public-only pages (/, /login, /signup).
 *
 * Only redirects away if the user was ALREADY authenticated when the page
 * first loaded (mount check). This prevents racing with LoginForm's own
 * router.push() after a fresh login.
 *
 * Redirect priority:
 *   1. Stored redirect path (sessionStorage) — e.g. "Sign In to Book" flow
 *   2. Role-appropriate dashboard (/dashboard/admin or /dashboard/customer)
 */
export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  // Read auth state once at component load time — intentionally not in deps
  const reduxAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const reduxRole = useAppSelector((state) => state.auth.user?.role);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Only check on mount (empty deps). A fresh login is handled by LoginForm
    // itself — we must not race against it here.
    const token = localStorage.getItem('accessToken');
    const isAuthenticated = reduxAuthenticated || !!token;

    if (isAuthenticated) {
      // Honour any stored redirect first (e.g. guest clicked "Sign In to Book")
      const storedRedirect = getAndClearRedirectPath();
      if (storedRedirect) {
        router.replace(storedRedirect);
        return;
      }

      // No stored redirect — send to role dashboard
      let role = reduxRole;
      if (!role) {
        try {
          const userStr = localStorage.getItem('user');
          if (userStr) role = JSON.parse(userStr)?.role;
        } catch {
          // ignore malformed JSON
        }
      }

      const dest = role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/customer';
      router.replace(dest);
    } else {
      setChecking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← run only on mount, never react to redux changes

  if (checking) return null;

  return <>{children}</>;
}
