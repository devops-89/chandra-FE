export type SkillType =
  | "solar-cleaning"
  | "ac-repair"
  | "plumbing"
  | "electrical";

export type SkillLevel =
  | "novice"
  | "intermediate"
  | "expert";

export interface SkillCardData {
  id: SkillType;
  title: string;
  description: string;
  icon: string;
}