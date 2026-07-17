'use client';

import ActivityItem from './ActivityItem';

export default function ActivityList() {
  return (
    <div className="space-y-6">
      <ActivityItem
        icon="task_alt"
        title="Job Completed"
        description="Full House Cleaning at Sector 45"
        time="11:30 AM"
        iconClass="bg-emerald-100 text-emerald-600"
      />

      <ActivityItem
        icon="account_balance_wallet"
        title="Payment Credited"
        description="+₹600.00"
        time="10:45 AM"
        iconClass="bg-blue-100 text-blue-600"
      />

      <ActivityItem
        icon="info"
        title="Doc Verified"
        description="New vehicle papers approved"
        time="Yesterday"
        iconClass="bg-slate-100 text-slate-600"
        showLine={false}
      />
    </div>
  );
}