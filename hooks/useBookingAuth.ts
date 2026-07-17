'use client';

import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/redux/hooks';

export interface UseBookingAuthReturn {
  isAuthenticated: boolean;
  /**
   * Call this when the user clicks a booking CTA.
   *
   * @param onBookingClick - callback to run when the user IS authenticated
   * @param redirectTarget - optional URL to redirect back to after login.
   *   Defaults to the current page (pathname + search) so the user always
   *   lands back on the same service detail page, not the dashboard.
   */
  handleBookingClick: (onBookingClick: () => void, redirectTarget?: string) => void;
}

export function useBookingAuth(): UseBookingAuthReturn {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleBookingClick = (
    onBookingClick: () => void,
    _redirectTarget?: string,
  ) => {
    if (!isAuthenticated) {
      // No redirect stored — after login, user goes to /dashboard/customer
      router.push('/login');
      return;
    }

    onBookingClick();
  };

  return { isAuthenticated, handleBookingClick };
}
