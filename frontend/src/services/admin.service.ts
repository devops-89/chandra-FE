import { userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  AdminComplaint,
  AdminComplaintListItem,
  ComplaintPagination,
  GetAdminComplaintResponse,
  GetAdminComplaintsResponse,
  ResolveComplaintRequest,
  ResolveComplaintResponse,
} from '@/types/admin/complaints.types';

// ─── Get Complaint By Id ───────────────────────────────────────────────

export const getAdminComplaintByIdService = async (
  id: number,
): Promise<AdminComplaint> => {
  const response =
    await userServiceApi.get<GetAdminComplaintResponse>(
      `${ENDPOINTS.ADMIN_COMPLAINTS_BY_ID}/${id}`,
    );

  return response.data.data.data;
};

// Get All Complaints

export const getAdminComplaintsService = async (): Promise<{
  complaints: AdminComplaintListItem[];
  pagination: ComplaintPagination;
}> => {
  const response =
    await userServiceApi.get<GetAdminComplaintsResponse>(
      ENDPOINTS.ADMIN_COMPLAINTS,
    );

  return {
    complaints: response.data.data.data,
    pagination: response.data.data.pagination,
  };
};

export const deleteComplaintsService = async (
  complaintId: number,
): Promise<void> => {
  await userServiceApi.delete(
    `${ENDPOINTS.DELETE_COMPLAINT}/${complaintId}`,
  );
};

export const resolveAdminComplaintService = async (
  payload: ResolveComplaintRequest,
): Promise<AdminComplaint> => {
  const response =
    await userServiceApi.patch<ResolveComplaintResponse>(
      `${ENDPOINTS.ADMIN_RESOLVE_COMPLAINT}/${payload.id}`,
      {
        status: payload.status,
      },
    );

  return response.data.data.data;
};