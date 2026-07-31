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
    // If Redux is authenticated and we have the role, redirect them
    if (reduxAuthenticated && reduxRole) {
      router.replace(handlePostAuthRedirect(reduxRole));
      return;
    }

    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      if (!token && !reduxAuthenticated) {
        setChecking(false);
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 500);
    return () => clearInterval(interval);
  }, [reduxAuthenticated, reduxRole, router]);

  if (checking) return null;

  return <>{children}</>;
}
