/**
 * Formats a submission date ISO string into a human-readable format.
 * Format: "July 6, 2026"
 * If dateString is unavailable, returns "--".
 */
export function formatSubmissionDate(dateString?: string | null): string {
  if (!dateString) {
    return '--';
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '--';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
