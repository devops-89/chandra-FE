'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import {
  DEFAULT_PLATFORM_SETTINGS,
  NOTIFICATION_ITEMS,
  NOTIFICATION_SECTION_META,
  SECURITY_ITEMS,
  SECURITY_SECTION_META,
  SYSTEM_ITEMS,
  SYSTEM_SECTION_META,
} from '@/constants/admin/profileConstants';
import type {
  NotificationSettings,
  PlatformSettingsState,
  SecuritySettings,
  SystemSettings,
} from '@/types/admin/profile.types';

/* ─── Toggle Switch ────────────────────────────────────────────────────────── */

function ToggleSwitch({
  id,
  checked,
  onToggle,
}: {
  id: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 rounded-full outline-none transition-colors duration-200 focus:ring-2 focus:ring-emerald-200 ${
        checked ? 'bg-emerald-600' : 'bg-slate-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

/* ─── Toggle Row ───────────────────────────────────────────────────────────── */

function ToggleRow({
  id,
  label,
  description,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1 pr-6 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      <ToggleSwitch id={id} checked={checked} onToggle={onToggle} />
    </div>
  );
}

/* ─── Section Header ───────────────────────────────────────────────────────── */

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
        <Icon size={19} />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */

export default function PlatformSettings() {
  const [settings, setSettings] = useState<PlatformSettingsState>(DEFAULT_PLATFORM_SETTINGS);

  const toggleNotification = (key: keyof NotificationSettings) =>
    setSettings((p) => ({
      ...p,
      notifications: { ...p.notifications, [key]: !p.notifications[key] },
    }));

  const toggleSecurity = (key: keyof SecuritySettings) =>
    setSettings((p) => ({
      ...p,
      security: { ...p.security, [key]: !p.security[key] },
    }));

  const toggleSystem = (key: keyof SystemSettings) =>
    setSettings((p) => ({
      ...p,
      system: { ...p.system, [key]: !p.system[key] },
    }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 sm:p-8 space-y-0 divide-y divide-slate-100"
    >
      {/* ── Notification Preferences ──────────────────────────────────── */}
      <section className="pb-8">
        <SectionHeader
          icon={NOTIFICATION_SECTION_META.icon}
          title={NOTIFICATION_SECTION_META.title}
          description={NOTIFICATION_SECTION_META.description}
        />
        <div className="divide-y divide-slate-50">
          {NOTIFICATION_ITEMS.map(({ key, label, description }) => (
            <ToggleRow
              key={key}
              id={`notif-${key}`}
              label={label}
              description={description}
              checked={settings.notifications[key]}
              onToggle={() => toggleNotification(key)}
            />
          ))}
        </div>
      </section>

      {/* ── Security & Access ─────────────────────────────────────────── */}
      <section className="py-8">
        <SectionHeader
          icon={SECURITY_SECTION_META.icon}
          title={SECURITY_SECTION_META.title}
          description={SECURITY_SECTION_META.description}
        />
        <div className="divide-y divide-slate-50">
          {SECURITY_ITEMS.map(({ key, label, description }) => (
            <ToggleRow
              key={key}
              id={`security-${key}`}
              label={label}
              description={description}
              checked={settings.security[key]}
              onToggle={() => toggleSecurity(key)}
            />
          ))}
        </div>
      </section>

      {/* ── System Configuration ──────────────────────────────────────── */}
      <section className="pt-8">
        <SectionHeader
          icon={SYSTEM_SECTION_META.icon}
          title={SYSTEM_SECTION_META.title}
          description={SYSTEM_SECTION_META.description}
        />
        <div className="divide-y divide-slate-50">
          {SYSTEM_ITEMS.map(({ key, label, description }) => (
            <ToggleRow
              key={key}
              id={`system-${key}`}
              label={label}
              description={description}
              checked={settings.system[key]}
              onToggle={() => toggleSystem(key)}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
