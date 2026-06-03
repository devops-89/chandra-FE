import { create } from 'zustand';

interface BookingStore {
  service: string;
  name: string;
  phone: string;
  address: string;
  date: string;
  slot: string;

  setBooking: (
    data: Partial<BookingStore>
  ) => void;
}

export const useBookingStore =
  create<BookingStore>((set) => ({
    service: '',
    name: '',
    phone: '',
    address: '',
    date: '',
    slot: '',

    setBooking: (data) =>
      set((state) => ({
        ...state,
        ...data,
      })),
  }));