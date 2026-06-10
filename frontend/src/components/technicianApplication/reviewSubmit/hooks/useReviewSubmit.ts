'use client';

import { useCallback,useState } from 'react';

import type { ReviewSubmitState } from '@/types/technicianApplication/reviewSubmit.types';

// Mock initial state - replace with actual data from context/session storage
const initialState: ReviewSubmitState = {
  profileData: {
    name: 'Arjun Sharma',
    title: 'Professional Electrician',
    experience: 8,
    location: 'HSR Layout, Bangalore, KA',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAllli-S71rQFSyYtpdYPM8paf3tUV1PJR0NZNkI5Sd_zhBs_YokYiyx_W8eRpeuO7fa5Y1RRJSMFfuXbITLEFzzgDLFXOglBoc5D_TTRpiaoqz_z5aS-6nrlod8ENCxtdKm6RnlFPSgJg9yKd0GQ4xTN_Jxu96UthztfTJ_LDNc98gI4MnnQvSlwkJbB4EfVhG0o1u2zWcRqPE5z9ycx9XZMl2ehvMUQXVD0m5Ucll2JdDq67Yst4i_7NIJlEvNQkTIm3f9B72VIo',
  },
  skills: ['Home Wiring', 'EV Charger Installs', 'Smart Home Integration', 'Circuit Repair'],
  certificationLevel: 'Gold Expert Tier',
  verificationStatus: {
    documents: [
      { id: 'aadhaar', name: 'Aadhaar Card', status: 'verified' },
      { id: 'pan', name: 'PAN Card', status: 'verified' },
      { id: 'police', name: 'Police Clearance', status: 'verified' },
      { id: 'trade', name: 'Trade License', status: 'verified' },
      { id: 'cheque', name: 'Cancelled Cheque', status: 'verified' },
    ],
    completedCount: 5,
    totalCount: 5,
  },
  serviceArea: {
    radius: 15,
    areas: ['HSR', 'Koramangala', 'Bellandur', 'Whitefield'],
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8MW-KVd8np2xtsHAGhoYN_jQLVyDbn39qfFj8Qt5SDYQPb4lFWa82IE-QY-oMAmAc0yDt8RaBjGN6DQWs_9p0lVovwAGgGj7F--FbwG0BZXnsXqOGL0rlNwKVrNprpWd96Chcnuk-W_EUqEC7AReAYg63ihhxUeet0nu4hV7dWVnrC-LQRHUhhm0Y0gj06ZPj70pb2KOVZmL7qtfsXut3FFSZ_CU0WkIGHr58JIv47TAmd_MNgkAfSUio_rSiDAnauUPoi-7fXpk',
  },
};

export const useReviewSubmit = () => {
  const [state, setState] = useState<ReviewSubmitState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call - replace with actual submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Save state to session storage
      sessionStorage.setItem('reviewSubmitData', JSON.stringify(state));
      
      return { success: true };
    } catch (error) {
      console.error('Submission error:', error);
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  }, [state]);

  const updateProfileData = useCallback((profileData: Partial<ReviewSubmitState['profileData']>) => {
    setState((prev) => ({
      ...prev,
      profileData: { ...prev.profileData, ...profileData },
    }));
  }, []);

  const updateSkills = useCallback((skills: string[]) => {
    setState((prev) => ({
      ...prev,
      skills,
    }));
  }, []);

  const updateCertificationLevel = useCallback((level: string) => {
    setState((prev) => ({
      ...prev,
      certificationLevel: level,
    }));
  }, []);

  return {
    state,
    isSubmitting,
    handleSubmit,
    updateProfileData,
    updateSkills,
    updateCertificationLevel,
  };
};
