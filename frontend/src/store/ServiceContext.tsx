"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ServiceStatus } from '@/types/admin/service.types';

export interface AdminService {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  duration: string;
  status: ServiceStatus;
  image: string;
  bookings: number;
}

interface ContextType {
  services: AdminService[];
  addService: (
    service: AdminService
  ) => void;
  updateService: (
    service: AdminService
  ) => void;
  deleteService: (
    id: number
  ) => void;
  setServices: React.Dispatch<
    React.SetStateAction<AdminService[]>
  >;
}

const ServiceContext =
  createContext<ContextType | null>(null);

export const ServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [services, setServices] =
    useState<AdminService[]>([]);

  const addService = (
    service: AdminService
  ) => {
    setServices((prev) => [
      service,
      ...prev,
    ]);
  };

  const updateService = (
    updated: AdminService
  ) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === updated.id
          ? updated
          : service
      )
    );
  };

  const deleteService = (id: number) => {
    setServices((prev) =>
      prev.filter(
        (service) =>
          service.id !== id
      )
    );
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        setServices,
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
  const context =
    useContext(ServiceContext);

  if (!context) {
    throw new Error(
      "useServices must be used inside ServiceProvider"
    );
  }

  return context;
};