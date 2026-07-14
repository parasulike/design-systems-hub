import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getPool } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedDir = path.join(__dirname, "..", "..", "db", "seed");

async function upsertDesignSystem(client, system) {
  const d = system.detail ?? {};
  const { rows } = await client.query(
    `INSERT INTO design_systems
       (slug, name, company, description, site_url, github_repo, figma_url,
        storybook_url, npm_package, license, token_format, theming,
        industry, launch_year, open_source,
        design_philosophy, accessibility, developer_experience,
        governance, contribution_process,
        updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,now())
     ON CONFLICT (slug) DO UPDATE SET
       name = EXCLUDED.name, company = EXCLUDED.company, description = EXCLUDED.description,
       site_url = EXCLUDED.site_url, github_repo = EXCLUDED.github_repo, figma_url = EXCLUDED.figma_url,
       storybook_url = EXCLUDED.storybook_url, npm_package = EXCLUDED.npm_package, license = EXCLUDED.license,
       token_format = EXCLUDED.token_format, theming = EXCLUDED.theming,
       industry = EXCLUDED.industry, launch_year = EXCLUDED.launch_year, open_source = EXCLUDED.open_source,
       design_philosophy = EXCLUDED.design_philosophy, accessibility = EXCLUDED.accessibility,
       developer_experience = EXCLUDED.developer_experience, governance = EXCLUDED.governance,
       contribution_process = EXCLUDED.contribution_process,
       updated_at = now()
     RETURNING id`,
    [
      system.slug,
      system.name,
      system.company ?? null,
      system.description ?? null,
      system.site_url ?? null,
      system.github_repo ?? null,
      system.figma_url ?? null,
      system.storybook_url ?? null,
      system.npm_package ?? null,
      system.license ?? null,
      system.token_format ?? null,
      system.theming ?? null,
      d.industry ?? null,
      d.launch_year ?? null,
      d.open_source ?? null,
      d.design_philosophy ?? null,
      d.accessibility ?? null,
      d.developer_experience ?? null,
      d.governance ?? null,
      d.contribution_process ?? null,
    ]
  );
  return rows[0].id;
}

async function lookupOrInsert(client, table, name) {
  const { rows } = await client.query(
    `INSERT INTO ${table} (name) VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
    [name]
  );
  return rows[0].id;
}

async function linkJoinRow(client, table, column, designSystemId, otherId) {
  await client.query(
    `INSERT INTO ${table} (design_system_id, ${column}) VALUES ($1, $2)
     ON CONFLICT (design_system_id, ${column}) DO NOTHING`,
    [designSystemId, otherId]
  );
}

async function upsertMetrics(client, designSystemId, metrics) {
  if (!metrics) return;
  await client.query(
    `INSERT INTO design_system_metrics
       (design_system_id, stars, open_issues, last_commit_at, contributors_count,
        latest_release_tag, latest_release_at, npm_weekly_downloads, npm_package_size_kb, fetched_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     ON CONFLICT (design_system_id) DO UPDATE SET
       stars = EXCLUDED.stars, open_issues = EXCLUDED.open_issues, last_commit_at = EXCLUDED.last_commit_at,
       contributors_count = EXCLUDED.contributors_count, latest_release_tag = EXCLUDED.latest_release_tag,
       latest_release_at = EXCLUDED.latest_release_at, npm_weekly_downloads = EXCLUDED.npm_weekly_downloads,
       npm_package_size_kb = EXCLUDED.npm_package_size_kb, fetched_at = EXCLUDED.fetched_at`,
    [
      designSystemId,
      metrics.stars ?? null,
      metrics.open_issues ?? null,
      metrics.last_commit_at ?? null,
      metrics.contributors_count ?? null,
      metrics.latest_release_tag ?? null,
      metrics.latest_release_at ?? null,
      metrics.npm_weekly_downloads ?? null,
      metrics.npm_package_size_kb ?? null,
      metrics.fetched_at ?? null,
    ]
  );
}

async function upsertParasNotes(client, designSystemId, notes) {
  if (!notes) return;
  await client.query(
    `INSERT INTO paras_notes
       (design_system_id, strengths, weaknesses, best_suited_for,
        ideas_worth_borrowing, lessons_learned)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (design_system_id) DO UPDATE SET
       strengths = EXCLUDED.strengths, weaknesses = EXCLUDED.weaknesses,
       best_suited_for = EXCLUDED.best_suited_for,
       ideas_worth_borrowing = EXCLUDED.ideas_worth_borrowing,
       lessons_learned = EXCLUDED.lessons_learned`,
    [
      designSystemId,
      notes.strengths ?? null,
      notes.weaknesses ?? null,
      notes.best_suited_for ?? null,
      notes.ideas_worth_borrowing ?? null,
      notes.lessons_learned ?? null,
    ]
  );
}

async function seedFile(pool, file) {
  const system = JSON.parse(readFileSync(path.join(seedDir, file), "utf8"));
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const designSystemId = await upsertDesignSystem(client, system);

    for (const frameworkName of system.frameworks ?? []) {
      const frameworkId = await lookupOrInsert(client, "frameworks", frameworkName);
      await linkJoinRow(
        client,
        "design_system_frameworks",
        "framework_id",
        designSystemId,
        frameworkId
      );
    }

    for (const tagName of system.tags ?? []) {
      const tagId = await lookupOrInsert(client, "tags", tagName);
      await linkJoinRow(client, "design_system_tags", "tag_id", designSystemId, tagId);
    }

    await upsertMetrics(client, designSystemId, system.metrics);
    await upsertParasNotes(client, designSystemId, system.paras_notes);

    await client.query("COMMIT");
    console.log(`seeded ${system.slug}`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(`failed  ${file}:`, err.message);
    throw err;
  } finally {
    client.release();
  }
}

async function run() {
  const pool = getPool();
  const files = readdirSync(seedDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  let failures = 0;
  for (const file of files) {
    try {
      await seedFile(pool, file);
    } catch {
      failures += 1;
    }
  }

  await pool.end();

  if (failures > 0) {
    console.error(`${failures} seed file(s) failed`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
