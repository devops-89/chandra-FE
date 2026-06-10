export interface ReviewSubmitState {
  profileData: {
    name: string;
    title: string;
    experience: number;
    location: string;
    avatarUrl: string;
  };
  skills: string[];
  certificationLevel: string;
  verificationStatus: {
    documents: VerificationItem[];
    completedCount: number;
    totalCount: number;
  };
  serviceArea: {
    radius: number;
    areas: string[];
    mapImageUrl: string;
  };
}

export interface VerificationItem {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'failed';
}

export interface ReviewSubmitHeaderProps {
  title?: string;
  description?: string;
}

export interface ProfileSummaryCardProps {
  profile: {
    name: string;
    title: string;
    experience: number;
    location: string;
    avatarUrl: string;
  };
  onEdit?: () => void;
}

export interface SkillsSummaryCardProps {
  skills: string[];
  certificationLevel: string;
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
  areas: string[];
  mapImageUrl: string;
  onEdit?: () => void;
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
