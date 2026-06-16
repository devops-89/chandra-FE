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
 * redirects them to /dashboard/customer.
 * Renders nothing until the auth check is complete to avoid flash.
 */
export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  const reduxAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isAuthenticated = reduxAuthenticated || !!token;

    if (isAuthenticated) {
      router.replace('/dashboard/customer');
    } else {
      const id = setTimeout(() => setChecking(false), 0);
      return () => clearTimeout(id);
    }
  }, [reduxAuthenticated, router]);

  // Render nothing while checking — prevents a flash of the public page
  if (checking) return null;

  return <>{children}</>;
}
