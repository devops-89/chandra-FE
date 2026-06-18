'use client';

import AttachmentUpload from './AttachmentUpload';
import CategorySelect from './CategorySelect';
import PrioritySelect from './PrioritySelect';

export default function SupportTicketForm() {
  return (
    <div
      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm m-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Raise Support Ticket
        </h3>

        <p className="text-slate-500 mt-1">
          Submit your issue and our support team will contact you.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter issue subject"
            className="
              w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-50"
          />
        </div>

        <CategorySelect />

        <PrioritySelect />

        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Describe your issue..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 resize-none outline-none focus:border-emerald-500"
          />
        </div>

        <AttachmentUpload />

        <button
          className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all"
        >
          Submit Ticket
        </button>
      </div>
    </div>
  );
}