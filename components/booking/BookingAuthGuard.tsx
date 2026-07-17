'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { storeRedirectPath } from '@/lib/authApi/redirectUtils';
import { useAppSelector } from '@/redux/hooks';

interface BookingAuthGuardProps {
  children: ReactNode;
}

export default function BookingAuthGuard({ children }: BookingAuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the full URL (pathname + search params) so login can redirect back
      storeRedirectPath(window.location.pathname + window.location.search);
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
