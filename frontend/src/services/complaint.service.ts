import { api } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  Complaint,
  CreateComplaintRequest,
  CreateComplaintResponse,
  UpdateComplaintRequest,
} from '@/types/complaint.types';

export const createComplaintService = async (
  payload: CreateComplaintRequest
): Promise<Complaint> => {

  const response =
    await api.post<CreateComplaintResponse>(
      ENDPOINTS.CREATE_COMPLAINT,
      payload
    );

  return response.data.data.data;
};

export const updateComplaintService = async (
  payload: UpdateComplaintRequest
): Promise<Complaint> => {
  const { id, ...body } = payload;

  const response =
    await api.patch<CreateComplaintResponse>(
      `${ENDPOINTS.UPDATE_COMPLAINT}/${id}`,
      body
    );

  return response.data.data.data;
};