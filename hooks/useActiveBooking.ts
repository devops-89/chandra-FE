"use client";

import { useState, useEffect } from 'react';
import { BookingControllers } from '@/api/bookingControllers';
import type { CustomerBooking } from '@/types/customerBooking.types';

export const useActiveBooking = () => {
  const [activeBooking, setActiveBooking] = useState<CustomerBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        const { bookings } = await BookingControllers.getCustomerBookings(1, 1);
        if (bookings && bookings.length > 0) {
          setActiveBooking(bookings[0]);
        }
      } catch (error) {
        console.error('Failed to fetch latest booking', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBooking();
  }, []);

  return {
    activeBooking,
    loading,
  };
};
