'use client';

import AvailabilityCard from './availability/AvailabilityCard';
import BankDetailsCard from './bank-details/BankDetailsCard';
// import PayoutSettings from './bank-details/PayoutSettings';
import UpiCard from './bank-details/UpiCard';
import DocumentsCard from './documents/DocumentsCard';
import ProfileTabs from './header/ProfileTabs';
import ProfileHero from './overview/ProfileHero';
import ProfileStats from './overview/ProfileStats';
import PersonalInfoCard from './personal-info/PersonalInfoCard';
import ProfessionalInfoCard from './professional-info/ProfessionalInfoCard';
import AccountSettings from './settings/AccountSettings';
// import NotificationSettings from './settings/NotificationSettings';
// import SecuritySettings from './settings/SecuritySettings';

export default function ProfileContent() {
  return (
    <div className="space-y-6">
      <ProfileTabs />

      <ProfileHero />

      <ProfileStats />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-6">
            <PersonalInfoCard />
        </div>

      <div className="col-span-12 xl:col-span-6">
            <ProfessionalInfoCard />
        </div>

      <div className="col-span-12 xl:col-span-6">
            <DocumentsCard />
      </div>

      <div className="col-span-12 xl:col-span-6">
            <AvailabilityCard />
      </div>
        <div className="col-span-12 xl:col-span-4">
            <BankDetailsCard />
        </div>

        <div className="col-span-12 xl:col-span-4">
            <UpiCard />
        </div>

        {/* <div className="col-span-12 xl:col-span-4">
            <PayoutSettings />
        </div> */}

        <div className="col-span-12 xl:col-span-4">
            <AccountSettings />
        </div>

        {/*<div className="col-span-12 xl:col-span-4">
            <NotificationSettings />
        </div>

        <div className="col-span-12 xl:col-span-4">
            <SecuritySettings />
        </div> */}
        </div>
    </div>
  );
}