'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

import { PROFILE_TAB_ICONS,PROFILE_TABS } from '@/constants/admin/profileConstants';
import { useAppSelector } from '@/redux/hooks';
import type { ProfileTabId } from '@/types/admin/profile.types';
import type { User } from '@/types/auth.types';

import ChangePasswordCard from './ChangePasswordCard';
import PlatformSettings from './PlatformSettings';
import ProfileOverview from './ProfileOverview';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function readStoredUser(): User | null {
  try {
    const s = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    return s ? (JSON.parse(s) as User) : null;
  } catch {
    return null;
  }
}

/* ─── Tab Button ──────────────────────────────────────────────────────────── */

interface TabButtonProps {
  id: ProfileTabId;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ id, label, description, active, onClick }: TabButtonProps) {
  const Icon = PROFILE_TAB_ICONS[id];

  return (
    <button
      type="button"
      id={`profile-tab-${id}`}
      onClick={onClick}
      className={`w-full flex items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
        active
          ? 'bg-emerald-50 border border-emerald-100 shadow-sm'
          : 'hover:bg-slate-50 border border-transparent'
      }`}
    >
      <div
        className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
          active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        <Icon size={15} />
      </div>
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold leading-tight ${
            active ? 'text-emerald-700' : 'text-slate-700'
          }`}
        >
          {label}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">{description}</p>
      </div>
    </button>
  );
}

/* ─── Content Panel ────────────────────────────────────────────────────────── */

function ContentPanel({ activeTab }: { activeTab: ProfileTabId }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
      >
        {activeTab === 'overview' && <ProfileOverview />}
        {activeTab === 'security' && <ChangePasswordCard />}
        {activeTab === 'settings' && <PlatformSettings />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */

export default function Profile() {
  const reduxUser = useAppSelector((s) => s.auth.user);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTabId>('overview');

  useEffect(() => {
    const activeUser = reduxUser ?? readStoredUser();
    const handle = requestAnimationFrame(() => {
      setUser(activeUser);
    });
    return () => cancelAnimationFrame(handle);
  }, [reduxUser]);

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'A'
    : 'A';

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Administrator';
  const username = user ? `@${user.username}` : '';

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your profile, security credentials, and platform configurations
        </p>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left — Identity card + nav */}
        <aside className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Identity card */}
          <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-2xl font-bold ring-4 ring-white/30">
                {initials}
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">{fullName}</p>
                <p className="text-emerald-200 text-sm mt-0.5">{username}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <Shield size={11} />
                System Administrator
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {PROFILE_TABS.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                description={tab.description}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </aside>

        {/* Right — Dynamic content */}
        <main className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[500px]">
          <ContentPanel activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}
