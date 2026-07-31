'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BankDetailsTab from './tabs/BankDetailsTab';
import DocumentsTab from './tabs/DocumentsTab';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import ServiceAreaTab from './tabs/ServiceAreaTab';
import SkillsAndServicesTab from './tabs/SkillsAndServicesTab';

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: 'person' },
  { id: 'skills', label: 'Skills & Services', icon: 'handyman' },
  { id: 'location', label: 'Service Area', icon: 'location_on' },
  { id: 'documents', label: 'Documents', icon: 'description' },
  { id: 'bank', label: 'Bank Details', icon: 'account_balance' },
];

export default function EditProfileContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoTab />;
      case 'skills': return <SkillsAndServicesTab />;
      case 'location': return <ServiceAreaTab />;
      case 'documents': return <DocumentsTab />;
      case 'bank': return <BankDetailsTab />;
      default: return <PersonalInfoTab />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()} 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Edit Profile</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your professional account details</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sticky top-6">
            <nav className="flex flex-col space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold transition-all
                    ${activeTab === tab.id 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 min-h-[700px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
