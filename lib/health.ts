import type { HealthLabel, LiveData } from "./types";

const ACTIVE_THRESHOLD_DAYS = 90;
const SLOWING_THRESHOLD_DAYS = 365;

export function computeHealthLabel(live: LiveData): HealthLabel {
  if (!live.last_commit_at) {
    return "Unknown";
  }

  const daysSinceCommit =
    (Date.now() - new Date(live.last_commit_at).getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceCommit <= ACTIVE_THRESHOLD_DAYS) {
    return "Active";
  }
  if (daysSinceCommit <= SLOWING_THRESHOLD_DAYS) {
    return "Slowing";
  }
  return "Stale";
}
