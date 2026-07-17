export interface NotificationSettings {
  pushNotifications: boolean;

  emailNotifications: boolean;

  smsNotifications: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;

  passwordLastUpdated: string;
}