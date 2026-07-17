export type ApplicationStatusType = 'pending' | 'approved' | 'action_required';

export interface VerificationStatusContainerProps {
  status?: ApplicationStatusType;
}

export interface StatusCardProps {
  children: React.ReactNode;
  className?: string;
}

export interface StatusBadgeProps {
  status: ApplicationStatusType;
  className?: string;
}

export interface StatusIconProps {
  status: ApplicationStatusType;
  size?: 'sm' | 'md' | 'lg';
}

export interface StatusActionButtonsProps {
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  isLoading?: boolean;
}

export interface PendingStatusProps {
  onRefresh?: () => void;
  onBackToHome?: () => void;
}

export interface ApprovedStatusProps {
  approvalDate?: string;
  profileCompleteness?: number;
  onGoDashboard: () => void;
  onViewProfile?: () => void;
}

export interface ActionRequiredStatusProps {
  rejectionReasons?: string[];
  onEditApplication: () => void;
  onResubmit?: () => void;
}
