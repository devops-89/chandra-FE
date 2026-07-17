'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { fetchTechnicianProfile } from '@/redux/slices/technicianProfileSlice';

import AvailabilityCard from './availability/AvailabilityCard';
import BankDetailsCard from './bank-details/BankDetailsCard';
import UpiCard from './bank-details/UpiCard';
import DocumentsCard from './documents/DocumentsCard';
import ProfileHero from './overview/ProfileHero';
import ProfileStats from './overview/ProfileStats';
import PersonalInfoCard from './personal-info/PersonalInfoCard';
import ProfessionalInfoCard from './professional-info/ProfessionalInfoCard';
import NotificationSettings from './settings/NotificationSettings';

export default function ProfileContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTechnicianProfile());
  }, [dispatch]);

  return (
    <div className="space-y-6">
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

        <div className="col-span-12 xl:col-span-4">
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}