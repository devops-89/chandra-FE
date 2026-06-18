"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { getAllServicesService } from '@/services/service.service';
import type { AdminService, ServiceStatus } from '@/types/admin/service.types';

// Re-export so existing imports from this file still work
export type { AdminService };
export type { ServiceStatus };

interface ContextType {
  services:     AdminService[];
  isLoading:    boolean;
  error:        string | null;
  setServices:  React.Dispatch<React.SetStateAction<AdminService[]>>;
  loadServices: () => Promise<void>;
  addService:   (service: AdminService) => void;
  updateService:(service: AdminService) => void;
  deleteService:(id: number) => void;
}

const ServiceContext = createContext<ContextType | null>(null);

export const ServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [services,  setServices]  = useState<AdminService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  // ── Fetch from API ──────────────────────────────────────────────
  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllServicesService();
      setServices(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load services.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Local mutations (optimistic, used until full API wiring) ────
  const addService = (service: AdminService) =>
    setServices((prev) => [service, ...prev]);

  const updateService = (updated: AdminService) =>
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );

  const deleteService = (id: number) =>
    setServices((prev) => prev.filter((s) => s.id !== id));

  return (
    <ServiceContext.Provider
      value={{
        services,
        isLoading,
        error,
        setServices,
        loadServices,
        addService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error("useServices must be used inside ServiceProvider");
  }

  return context;
};
