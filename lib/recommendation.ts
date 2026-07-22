import type { CuratedSystem, HealthLabel, LiveData } from "./types";

const GUIDANCE_WEIGHT = 35;
const RESOURCES_WEIGHT = 30;
const MAINTENANCE_WEIGHT = 20;
const ADOPTION_WEIGHT = 15;

const GUIDANCE_TOPIC_COUNT = 9;
const RESOURCE_TYPE_COUNT = 8;

const maintenanceScores: Record<HealthLabel, number> = {
  Active: 1,
  Slowing: 0.6,
  Stale: 0.2,
  Unknown: 0,
};

function logarithmicRatio(value: number | null, ceilingPower: number): number {
  if (!value || value < 0) return 0;
  return Math.min(Math.log10(value + 1) / ceilingPower, 1);
}

export function computeRecommendationScore(
  system: CuratedSystem,
  live: LiveData,
  health: HealthLabel
): number {
  const guidanceRatio = Math.min(system.guidance?.length ?? 0, GUIDANCE_TOPIC_COUNT) / GUIDANCE_TOPIC_COUNT;
  const resourceCount = [
    system.has_designers_kit,
    system.figma_url,
    system.sketch_url,
    system.github_repo,
    system.storybook_url,
    system.tokens_url || system.token_format,
    system.npm_package,
    system.migration_url,
  ].filter(Boolean).length;
  const adoptionRatio = (
    logarithmicRatio(live.stars, 6) +
    logarithmicRatio(live.npm_weekly_downloads, 7)
  ) / 2;

  const score =
    (guidanceRatio * GUIDANCE_WEIGHT) +
    ((resourceCount / RESOURCE_TYPE_COUNT) * RESOURCES_WEIGHT) +
    (maintenanceScores[health] * MAINTENANCE_WEIGHT) +
    (adoptionRatio * ADOPTION_WEIGHT);

  return Math.round(score * 10) / 10;
}
