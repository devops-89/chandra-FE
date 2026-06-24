'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { handlePostAuthRedirect } from '@/lib/authApi/redirectUtils';
import { useAppSelector } from '@/redux/hooks';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps public-only pages (/, /login, /signup).
 *
 * Only redirects away if the user was already authenticated when the page
 * first loaded. Fresh login navigation is handled by LoginForm.
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
      let role = reduxRole;

      if (!role) {
        try {
          const userStr = localStorage.getItem('user');
          if (userStr) role = JSON.parse(userStr)?.role;
        } catch {
          // ignore malformed JSON
        }
      }

      router.replace(handlePostAuthRedirect(role));
      return;
    }

    const id = setTimeout(() => setChecking(false), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) return null;

  return <>{children}</>;
}
