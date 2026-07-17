import {
  Bell,
  KeyRound,
  ShieldAlert,
  Sliders,
  User,
} from 'lucide-react';

import type {
  NotificationSettings,
  PasswordStrengthCriteria,
  PlatformSettingsState,
  ProfileTab,
  SecuritySettings,
  SystemSettings,
} from '@/types/admin/profile.types';

// ─── Profile Navigation Tabs ──────────────────────────────────────────────────

export const PROFILE_TABS: ProfileTab[] = [
  {
    id: 'overview',
    label: 'Profile Overview',
    description: 'View and edit personal details',
  },
  {
    id: 'security',
    label: 'Security & Password',
    description: 'Update your account password',
  },
  {
    id: 'settings',
    label: 'Platform Settings',
    description: 'Configure notifications and system preferences',
  },
];

// ─── Tab Icons Map ─────────────────────────────────────────────────────────────

export const PROFILE_TAB_ICONS = {
  overview: User,
  security: KeyRound,
  settings: Sliders,
} as const;

// ─── Platform Settings Sections ──────────────────────────────────────────────

export const NOTIFICATION_SECTION_META = {
  icon: Bell,
  title: 'Notifications',
  description: 'Configure how and when you receive system alerts',
};

export const SECURITY_SECTION_META = {
  icon: ShieldAlert,
  title: 'Security & Sign In',
  description: 'Control account security options and access controls',
};

export const SYSTEM_SECTION_META = {
  icon: Sliders,
  title: 'System Preferences',
  description: 'Manage configuration settings for the entire platform',
};

// ─── Default Platform Settings ────────────────────────────────────────────────

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  email: true,
  sms: false,
  security: true,
};

export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  twoFactor: false,
  sessionTimeout: true,
  loginAlerts: true,
};

export const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  maintenance: false,
  autoBackup: true,
};

export const DEFAULT_PLATFORM_SETTINGS: PlatformSettingsState = {
  notifications: DEFAULT_NOTIFICATION_SETTINGS,
  security: DEFAULT_SECURITY_SETTINGS,
  system: DEFAULT_SYSTEM_SETTINGS,
};

// ─── Notification Setting Item Labels ────────────────────────────────────────

export const NOTIFICATION_ITEMS: {
  key: keyof NotificationSettings;
  label: string;
  description: string;
}[] = [
  {
    key: 'email',
    label: 'Email Alerts',
    description: 'Receive daily activity summaries and critical booking updates via email.',
  },
  {
    key: 'sms',
    label: 'SMS Updates',
    description: 'Send direct text alerts for immediate, high-priority emergency bookings.',
  },
  {
    key: 'security',
    label: 'Security Notifications',
    description: 'Get notified instantly for unusual activities or multiple failed login attempts.',
  },
];

export const SECURITY_ITEMS: {
  key: keyof SecuritySettings;
  label: string;
  description: string;
}[] = [
  {
    key: 'twoFactor',
    label: 'Two-Factor Authentication (2FA)',
    description: 'Secure your admin account using time-based codes via authenticator apps.',
  },
  {
    key: 'sessionTimeout',
    label: 'Automatic Session Timeout',
    description: 'Log out inactive sessions automatically after 30 minutes of inactivity.',
  },
  {
    key: 'loginAlerts',
    label: 'New Device Alerts',
    description: 'Receive an email confirmation when signing in from an unrecognized device.',
  },
];

export const SYSTEM_ITEMS: {
  key: keyof SystemSettings;
  label: string;
  description: string;
}[] = [
  {
    key: 'maintenance',
    label: 'Maintenance Mode',
    description: 'Temporarily disable the public-facing app while system upgrades run.',
  },
  {
    key: 'autoBackup',
    label: 'Automatic Daily Backups',
    description: 'Trigger full encrypted database dumps every night at 02:00 AM to cloud storage.',
  },
];

// ─── Password Strength Metadata ───────────────────────────────────────────────

export const STRENGTH_CRITERIA_LABELS: {
  key: keyof PasswordStrengthCriteria;
  label: string;
}[] = [
  { key: 'minChar', label: 'At least 8 characters' },
  { key: 'hasUpper', label: 'Uppercase letter (A-Z)' },
  { key: 'hasNumber', label: 'Number (0-9)' },
  { key: 'hasSpecial', label: 'Special character (!@#$...)' },
];

export const STRENGTH_LEVEL_MAP = [
  { label: 'Too Short', colorBar: 'bg-slate-200', colorText: 'text-slate-400', width: 'w-0' },
  { label: 'Weak', colorBar: 'bg-red-500', colorText: 'text-red-500', width: 'w-1/4' },
  { label: 'Fair', colorBar: 'bg-orange-500', colorText: 'text-orange-500', width: 'w-2/4' },
  { label: 'Good', colorBar: 'bg-amber-500', colorText: 'text-amber-500', width: 'w-3/4' },
  { label: 'Strong', colorBar: 'bg-emerald-500', colorText: 'text-emerald-500', width: 'w-full' },
] as const;

// ─── Shared Input Class ────────────────────────────────────────────────────────

export const PROFILE_INPUT_BASE =
  'w-full rounded-xl border p-3 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-2 focus:ring-emerald-100';
