import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import type { CuratedSystem, LiveData, LiveDataMap } from "../lib/types";

const SYSTEMS_PATH = path.join(process.cwd(), "data", "systems.json");
const LIVE_PATH = path.join(process.cwd(), "data", "live.json");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_HEADERS: Record<string, string> = {
  Accept: "application/vnd.github+json",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

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

async function fetchGithubData(repo: string): Promise<Partial<LiveData>> {
  const repoRes = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: GITHUB_HEADERS,
  });
  if (!repoRes.ok) {
    throw new Error(`GitHub repo fetch failed for ${repo}: ${repoRes.status}`);
  }
  const repoData = await repoRes.json();

  let contributors_count: number | null = null;
  const contributorsRes = await fetch(
    `https://api.github.com/repos/${repo}/contributors?per_page=1&anon=true`,
    { headers: GITHUB_HEADERS },
  );
  if (contributorsRes.ok) {
    const link = contributorsRes.headers.get("link");
    const lastPageMatch = link?.match(/[?&]page=(\d+)>;\s*rel="last"/);
    if (lastPageMatch) {
      contributors_count = Number(lastPageMatch[1]);
    } else {
      const body = await contributorsRes.json();
      contributors_count = Array.isArray(body) ? body.length : null;
    }
  }

  let latest_release_tag: string | null = null;
  let latest_release_at: string | null = null;
  const releaseRes = await fetch(
    `https://api.github.com/repos/${repo}/releases/latest`,
    { headers: GITHUB_HEADERS },
  );
  if (releaseRes.ok) {
    const releaseData = await releaseRes.json();
    latest_release_tag = releaseData.tag_name ?? null;
    latest_release_at = releaseData.published_at ?? null;
  }

  return {
    stars: repoData.stargazers_count ?? null,
    open_issues: repoData.open_issues_count ?? null,
    last_commit_at: repoData.pushed_at ?? null,
    contributors_count,
    latest_release_tag,
    latest_release_at,
  };
}

async function fetchNpmData(pkg: string): Promise<Partial<LiveData>> {
  let npm_weekly_downloads: number | null = null;
  const downloadsRes = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${pkg}`,
  );
  if (downloadsRes.ok) {
    const body = await downloadsRes.json();
    npm_weekly_downloads = body.downloads ?? null;
  }

  let npm_package_size_kb: number | null = null;
  const sizeRes = await fetch(
    `https://bundlephobia.com/api/size?package=${encodeURIComponent(pkg)}`,
  );
  if (sizeRes.ok) {
    const body = await sizeRes.json();
    if (typeof body.gzip === "number") {
      npm_package_size_kb = Math.round(body.gzip / 1024);
    }
  }

  return { npm_weekly_downloads, npm_package_size_kb };
}

async function fetchOne(system: CuratedSystem): Promise<LiveData> {
  const live: LiveData = { ...EMPTY_LIVE, fetched_at: new Date().toISOString() };

  if (system.github_repo) {
    try {
      Object.assign(live, await fetchGithubData(system.github_repo));
    } catch (err) {
      console.warn(`[${system.id}] GitHub fetch failed:`, (err as Error).message);
    }
  }

  if (system.npm_package) {
    try {
      Object.assign(live, await fetchNpmData(system.npm_package));
    } catch (err) {
      console.warn(`[${system.id}] npm fetch failed:`, (err as Error).message);
    }
  }

  return live;
}

async function main() {
  const systems: CuratedSystem[] = JSON.parse(
    await readFile(SYSTEMS_PATH, "utf-8"),
  );

  const live: LiveDataMap = {};
  for (const system of systems) {
    console.log(`Fetching ${system.id}...`);
    live[system.id] = await fetchOne(system);
    // Stay well under GitHub's unauthenticated/authenticated rate limits.
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  await writeFile(LIVE_PATH, JSON.stringify(live, null, 2) + "\n");
  console.log(`Wrote ${LIVE_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
