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
    const response = await userSecuredApi.get<GetAdminComplaintResponse>(`/bookings/admin/complaints/${id}`);
    return response.data.data.data;
  },

  getAdminComplaints: async (): Promise<{ complaints: AdminComplaintListItem[]; pagination: ComplaintPagination }> => {
    const response = await userSecuredApi.get<GetAdminComplaintsResponse>('/bookings/complaints');
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

  getAdminBookings: async (page = 1, limit = 30): Promise<{ bookings: AdminBooking[]; pagination: BookingPagination }> => {
    const response = await userSecuredApi.get<GetAdminBookingsResponse>(`/bookings/all?page=${page}&limit=${limit}`);
    return {
      bookings: response.data.data.data,
      pagination: response.data.data.pagination,
    };
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
};
