export interface CreateComplaintRequest {
  bookingId: number;
  serviceId: number;
  title: string;
  description: string;
}

export interface Complaint {
  id: number;
  serviceId: number;
  bookingId: number;
  title: string;
  description: string;
  createdBy: number;
  createdByRole: string;
  status: string;
  resolutionRemark: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComplaintResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: Complaint;
  };
}

export interface UpdateComplaintRequest {
  id: number;

  bookingId: number;
  serviceId: number;
  title: string;
  description: string;
}