'use client';

/* ─── Props ──────────────────────────────────────────────────────── */
interface Props {
  data: {
    skills:                 string;
    tools:                  string;
    technicianInstructions: string;
  };
  onChange: (field: string, value: string) => void;
}

/* ─── Shared styles ──────────────────────────────────────────────── */
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

/* ─── Component ──────────────────────────────────────────────────── */
export default function RequirementsStep({ data, onChange }: Props) {
  return (
    <div className="space-y-5">

      {/* Section label */}
      <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
        <p className="text-xs font-medium text-amber-700">
          All fields on this step are optional. They are only relevant for services
          that involve technician dispatch.
        </p>
      </div>

      {/* ── Required Skills ───────────────────────────────────────── */}
      <div>
        <label
          htmlFor="req-skills"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Required Skills
          <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="req-skills"
          value={data.skills}
          onChange={(e) => onChange('skills', e.target.value)}
          placeholder="e.g. Solar panel knowledge, Electrical safety"
          className={inputBase}
        />
        <p className="mt-1 text-xs text-slate-400">Separate multiple skills with commas</p>
      </div>

      {/* ── Required Tools ───────────────────────────────────────── */}
      <div>
        <label
          htmlFor="req-tools"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Required Tools
          <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="req-tools"
          rows={3}
          value={data.tools}
          onChange={(e) => onChange('tools', e.target.value)}
          placeholder="List the tools and equipment a technician needs for this service..."
          className={textareaBase}
        />
      </div>

      {/* ── Technician Instructions ───────────────────────────────── */}
      <div>
        <label
          htmlFor="req-instructions"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Technician Instructions
          <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="req-instructions"
          rows={4}
          value={data.technicianInstructions}
          onChange={(e) => onChange('technicianInstructions', e.target.value)}
          placeholder="Internal instructions for the technician — not visible to customers..."
          className={textareaBase}
        />
        <p className="mt-1 text-xs text-slate-400">
          These instructions will only be shown to assigned technicians.
        </p>
      </div>

    </div>
  );
}
