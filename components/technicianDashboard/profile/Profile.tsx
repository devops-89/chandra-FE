'use client';

import ProfileHeader from './header/ProfileHeader';
import ProfileContent from './ProfileContent';

export default function Profile() {
  return (
    <div className="space-y-6 mt-6">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}