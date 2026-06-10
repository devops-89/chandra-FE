'use client';

import { useCallback,useState } from 'react';

import type { ServiceAreaState } from '@/types/technicianOnboarding/serviceArea.types';

const initialState: ServiceAreaState = {
  radius: 0, // 5 km default
  preferredAreas: [],
  pincodes: [],
};

export const useServiceArea = () => {
  const [state, setState] = useState<ServiceAreaState>(initialState);

  const setRadius = useCallback((radius: number) => {
    setState((prev) => ({
      ...prev,
      radius: Math.max(0, Math.min(5, radius)),
    }));
  }, []);

  const addArea = useCallback((area: string) => {
    setState((prev) => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas
        : [...prev.preferredAreas, area],
    }));
  }, []);

  const removeArea = useCallback((area: string) => {
    setState((prev) => ({
      ...prev,
      preferredAreas: prev.preferredAreas.filter((a) => a !== area),
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

  return {
    state,
    setRadius,
    addArea,
    removeArea,
    addPincode,
    removePincode,
  };
};