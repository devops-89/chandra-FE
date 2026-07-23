'use client';

import { useState } from 'react';
import BookingsHeader from './header/BookingsHeader';
import NearbyJobsContent from '../jobs/NearbyJobsContent';
import ActiveJobsContent from '../active-jobs/ActiveJobsContent';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<'new' | 'active'>('new');

  return (
    <div className="space-y-6">
      <BookingsHeader />
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          className={`py-3 px-6 font-medium text-sm transition-colors relative ${
            activeTab === 'new'
              ? 'text-emerald-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
          onClick={() => setActiveTab('new')}
        >
          New Requests
          {activeTab === 'new' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600" />
          )}
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm transition-colors relative ${
            activeTab === 'active'
              ? 'text-emerald-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Bookings
          {activeTab === 'active' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === 'new' && <NearbyJobsContent />}
        {activeTab === 'active' && <ActiveJobsContent />}
      </div>
    </div>
  );
}
