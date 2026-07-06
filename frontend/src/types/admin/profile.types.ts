// ─── Profile Module Types ─────────────────────────────────────────────────────

export interface AdminProfileFormFields {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
}

export interface AdminProfileFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
}

// ─── Change Password Types ────────────────────────────────────────────────────

export interface ChangePasswordFormFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordFormErrors {
  current?: string;
  newPass?: string;
  confirm?: string;
}

export interface PasswordStrengthCriteria {
  minChar: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

// ─── Platform Settings Types ──────────────────────────────────────────────────

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  security: boolean;
}

export interface SecuritySettings {
  twoFactor: boolean;
  sessionTimeout: boolean;
  loginAlerts: boolean;
}

export interface SystemSettings {
  maintenance: boolean;
  autoBackup: boolean;
}

export interface PlatformSettingsState {
  notifications: NotificationSettings;
  security: SecuritySettings;
  system: SystemSettings;
}

// ─── Profile Tab Types ────────────────────────────────────────────────────────

export type ProfileTabId = 'overview' | 'security' | 'settings';

export interface ProfileTab {
  id: ProfileTabId;
  label: string;
  description: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  profileImage?: File;
}

export interface UpdateProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    profileImage?: string;
  };
}