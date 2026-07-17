import { create } from 'zustand';

import type { BookingFormData } from '@/types/services.types';

export interface BookingSpecification {
  specificationId: number;
  value: string | number;
}

export interface BookingAddressSnapshot {
  id: number;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  label?: string;
}

interface BookingStore {
  service: string;
  serviceId: number | null; // Backend service ID
  serviceSlug: string;
  servicePrice: number;

  serviceSpecificData: BookingFormData;

  name: string;
  phone: string;

  // New
  customerAddressId: number | null;
  customerAddress: BookingAddressSnapshot | null;

  date: string;
  slot: string;
  instructions: string;

  // New
  serviceSpecifications: BookingSpecification[];

  setBooking: (data: Partial<BookingStore>) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  service: '',
  serviceId: null,
  serviceSlug: '',
  servicePrice: 0,

  serviceSpecificData: {},

  name: '',
  phone: '',

  customerAddressId: null,
  customerAddress: null,

  date: '',
  slot: '',
  instructions: '',

  serviceSpecifications: [],

  setBooking: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  clearBooking: () =>
    set({
      service: '',
      serviceId: null,
      serviceSlug: '',
      servicePrice: 0,

      serviceSpecificData: {},

      name: '',
      phone: '',

      customerAddressId: null,
      customerAddress: null,

      date: '',
      slot: '',
      instructions: '',

      serviceSpecifications: [],
    }),
}));

