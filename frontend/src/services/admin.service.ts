import { userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';

import type {
  AdminComplaint,
  GetAdminComplaintResponse,
} from '@/types/admin/complaint.types';

// ─── Get Complaint By Id ───────────────────────────────────────────────

export const getAdminComplaintByIdService = async (
  id: number,
): Promise<AdminComplaint> => {
  const response =
    await userServiceApi.get<GetAdminComplaintResponse>(
      `${ENDPOINTS.ADMIN_COMPLAINTS}/${id}`,
    );

  return response.data.data.data;
};