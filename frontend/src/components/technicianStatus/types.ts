export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface TechnicianStatusContextType {
  status: ApplicationStatus;
  setStatus: (status: ApplicationStatus) => void;
}

export interface PendingStatusProps {
  applicationId?: string;
  submittedDate?: string;
}

export interface ApprovedStatusProps {
  onGoDashboard: () => void;
  approvalDate?: string;
  message?: string;
}

export interface RejectedStatusProps {
  onEditApplication: () => void;
  rejectionReason?: string;
  rejectionDate?: string;
}
