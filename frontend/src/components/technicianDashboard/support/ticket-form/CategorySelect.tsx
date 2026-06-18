'use client';

const categories = [
  'Payment Issue',
  'Job Issue',
  'Technical Problem',
  'Account Verification',
  'Other',
];

export default function CategorySelect() {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        Category
      </label>

      <select
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 bg-white"
      >
        <option>Select Category</option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}