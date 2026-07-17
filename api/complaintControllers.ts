import { userSecuredApi } from './config';
import type {
  Complaint,
  CreateComplaintRequest,
  CreateComplaintResponse,
  UpdateComplaintRequest,
} from '@/types/complaint.types';

export const ComplaintControllers = {
  createComplaint: async (payload: CreateComplaintRequest): Promise<Complaint> => {
    const response = await userSecuredApi.post<CreateComplaintResponse>('/bookings/complaint', payload);
    return response.data.data.data;
  },

  updateComplaint: async (payload: UpdateComplaintRequest): Promise<Complaint> => {
    const { id, ...body } = payload;
    const response = await userSecuredApi.patch<CreateComplaintResponse>(`/bookings/complaint/${id}`, body);
    return response.data.data.data;
  },
};
