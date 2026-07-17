// Compatibility redirect: old /technician/onboarding/skill-tagging → new /technician/onboarding/skills-equipment
// Handles old bookmarks and any cached links that still point to the old URL.
import { redirect } from 'next/navigation';

export default function SkillTaggingRedirect() {
  redirect('/technician/onboarding/skills-equipment');
}
