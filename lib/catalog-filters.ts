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

export function sortSystems(systems: DesignSystem[], sort: SortOption): DesignSystem[] {
  const value = (system: DesignSystem, key: "stars" | "npm_weekly_downloads") => system.live[key] ?? -1;
  const updated = (system: DesignSystem) => Math.max(Date.parse(system.live.last_commit_at ?? ""), Date.parse(system.live.latest_release_at ?? "")) || 0;
  return [...systems].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "stars") return value(b, "stars") - value(a, "stars");
    if (sort === "downloads") return value(b, "npm_weekly_downloads") - value(a, "npm_weekly_downloads");
    if (sort === "updated") return updated(b) - updated(a);
    return (a.recommended_rank ?? Number.MAX_SAFE_INTEGER) - (b.recommended_rank ?? Number.MAX_SAFE_INTEGER) || a.name.localeCompare(b.name);
  });
}
