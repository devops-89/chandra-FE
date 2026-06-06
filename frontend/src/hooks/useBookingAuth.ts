'use client';

import { useRouter } from 'next/navigation';

import { storeRedirectPath } from '@/lib/auth/redirectUtils';
import { useAuthStore } from '@/store/useAuthStore';

export interface UseBookingAuthReturn {
  isAuthenticated: boolean;
  handleBookingClick: (onBookingClick: () => void) => void;
}

/**
 * Custom hook for handling booking authentication flow
 * 
 * @returns Object with isAuthenticated state and handleBookingClick function
 */
export function useBookingAuth(): UseBookingAuthReturn {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleBookingClick = (onBookingClick: () => void) => {
    if (!isAuthenticated) {
      // Store the current service page for redirect after login
      storeRedirectPath();
      
      // Redirect to login page
      router.push('/login');
      return;
    }
    
    // If authenticated, proceed with the booking flow
    onBookingClick();
  };

  return {
    isAuthenticated,
    handleBookingClick,
  };
}