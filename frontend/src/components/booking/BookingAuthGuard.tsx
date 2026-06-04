'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

interface BookingAuthGuardProps {
  children: ReactNode;
}

export default function BookingAuthGuard({
  children,
}: BookingAuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
