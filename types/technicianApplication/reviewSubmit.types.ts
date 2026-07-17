export interface ReviewSubmitState {
  profile: {
    name: string;
    title: string;
    experience: number;
    location: string;
    selfieUrl: string;
  };
  bankDetails: {
    payoutMethod: 'bank-transfer' | 'upi';
    // Bank transfer fields
    accountHolderName?: string;
    accountNumber?: string;
    ifscCode?: string;
    // UPI fields
    upiId?: string;
  };
  // Skills & Equipments step data
  services: { serviceId: number }[];
  yearsOfExperience: number | null;
  languages: string[];
  brandExpertise: { brandName: string }[];
  hasLadder: boolean;
  hasACGauges: boolean;
  hasSafetyEquipment: boolean;
  hasVehicle: boolean;
  gst: string;
  verificationStatus: {
    documents: VerificationItem[];
    completedCount: number;
    totalCount: number;
  };
  serviceArea: {
    radius: number;
    latitude?: number;
    longitude?: number;
    fullAddress?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

export interface VerificationItem {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'failed';
  /** Blob URL of the uploaded file — valid only for the current browser session. */
  previewUrl?: string;
}

export interface ReviewSubmitHeaderProps {
  title?: string;
  description?: string;
}

export interface ProfileSummaryCardProps {
  profile: ReviewSubmitState['profile'];
  onEdit?: () => void;
}

export interface BankDetailsSummaryCardProps {
  bankDetails: ReviewSubmitState['bankDetails'];
  onEdit?: () => void;
}

export interface SkillsSummaryCardProps {
  services: { serviceId: number }[];
  serviceNameMap: Map<number, string>;
  yearsOfExperience: number | null;
  languages: string[];
  brandExpertise: { brandName: string }[];
  hasLadder: boolean;
  hasACGauges: boolean;
  hasSafetyEquipment: boolean;
  hasVehicle: boolean;
  gst: string;
  onEdit?: () => void;
}

export interface VerificationSummaryCardProps {
  verificationItems: VerificationItem[];
  completedCount: number;
  totalCount: number;
  onEdit?: () => void;
}

export interface ServiceCoverageCardProps {
  radius: number;
  latitude?: number;
  longitude?: number;
  fullAddress?: string;
}

export interface LaunchSectionProps {
  onSubmit: () => void;
  isLoading?: boolean;
}

export interface SubmitApprovalButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}
