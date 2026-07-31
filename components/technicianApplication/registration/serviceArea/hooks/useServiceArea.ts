'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { ServiceAreaState } from '@/types/technicianOnboarding/serviceArea.types';

const initialState: ServiceAreaState = {
  radius: 0, // 5 km default
  pincodes: [],
};

export const useServiceArea = () => {
  const [state, setState] = useState<ServiceAreaState>(initialState);
  const hasRestoredDraft = useRef(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('serviceAreaData');
    if (!saved) {
      hasRestoredDraft.current = true;
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      const timer = window.setTimeout(() => {
        setState({ ...initialState, ...parsed });
        hasRestoredDraft.current = true;
      }, 0);
      return () => window.clearTimeout(timer);
    } catch {
      hasRestoredDraft.current = true;
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!hasRestoredDraft.current) return;
    sessionStorage.setItem('serviceAreaData', JSON.stringify(state));
  }, [state]);

  const setRadius = useCallback((radius: number) => {
    setState((prev) => ({
      ...prev,
      radius: Math.max(0, Math.min(5, radius)),
    }));
  }, []);

  const addPincode = useCallback((pincode: string) => {
    setState((prev) => ({
      ...prev,
      pincodes: prev.pincodes.includes(pincode)
        ? prev.pincodes
        : [...prev.pincodes, pincode],
    }));
  }, []);

  const removePincode = useCallback((pincode: string) => {
    setState((prev) => ({
      ...prev,
      pincodes: prev.pincodes.filter((p) => p !== pincode),
    }));
  }, []);

  const setServiceLocation = useCallback(
    (location: Partial<Pick<
      ServiceAreaState,
      'latitude' | 'longitude' | 'fullAddress' | 'city' | 'state' | 'pincode'
    >>) => {
      setState((prev) => ({
        ...prev,
        ...location,
      }));
    },
    [],
  );

  return {
    state,
    setRadius,
    addPincode,
    removePincode,
    setServiceLocation,
  };
};
