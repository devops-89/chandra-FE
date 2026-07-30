'use client';

import ProfileContent from './ProfileContent';

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">
          Profile
        </h1>
        <p className="text-slate-500 text-lg">
          Manage your account and personal details
        </p>
      </div>
      <ProfileContent />
    </div>
  );
}
