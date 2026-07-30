import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import { SERVER_ENDPOINTS } from '@/api/serverConstant';
import { addNearbyJob, removeNearbyJob } from '@/redux/slices/nearbyJobsSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import type { AppDispatch } from '@/redux/store';
import type { NearbyJob } from '@/types/technicianDashboard/nearbyJobs.types';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  public connect(dispatch: AppDispatch, userId: number): void {
    if (this.socket) {
      if (this.socket.connected) return;
      this.socket.connect();
      return;
    }

    // Derive websocket base url from USER_BASEURL
    const socketUrl = SERVER_ENDPOINTS.USER_BASEURL.replace(/\/api\/?$/, '');

    this.socket = io(socketUrl, {
      auth: {
        userId,
      },
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('[SocketService] Connect error:', error);
    });

    // Custom event listeners
    this.socket.on('new_booking', (bookingPayload: any) => {
      try {
        const bookingId = bookingPayload.bookingId || bookingPayload.id;
        if (!bookingId) return;

        const serviceInfo = bookingPayload.serviceInfo || {};
        const customerInfo = bookingPayload.customerInfo || {};
        const addressInfo = bookingPayload.addressInfo || {};
        const bookingInfo = bookingPayload.bookingInfo || {};

        const customerName =
          `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim() ||
          bookingPayload.customerName ||
          'Customer';

        const serviceType = serviceInfo.name || bookingPayload.service || 'Service';

        const newJob: NearbyJob = {
          id: Number(bookingId),
          serviceType,
          title: bookingPayload.title || `${serviceType} Request`,
          customerName,
          rating: customerInfo.rating || 5.0,
          reviews: customerInfo.reviews || 0,
          location: addressInfo.fullAddress || addressInfo.city || 'Nearby',
          distance: bookingPayload.distance || 'Nearby',
          schedule: bookingInfo.scheduledAt
            ? new Date(bookingInfo.scheduledAt).toLocaleString()
            : 'Immediate',
          duration: bookingPayload.duration || '1-2 Hours',
          payout: `₹${bookingInfo.totalAmount || bookingInfo.priceBreakdown?.technicianEarning || bookingInfo.priceBreakdown?.serviceBasePrice || 0}`,
          urgency: bookingInfo.isEmergency ? 'Urgent' : 'Normal',
        };

        dispatch(addNearbyJob(newJob));
        dispatch(
          showSnackbar({
            message: `New booking request: ${serviceType}`,
            severity: 'info',
          })
        );
      } catch (err) {
        console.error('[SocketService] Error parsing new_booking:', err);
      }
    });

    this.socket.on('booking_taken', (data?: { bookingId?: number | string }) => {
      if (data?.bookingId) {
        dispatch(removeNearbyJob(Number(data.bookingId)));
      }
      dispatch(
        showSnackbar({
          message: 'Booking assigned to another technician',
          severity: 'info',
        })
      );
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public reconnect(dispatch: AppDispatch, userId: number): void {
    this.disconnect();
    this.connect(dispatch, userId);
  }
}

export const socketService = new SocketService();
