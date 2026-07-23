import Fuse from "fuse.js";
import type { DesignSystem } from "./types";

export type FilterGroup = "resources" | "technology" | "guidance" | "bestFor";
export type SortOption = "recommended" | "updated" | "name" | "stars" | "downloads";

export interface CatalogFilters {
  query: string;
  resources: string[];
  technology: string[];
  guidance: string[];
  bestFor: string[];
  sort: SortOption;
}

export const RESOURCE_OPTIONS = [
  ["design-kit", "Designer kit"], ["figma", "Figma library"], ["sketch", "Sketch library"], ["github", "GitHub"],
  ["storybook", "Storybook"], ["tokens", "Design tokens"], ["package", "Code package"],
  ["migration", "Migration guide"],
] as const;

export const GUIDANCE_OPTIONS = [
  ["accessibility", "Accessibility"], ["content", "Content and tone"], ["motion", "Motion"],
  ["forms", "Forms"], ["data-visualization", "Data visualisation"],
  ["internationalization", "Internationalisation"], ["dark-mode", "Dark mode"],
  ["navigation", "Navigation"], ["responsive-design", "Responsive design"],
] as const;

export const BEST_FOR_OPTIONS = [
  ["enterprise", "Enterprise products"], ["commerce", "Commerce"],
  ["public-services", "Public services"], ["consumer-products", "Consumer products"],
  ["content-heavy-products", "Content-heavy products"],
  ["developer-tools", "Developer tools"], ["data-heavy-products", "Data-heavy products"],
  ["multi-brand-products", "Multi-brand products"],
] as const;

export function systemValues(system: DesignSystem, group: FilterGroup): string[] {
  if (group === "technology") return system.frameworks;
  if (group === "guidance") return system.guidance ?? [];
  if (group === "bestFor") return system.best_for ?? [];

  return [
    system.has_designers_kit && "design-kit",
    system.figma_url && "figma", system.sketch_url && "sketch", system.github_repo && "github",
    system.storybook_url && "storybook", (system.tokens_url || system.token_format) && "tokens",
    system.npm_package && "package", system.migration_url && "migration",
  ].filter((value): value is string => Boolean(value));
}

export function matchesFilters(system: DesignSystem, filters: CatalogFilters): boolean {
  const query = filters.query.trim().toLowerCase();
  const searchable = [system.name, system.company, system.description, ...system.frameworks, ...(system.guidance ?? []), ...(system.best_for ?? [])].join(" ").toLowerCase();
  if (query && !searchable.includes(query)) return false;

  return (["resources", "technology", "guidance", "bestFor"] as FilterGroup[]).every((group) => {
    const selected = filters[group];
    return selected.length === 0 || selected.some((value) => systemValues(system, group).includes(value));
  });
}

const GENERIC_SEARCH_WORDS = new Set(["design", "system", "systems"]);

function searchWords(value: string): string[] {
  const words = value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]+/g) ?? [];
  const meaningful = words.filter((word) => ![...GENERIC_SEARCH_WORDS].some((generic) => editDistance(word, generic) <= 1));
  return meaningful.length ? meaningful : words;
}

function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  let beforePrevious = previous;
  for (let row = 1; row <= a.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= b.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + Number(a[row - 1] !== b[column - 1]),
      );
      if (row > 1 && column > 1 && a[row - 1] === b[column - 2] && a[row - 2] === b[column - 1]) {
        current[column] = Math.min(current[column], beforePrevious[column - 2] + 1);
      }
    }
    beforePrevious = previous;
    previous = current;
  }
  return previous[b.length];
}

export function searchSystems(systems: DesignSystem[], query: string): DesignSystem[] {
  if (!query.trim()) return systems;
  const value = searchWords(query).join(" ");
  const options = {
    includeScore: true,
    useTokenSearch: true,
    tokenMatch: "all" as const,
    ignoreLocation: true,
    ignoreDiacritics: true,
    ignoreFieldNorm: true,
  };
  const identities = systems.map((system) => ({ system, identity: `${system.name} ${system.company}` }));
  const named = new Fuse(identities, {
    ...options,
    threshold: 0.3,
    keys: ["identity"],
  }).search(value);
  if (named.length) {
    const bestScore = named[0].score ?? 0;
    return named.filter(({ score }) => (score ?? 1) <= bestScore + 0.08).map(({ item }) => item.system);
  }

  const metadata = systems.map((system) => ({
    system,
    content: [system.description, ...system.frameworks, ...(system.guidance ?? []), ...(system.best_for ?? [])].join(" "),
  }));
  return new Fuse(metadata, {
    ...options,
    threshold: 0.2,
    keys: ["content"],
  }).search(value).map(({ item }) => item.system);
}

export function suggestSystems(systems: DesignSystem[], query: string, limit = 6): DesignSystem[] {
  if (!query.trim()) return sortSystems(systems, "recommended").slice(0, limit);
  return searchSystems(systems, query).slice(0, limit);
}

export function sortSystems(systems: DesignSystem[], sort: SortOption): DesignSystem[] {
  const value = (system: DesignSystem, key: "stars" | "npm_weekly_downloads") => system.live[key] ?? -1;
  const updated = (system: DesignSystem) => Math.max(Date.parse(system.live.last_commit_at ?? ""), Date.parse(system.live.latest_release_at ?? "")) || 0;
  return [...systems].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "stars") return value(b, "stars") - value(a, "stars");
    if (sort === "downloads") return value(b, "npm_weekly_downloads") - value(a, "npm_weekly_downloads");
    if (sort === "updated") return updated(b) - updated(a);
    return b.recommendation_score - a.recommendation_score || a.name.localeCompare(b.name);
  });
}
