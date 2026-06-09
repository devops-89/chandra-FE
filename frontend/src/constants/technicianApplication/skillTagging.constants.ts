import type { SkillCardData } from "@/types/technicianApplication/skillTagging.types";

export const SKILLS: SkillCardData[] = [
  {
    id: "solar-cleaning",
    title: "Solar Cleaning",
    description:
      "Maintenance and deep cleaning of residential/commercial solar panels.",
    icon: "solar_power",
  },
  {
    id: "ac-repair",
    title: "AC Repair",
    description:
      "HVAC diagnostics, gas refilling, and component replacement.",
    icon: "ac_unit",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    description:
      "Leak repairs, installation of fixtures, and drainage solutions.",
    icon: "plumbing",
  },
  {
    id: "electrical",
    title: "Electrical",
    description:
      "Wiring, circuit breaker testing, and smart home installations.",
    icon: "bolt",
  },
];