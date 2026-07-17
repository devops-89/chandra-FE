'use client';

const categories = [
  'AC Services',
  'Electrical',
  'Appliance Repair',
];

export default function ServiceCategories() {
  return (
    <div>
      <h4
        className="
          text-sm
          text-slate-500
          mb-4
        "
      >
        Service Categories
      </h4>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category}
            className="
              flex
              items-center
              justify-between
              p-3
              rounded-2xl
              bg-slate-50
            "
          >
            <span className="font-medium">
              {category}
            </span>

            <span
              className="
                text-xs
                px-2
                py-1
                rounded-full
                bg-emerald-100
                text-emerald-700
              "
            >
              Active
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}