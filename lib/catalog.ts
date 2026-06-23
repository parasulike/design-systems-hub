import systemsJson from "@/data/systems.json";
import liveJson from "@/data/live.json";
import { computeHealthLabel } from "./health";
import type { CuratedSystem, DesignSystem, LiveData, LiveDataMap } from "./types";

const EMPTY_LIVE: LiveData = {
  stars: null,
  open_issues: null,
  last_commit_at: null,
  contributors_count: null,
  latest_release_tag: null,
  latest_release_at: null,
  npm_weekly_downloads: null,
  npm_package_size_kb: null,
  fetched_at: null,
};

const curatedSystems = systemsJson as CuratedSystem[];
const liveData = liveJson as LiveDataMap;

export function getCatalog(): DesignSystem[] {
  return curatedSystems.map((system) => {
    const live = liveData[system.id] ?? EMPTY_LIVE;
    return {
      ...system,
      live,
      health: computeHealthLabel(live),
    };
  });
}
