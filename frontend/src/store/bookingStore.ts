import { create } from 'zustand';

interface BookingStore {
  service: string;
  name: string;
  phone: string;
  address: string;
  date: string;
  slot: string;
  instructions: string;

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
    instructions: '',

    setBooking: (data) =>
      set((state) => ({
        ...state,
        ...data,
      })),
  }));