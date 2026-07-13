import { userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  AdminComplaint,
  AdminComplaintListItem,
  ComplaintPagination,
  GetAdminComplaintResponse,
  GetAdminComplaintsResponse,
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
