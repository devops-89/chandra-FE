export type ComplaintStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'REJECTED';

export type ComplaintCreatedByRole =
  | 'CUSTOMER'
  | 'TECHNICIAN'
  | 'ADMIN';

// ─── Shared Types ───────────────────────────────────────────────

export interface ComplaintCreatedBy {
  id: number;
  name: string;
  username: string;
  role: ComplaintCreatedByRole;
}

export interface ComplaintBooking {
  id: number;
  status: string;
}

export interface ComplaintPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ─── Complaint Details (GET /bookings/admin/complaints/:id) ─────

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

// ─── Complaint List Item (GET /bookings/complaints) ──────────────

export interface AdminComplaintListItem {
  id: number;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdBy: ComplaintCreatedBy;
  booking: ComplaintBooking;
  createdAt: string;
  updatedAt: string;
}

// ─── Get Complaint By Id Response ────────────────────────────────

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

// ─── Get All Complaints Response ─────────────────────────────────

export interface GetAdminComplaintsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: AdminComplaintListItem[];
    pagination: ComplaintPagination;
  };
}

// ─── Resolve Complaint Response ───────────────────────────────────
export interface ResolveComplaintRequest {
  id: number;
  status: ComplaintStatus;
}

export interface ResolveComplaintResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: AdminComplaint;
  };
}