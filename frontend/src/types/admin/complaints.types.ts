export type ComplaintStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'REJECTED';

export type ComplaintCreatedByRole =
  | 'CUSTOMER'
  | 'TECHNICIAN'
  | 'ADMIN';

export interface AdminComplaint {
  id: number;
  serviceId: number;
  bookingId: number;
  title: string;
  description: string;
  createdBy: number;
  createdByRole: ComplaintCreatedByRole;
  status: ComplaintStatus;
  resolutionRemark: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetAdminComplaintResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: AdminComplaint;
  };
}