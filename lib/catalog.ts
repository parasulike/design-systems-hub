import systemsJson from "@/data/systems.json";
import listingsJson from "@/data/awesome-design-systems.json";
import enrichmentJson from "@/data/catalog-enrichment.json";
import liveJson from "@/data/live.json";
import { computeHealthLabel } from "./health";
import { computeRecommendationScore } from "./recommendation";
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

const SKIPPED_DUPLICATE_LISTINGS = new Set(["Microsoft Fluent"]);
const DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  "AWS Cloudscape Design System": "Cloudscape",
  "Co-op Experience Library": "Coop",
  "Dell Design System": "DDS",
  "Firefox Photon Design System": "Acorn",
  Foundation: "Foundation Framework",
  "HPE Design System": "HPE",
  "Intuit Harmony": "QuickBooks",
  Jobber: "Atlantis",
  "Pluralsight Design System": "Pando",
  "Persona Design System": "Persona",
  "Privy Persona Design System": "Persona",
  "SAP OpenUI": "OpenUI5",
  Vercel: "Geist",
  "Visa Product Design System": "VPDS",
  "Wikimedia Codex": "Codex",
  "WMCA Design System": "WMCA",
};
const GENERIC_SYSTEM_NAMES = new Set([
  "Design Guidelines",
  "Design System",
  "Pattern Library",
  "Style Guide",
  "Styleguide",
  "UI",
]);

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

function displayName(name: string, company: string): string {
  if (DISPLAY_NAME_OVERRIDES[name]) return DISPLAY_NAME_OVERRIDES[name];
  if (!company) return name;

  const escapedCompany = company.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const candidates = [
    name.replace(new RegExp(`^${escapedCompany}(?:['’]s)?\\s+`, "i"), ""),
    name.replace(new RegExp(`\\s+\\(${escapedCompany}\\)$`, "i"), ""),
    name.replace(new RegExp(`\\s+(?:by|[–—-])\\s*${escapedCompany}$`, "i"), ""),
  ];
  const cleaned = candidates
    .find((candidate) => candidate !== name && candidate.length > 1)
    ?.replace(/^(?:Design System|Pattern Library|Style ?Guide)\s*[-–—:]\s*/i, "");

  return cleaned && !GENERIC_SYSTEM_NAMES.has(cleaned) ? cleaned : name;
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
  const systems = (listingsJson as ImportedListing[])
    .filter((listing) => !SKIPPED_DUPLICATE_LISTINGS.has(listing.name))
    .map((listing) => {
      if (listing.name === "IBM Carbon") return carbon;

      const system = { ...importedSystem(listing), ...enrichment[listing.name] };
      if (listing.name === "Fluent UI") {
        const fluentLegacy = enrichment["Microsoft Fluent"];
        return {
          ...system,
          name: "Fluent UI",
          description: "Microsoft’s current cross-platform design system for accessible, adaptive experiences across web, Windows, iOS, and Android.",
          site_url: "https://fluent2.microsoft.design/",
          frameworks: Array.from(new Set([...system.frameworks, ...(fluentLegacy.frameworks ?? [])])),
        };
      }

      return { ...system, name: displayName(system.name, system.company) };
    });
  return systems.map((system) => {
    const live = liveData[system.id] ?? EMPTY_LIVE;
    const health = computeHealthLabel(live);
    return {
      ...system,
      live,
      health,
      recommendation_score: computeRecommendationScore(system, live, health),
    };
  });
}
