'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps public-only pages (/, /login, /signup).
 * If the user is already authenticated (Redux OR localStorage token),
 * redirects them to the correct dashboard based on their role:
 *   - ADMIN   → /dashboard/admin
 *   - CUSTOMER → /dashboard/customer
 * Renders nothing until the auth check is complete to avoid flash.
 */
export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  const reduxAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const reduxRole = useAppSelector((state) => state.auth.user?.role);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isAuthenticated = reduxAuthenticated || !!token;

    if (isAuthenticated) {
      // Resolve role: prefer Redux (already hydrated) else parse localStorage
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
      const id = setTimeout(() => setChecking(false), 0);
      return () => clearTimeout(id);
    }
  }, [reduxAuthenticated, reduxRole, router]);

  if (checking) return null;

  return <>{children}</>;
}
