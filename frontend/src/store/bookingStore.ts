import { create } from 'zustand';

interface BookingStore {
  service: string;
  serviceSlug: string;
  servicePrice: number;
  serviceSpecificData: Record<string, any>;
  name: string;
  phone: string;
  address: string;
  date: string;
  slot: string;
  instructions: string;

  setBooking: (
    data: Partial<BookingStore>
  ) => void;

  clearBooking: () => void;
}

export const useBookingStore =
  create<BookingStore>((set) => ({
    service: '',
    serviceSlug: '',
    servicePrice: 0,
    serviceSpecificData: {},
    name: '',
    phone: '',
    address: '',
    date: '',
    slot: '',
    instructions: '',

    setBooking: (data) =>
      set((state) => ({
        ...state,
        ...data,
      })),

    clearBooking: () =>
      set({
        service: '',
        serviceSlug: '',
        servicePrice: 0,
        serviceSpecificData: {},
        name: '',
        phone: '',
        address: '',
        date: '',
        slot: '',
        instructions: '',
      }),
  }));