'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { userSecuredApi } from '@/api/config';
import BookingDetailHero from '@/components/customerDashboard/bookings/BookingDetailHero';
import BookingSummaryCard from '@/components/customerDashboard/bookings/BookingSummaryCard';
import CancelBookingModal from '@/components/customerDashboard/bookings/CancelBookingModal';
import RaiseTicketModal from '@/components/customerDashboard/bookings/RaiseTicketModal';
import RescheduleModal from '@/components/customerDashboard/bookings/RescheduleModal';
import ReviewFeedbackCard from '@/components/customerDashboard/bookings/ReviewFeedbackCard';
import ServiceDetailsCard from '@/components/customerDashboard/bookings/ServiceDetailsCard';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import type {
  CancelledBooking,
  CustomerBooking,
  CustomerBookingsResponse,
} from '@/types/customerBooking.types';

export default function BookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [booking, setBooking] = useState<CustomerBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isRaiseTicketOpen, setIsRaiseTicketOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await userSecuredApi.get<CustomerBookingsResponse>(
          '/bookings/all',
        );

        const bookings = response.data?.data?.data ?? [];
        const matchedBooking = bookings.find(
          (item) => String(item.bookingId) === String(id),
        );

        if (isMounted) {
          setBooking(matchedBooking ?? null);
        }
      } catch {
        if (isMounted) {
          setError('Unable to load booking details right now.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchBooking();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!booking?.scheduledAtIst) {
      return 'N/A';
    }

    const parseIstDate = (dateStr: string): Date => {
      const cleanStr = dateStr.trim();
      let date = new Date(cleanStr);
      if (!isNaN(date.getTime())) {
        return date;
      }

      const match = cleanStr.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[\s,]+(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s+(AM|PM))?)?$/i);
      if (match) {
        const [_, day, month, year, hoursStr, minutesStr, secondsStr, period] = match;
        let hours = hoursStr ? Number(hoursStr) : 0;
        const minutes = minutesStr ? Number(minutesStr) : 0;
        const seconds = secondsStr ? Number(secondsStr) : 0;

        if (period) {
          if (period.toUpperCase() === 'PM' && hours !== 12) {
            hours += 12;
          } else if (period.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
          }
        }

        date = new Date(Number(year), Number(month) - 1, Number(day), hours, minutes, seconds);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }

      const isoFormat = cleanStr.replace(' ', 'T');
      date = new Date(isoFormat);
      if (!isNaN(date.getTime())) {
        return date;
      }

      return new Date(NaN);
    };

    const parsedDate = parseIstDate(booking.scheduledAtIst);
    if (isNaN(parsedDate.getTime())) {
      return 'N/A';
    }

    return parsedDate.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }, [booking]);

  const formattedAmount = useMemo(() => {
    if (!booking?.totalAmount) {
      return '₹0.00';
    }
    return `₹${Number(booking.totalAmount).toFixed(2)}`;
  }, [booking]);

  const handleCancelSuccess = (cancelled: CancelledBooking) => {
    setBooking((prev) =>
      prev
        ? {
            ...prev,
            status: cancelled.status,
            cancelledBy: cancelled.cancelledBy,
            cancelledByRole: cancelled.cancelledByRole,
            cancellationReason: cancelled.cancellationReason,
            updatedAt: cancelled.updatedAt,
          }
        : prev
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Booking Details
          </h1>
          <p className="text-slate-500">
            Review the full details for your selected booking.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
            Loading booking details...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        ) : !booking ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
            No booking found for this ID.
          </div>
        ) : (
          <div className="space-y-6">
            <BookingDetailHero
              booking={booking}
              formattedDate={formattedDate}
              formattedAmount={formattedAmount}
              onCancelClick={() => setIsCancelModalOpen(true)}
              onRescheduleClick={() => setIsRescheduleModalOpen(true)}
              onRaiseTicketClick={() => setIsRaiseTicketOpen(true)}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <BookingSummaryCard booking={booking} />
              <ServiceDetailsCard booking={booking} />
            </div>

            <ReviewFeedbackCard booking={booking} />
          </div>
        )}
      </div>

      {booking && (
        <CancelBookingModal
          open={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          booking={booking}
          onSuccess={handleCancelSuccess}
        />
      )}

      {booking && (
        <RescheduleModal
          open={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          bookingId={booking.bookingId}
          currentSchedule={formattedDate}
          onSuccess={(updatedBooking) => {
            setBooking((prev) =>
              prev
                ? {
                    ...prev,
                    scheduledAtIst: updatedBooking.scheduledAtIst,
                    status: updatedBooking.status,
                  }
                : prev
            );
          }}
        />
      )}

      {booking && (
        <RaiseTicketModal
          open={isRaiseTicketOpen}
          onClose={() => setIsRaiseTicketOpen(false)}
          bookingId={booking.bookingId}
          serviceId={booking.service?.id ?? null}
        />
      )}
    </DashboardLayout>
  );
}
