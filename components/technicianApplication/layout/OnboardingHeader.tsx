'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/authSlice';

export default function OnboardingHeader() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExit = async () => {
    // Clear session storage onboarding data
    sessionStorage.removeItem('registerData');
    sessionStorage.removeItem('skillsEquipmentData');
    sessionStorage.removeItem('documentUploadData');
    sessionStorage.removeItem('serviceAreaData');
    sessionStorage.removeItem('bankDetailsData');
    sessionStorage.removeItem('registerOtpVerified');

    await dispatch(logoutUser() as any);
    router.push('/');
  };

  return (
    <header className="border-b bg-white sticky top-0 z-20">
      <div className="w-full px-4 md:px-21 h-14 md:h-16 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-emerald-700">
          HiChandra
        </h1>

        {mounted && user && (
          <button 
            type="button" 
            onClick={handleExit}
            className="text-xs md:text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors"
          >
            Exit
          </button>
        )}
      </div>
    </header>
  );
}