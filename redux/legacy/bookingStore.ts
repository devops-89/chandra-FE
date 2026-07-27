import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  serviceId: number | null;
  serviceSlug: string;
  servicePrice: number;

  serviceSpecificData: BookingFormData;

  name: string;
  phone: string;

  customerAddressId: number | null;
  customerAddress: BookingAddressSnapshot | null;

  date: string;
  slot: string;
  instructions: string;

  serviceSpecifications: BookingSpecification[];

  setBooking: (data: Partial<BookingStore>) => void;
  clearBooking: () => void;
}

const EMPTY_STATE = {
  service: '',
  serviceId: null,
  serviceSlug: '',
  servicePrice: 0,
  serviceSpecificData: {} as BookingFormData,
  name: '',
  phone: '',
  customerAddressId: null,
  customerAddress: null,
  date: '',
  slot: '',
  instructions: '',
  serviceSpecifications: [] as BookingSpecification[],
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      ...EMPTY_STATE,

      setBooking: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      clearBooking: () => set(EMPTY_STATE),
    }),
    {
      name: 'hichandra-booking',
      // Only persist the data fields — not the action functions
      partialize: (state) => ({
        service: state.service,
        serviceId: state.serviceId,
        serviceSlug: state.serviceSlug,
        servicePrice: state.servicePrice,
        serviceSpecificData: state.serviceSpecificData,
        name: state.name,
        phone: state.phone,
        customerAddressId: state.customerAddressId,
        customerAddress: state.customerAddress,
        date: state.date,
        slot: state.slot,
        instructions: state.instructions,
        serviceSpecifications: state.serviceSpecifications,
      }),
    },
  ),
);
