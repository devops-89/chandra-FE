'use client';

// Step 3 — all fields optional, no errors prop needed
interface Props {
  data: { skills: string; questions: string };
  onChange: (field: string, value: string) => void;
}

const textareaBase = `
  w-full rounded-xl border border-slate-200 p-3
  text-slate-800 placeholder:text-slate-400
  outline-none transition-all resize-none
  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
`;

const inputBase = `
  w-full rounded-xl border border-slate-200 p-3
  text-slate-800 placeholder:text-slate-400
  outline-none transition-all
  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
`;

export default function RequirementsStep({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      {/* Skills */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Required Skills
          <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <input
          value={data.skills}
          onChange={(e) => onChange('skills', e.target.value)}
          placeholder="e.g. Solar panel knowledge, Electrical safety (comma-separated)"
          className={inputBase}
        />
        <p className="mt-1 text-xs text-slate-400">Separate multiple skills with commas</p>
      </div>

      {/* Tools */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Required Tools
          <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={data.tools}
          onChange={(e) => onChange('tools', e.target.value)}
          placeholder="List the tools and equipment needed for this service..."
          className={textareaBase}
        />
      </div>

      {/* Booking questions */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Booking Questions
          <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          rows={4}
          value={data.questions}
          onChange={(e) => onChange('questions', e.target.value)}
          placeholder="Questions to ask the customer at the time of booking..."
          className={textareaBase}
        />
      </div>
    </div>
  );
}
