import systemsJson from "@/data/systems.json";
import listingsJson from "@/data/awesome-design-systems.json";
import enrichmentJson from "@/data/catalog-enrichment.json";
import componentGalleryRanksJson from "@/data/component-gallery-ranks.json";
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

type ImportedListing = {
  name: string;
  site_url: string;
  has_components: boolean;
  has_voice_and_tone: boolean;
  has_designers_kit: boolean;
  source_url: string | null;
};

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function githubRepo(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;
    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    return owner && repo ? `${owner}/${repo}` : null;
  } catch {
    return null;
  }
}

function importedSystem(listing: ImportedListing): CuratedSystem {
  const features = [listing.has_components && "components", listing.has_voice_and_tone && "voice and tone guidance", listing.has_designers_kit && "designer resources"].filter(Boolean);
  return {
    id: slugify(listing.name), name: listing.name, company: "",
    description: features.length ? `Includes ${features.join(", ")}.` : "Public design system reference.",
    site_url: listing.site_url, github_repo: githubRepo(listing.source_url), figma_url: null,
    storybook_url: null, npm_package: null, frameworks: [], license: "Unknown",
    token_format: null, theming: "none", tags: [], listing_only: true,
    has_components: listing.has_components, has_voice_and_tone: listing.has_voice_and_tone,
    has_designers_kit: listing.has_designers_kit,
    guidance: listing.has_voice_and_tone ? ["content"] : [], best_for: [],
  };
}

export function getCatalog(): DesignSystem[] {
  const carbon = curatedSystems.find((system) => system.id === "carbon")!;
  const enrichment = enrichmentJson as Record<string, Partial<CuratedSystem>>;
  const componentGalleryRanks = componentGalleryRanksJson as Record<string, number>;
  const systems = (listingsJson as ImportedListing[]).map((listing) => ({
    ...(listing.name === "IBM Carbon" ? carbon : { ...importedSystem(listing), ...enrichment[listing.name] }),
    recommended_rank: componentGalleryRanks[listing.name],
  }));
  return systems.map((system) => {
    const live = liveData[system.id] ?? EMPTY_LIVE;
    return {
      ...system,
      live,
      health: computeHealthLabel(live),
    };
  });
}
