import type {
  AdminBooking,
  BookingPagination,
  GetAdminBookingsResponse,
} from '@/types/admin/bookings.types';
import type {
  AdminComplaint,
  AdminComplaintListItem,
  ComplaintPagination,
  GetAdminComplaintResponse,
  GetAdminComplaintsResponse,
  ResolveComplaintRequest,
  ResolveComplaintResponse,
} from '@/types/admin/complaints.types';
import { type UpdateProfileRequest } from '@/types/admin/profile.types';

import { userSecuredApi } from './config';

export const AdminControllers = {
  getAdminComplaintById: async (id: number): Promise<AdminComplaint> => {
    const response = await userSecuredApi.get<GetAdminComplaintResponse>(`/bookings/complaint/${id}`);
    return response.data.data.data;
  },

  getAdminComplaints: async (status?: string): Promise<{ complaints: AdminComplaintListItem[]; pagination: ComplaintPagination }> => {
    let url = '/bookings/complaints';
    if (status && status !== 'All Status') {
      url += `?status=${status}`;
    }
    const response = await userSecuredApi.get<GetAdminComplaintsResponse>(url);
    return {
      complaints: response.data.data.data,
      pagination: response.data.data.pagination,
    };
  },

  deleteComplaint: async (complaintId: number): Promise<void> => {
    await userSecuredApi.delete(`/bookings/complaint/${complaintId}`);
  },

  resolveAdminComplaint: async (payload: ResolveComplaintRequest): Promise<AdminComplaint> => {
    const response = await userSecuredApi.patch<ResolveComplaintResponse>(`/bookings/admin/complaints/resolve/${payload.id}`, {
      status: payload.status,
    });
    return response.data.data.data;
  },

  getAdminBookings: async (page = 1, limit = 10, status?: string, search?: string, reviewStatus?: string): Promise<{ bookings: AdminBooking[]; pagination: BookingPagination }> => {
    let url = `/bookings/all?page=${page}&limit=${limit}`;

    if (status) {
      url += `&status=${status}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    if (reviewStatus) {
      url += `&reviewStatus=${reviewStatus}`;
    }

    const response = await userSecuredApi.get<GetAdminBookingsResponse>(url);
    return {
      bookings: response.data.data.data,
      pagination: response.data.data.pagination,
    };
  },

  getAdminBookingById: async (id: number | string): Promise<AdminBooking> => {
    const response = await userSecuredApi.get(`/bookings/${id}`);
    return response.data.data.data;
  },

  updateProfile: async (payload: UpdateProfileRequest) => {
    const formData = new FormData();
    formData.append('firstName', payload.firstName);
    formData.append('lastName', payload.lastName);
    formData.append('username', payload.username);
    formData.append('phone', payload.phone);

    if (payload.profileImage) {
      formData.append('profileImage', payload.profileImage);
    }

    const response = await userSecuredApi.patch('/users/profile', formData);
    return response.data;
  },

  getAllCustomers: async () => {
    const response = await userSecuredApi.get('/users/all?status=ACTIVE&page=1&limit=1000');
    return response.data?.data?.data || response.data?.data || [];
  },

  getAllTechnicians: async () => {
    const response = await userSecuredApi.get('/users/all?role=TECHNICIAN&technicianProfileStatus=APPROVED');
    return response.data?.data?.data || response.data?.data || [];
  },

  getPendingTechnicians: async () => {
    const response = await userSecuredApi.get('/users/all?role=TECHNICIAN&technicianProfileStatus=PENDING_APPROVAL');
    return response.data?.data?.data || response.data?.data || [];
  },

  getTechniciansByService: async (serviceId: number) => {
    const response = await userSecuredApi.get(`/users/all?role=TECHNICIAN&serviceId=${serviceId}&technicianProfileStatus=APPROVED&page=1&limit=1000`);
    return response.data?.data?.data || response.data?.data || [];
  },

  getAllServicesForAdmin: async () => {
    const response = await userSecuredApi.get('/users/service/all');
    return response.data?.data?.data || response.data?.data || [];
  },

  getServiceByIdForAdmin: async (id: number) => {
    const response = await userSecuredApi.get(`/users/service/${id}`);

    // Attempt to extract the actual service object regardless of how deeply nested it is
    let raw = response.data?.data?.data || response.data?.data || response.data;
    if (Array.isArray(raw)) raw = raw[0];

    return raw;
  },

  createAdminBooking: async (payload: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const response = await userSecuredApi.post('/bookings/admin/create', payload);
    return response.data?.data?.data || response.data?.data || response.data;
  },

  assignTechnicianToBooking: async (payload: { bookingId: number, technicianId: number, adminId?: number }) => {
    const response = await userSecuredApi.post('/bookings/admin/assign-booking', payload);
    return response.data;
  },

  updateReviewStatus: async (bookingId: number, reviewStatus: string) => {
    const response = await userSecuredApi.patch(`/bookings/admin/review/${bookingId}`, { reviewStatus });
    return response.data;
  },
};
