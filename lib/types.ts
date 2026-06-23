export type Theming = "none" | "single-brand" | "multi-brand";

export type HealthLabel = "Active" | "Slowing" | "Stale" | "Unknown";

// Hand-curated once, edited rarely. See docs/data-schema.md.
export interface CuratedSystem {
  id: string;
  name: string;
  company: string;
  description: string;
  site_url: string;
  github_repo: string | null; // "owner/repo"
  figma_url: string | null;
  storybook_url: string | null;
  npm_package: string | null;
  frameworks: string[];
  license: string;
  token_format: string | null;
  theming: Theming;
  tags: string[];
}

// Fetched on a schedule from GitHub/npm. Null when the source doesn't apply
// (e.g. no github_repo) or the fetch failed.
export interface LiveData {
  stars: number | null;
  open_issues: number | null;
  last_commit_at: string | null; // ISO date
  contributors_count: number | null;
  latest_release_tag: string | null;
  latest_release_at: string | null; // ISO date
  npm_weekly_downloads: number | null;
  npm_package_size_kb: number | null;
  fetched_at: string | null; // ISO date, when this entry was last refreshed
}

export type LiveDataMap = Record<string, LiveData>;

// What the UI actually renders: curated fields + live data + computed label.
export interface DesignSystem extends CuratedSystem {
  live: LiveData;
  health: HealthLabel;
}
