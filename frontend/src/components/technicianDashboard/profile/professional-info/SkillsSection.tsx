'use client';

const skills = [
  'AC Repair',
  'AC Installation',
  'Electrical Wiring',
  'Appliance Repair',
  'Maintenance',
];

export default function SkillsSection() {
  return (
    <div>
      <h4
        className="
          text-sm
          text-slate-500
          mb-4
        "
      >
        Skills
      </h4>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              px-4
              py-2
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm
              font-medium
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}