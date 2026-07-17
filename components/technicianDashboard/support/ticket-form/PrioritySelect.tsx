'use client';

const priorities = [
  'Low',
  'Medium',
  'High',
  'Critical',
];

export default function PrioritySelect() {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        Priority
      </label>

      <select
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 bg-white"
      >
        <option>Select Priority</option>

        {priorities.map((priority) => (
          <option
            key={priority}
            value={priority}
          >
            {priority}
          </option>
        ))}
      </select>
    </div>
  );
}