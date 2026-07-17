'use client';

import { useAppSelector } from '@/redux/hooks';

export default function SkillsSection() {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );

  const profile = technician?.technicianProfile;

  const skills = [
    profile?.hasLadder && 'Ladder',
    profile?.hasACGauges && 'AC Gauges',
    profile?.hasSafetyEquipment && 'Safety Equipment',
    profile?.hasVehicle && 'Vehicle',
  ].filter((skill): skill is string => Boolean(skill));

  return (
    <div>
      <h4
        className="
          text-sm
          text-slate-500
          mb-4
        "
      >
        Equipment & Skills
      </h4>

      <div className="flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill) => (
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
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No equipment information available.
          </p>
        )}
      </div>
    </div>
  );
}