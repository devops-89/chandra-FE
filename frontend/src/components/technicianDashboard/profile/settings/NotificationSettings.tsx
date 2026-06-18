'use client';

import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationSettings() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        flex
        flex-col
        h-full
        shadow-sm
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <NotificationsIcon className="text-emerald-500" />

        <h3 className="text-xl font-bold">
          Notifications
        </h3>
      </div>

      <div className="space-y-10 mt-6">
        <div className="flex justify-between">
          <span>Push Notifications</span>
          <span className="text-emerald-600">
            Enabled
          </span>
        </div>

        <div className="flex justify-between">
          <span>Email Alerts</span>
          <span className="text-emerald-600">
            Enabled
          </span>
        </div>

        <div className="flex justify-between">
          <span>SMS Alerts</span>
          <span className="text-slate-500">
            Disabled
          </span>
        </div>
      </div>
    </div>
  );
}