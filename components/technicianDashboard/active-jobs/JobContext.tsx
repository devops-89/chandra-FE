'use client';
import { createContext, useContext } from 'react';
import type { ActiveJob } from '@/types/technicianDashboard/activeJobs.types';

export const JobContext = createContext<ActiveJob | null>(null);

export function useJobContext() {
  return useContext(JobContext);
}
