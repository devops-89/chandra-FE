'use client';

import { CheckCircle, ClipboardList } from 'lucide-react';

// Props kept minimal — this step is now a review/confirm screen.
// No fields map to the backend payload here; submission happens via the footer button.
interface Props {
  data: {
    status: string;  // kept in FormData for UI state only, not sent to backend
    cities: string;  // kept in FormData for UI state only, not sent to backend
  };
  errors:   Record<string, string | undefined>;
  onChange: (field: string, value: string) => void;
}

export default function PublishStep({ data: _data, errors: _errors, onChange: _onChange }: Props) {
  return (
    <div className="space-y-5">

      {/* Review notice */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 flex items-start gap-3">
        <CheckCircle size={20} className="shrink-0 mt-0.5 text-emerald-600" />
        <div>
          <p className="text-sm font-semibold text-emerald-800">Ready to publish</p>
          <p className="mt-1 text-sm text-emerald-700">
            Review your entries across the previous steps. Click{' '}
            <span className="font-semibold">Publish Service</span> below to submit.
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
        {[
          'Service name and description filled',
          'Base fare configured',
          'Specifications defined (optional)',
          'Technician requirements set (optional)',
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 px-4 py-3">
            <ClipboardList size={15} className="shrink-0 text-emerald-500" />
            <span className="text-sm text-slate-700">{item}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
