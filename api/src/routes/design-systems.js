import { Router } from "express";
import { query } from "../db.js";

const router = Router();

const BASE_SELECT = `
  SELECT
    ds.id, ds.slug, ds.name, ds.company, ds.description, ds.site_url, ds.github_repo,
    ds.figma_url, ds.storybook_url, ds.npm_package, ds.license, ds.token_format, ds.theming,
    ds.created_at, ds.updated_at,
    COALESCE(ARRAY_AGG(DISTINCT f.name) FILTER (WHERE f.name IS NOT NULL), '{}') AS frameworks,
    COALESCE(ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL), '{}') AS tags,
    CASE WHEN m.design_system_id IS NULL THEN NULL ELSE row_to_json(m.*) END AS metrics
  FROM design_systems ds
  LEFT JOIN design_system_frameworks dsf ON dsf.design_system_id = ds.id
  LEFT JOIN frameworks f ON f.id = dsf.framework_id
  LEFT JOIN design_system_tags dst ON dst.design_system_id = ds.id
  LEFT JOIN tags t ON t.id = dst.tag_id
  LEFT JOIN design_system_metrics m ON m.design_system_id = ds.id
`;

const DETAIL_SELECT = `
  SELECT
    ds.id, ds.slug, ds.name, ds.company, ds.description, ds.site_url, ds.github_repo,
    ds.figma_url, ds.storybook_url, ds.npm_package, ds.license, ds.token_format, ds.theming,
    ds.industry, ds.launch_year, ds.open_source,
    ds.design_philosophy, ds.accessibility, ds.developer_experience,
    ds.governance, ds.contribution_process,
    ds.created_at, ds.updated_at,
    COALESCE(ARRAY_AGG(DISTINCT f.name) FILTER (WHERE f.name IS NOT NULL), '{}') AS frameworks,
    COALESCE(ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL), '{}') AS tags,
    CASE WHEN m.design_system_id IS NULL THEN NULL ELSE row_to_json(m.*) END AS metrics,
    (SELECT row_to_json(pn.*) FROM paras_notes pn WHERE pn.design_system_id = ds.id) AS paras_notes
  FROM design_systems ds
  LEFT JOIN design_system_frameworks dsf ON dsf.design_system_id = ds.id
  LEFT JOIN frameworks f ON f.id = dsf.framework_id
  LEFT JOIN design_system_tags dst ON dst.design_system_id = ds.id
  LEFT JOIN tags t ON t.id = dst.tag_id
  LEFT JOIN design_system_metrics m ON m.design_system_id = ds.id
`;

const GROUP_BY = `
  GROUP BY ds.id, m.design_system_id, m.stars, m.open_issues, m.last_commit_at,
           m.contributors_count, m.latest_release_tag, m.latest_release_at,
           m.npm_weekly_downloads, m.npm_package_size_kb, m.fetched_at
`;

router.get("/", async (req, res, next) => {
  try {
    const conditions = [];
    const params = [];

    if (req.query.framework) {
      params.push(req.query.framework);
      conditions.push(`ds.id IN (
        SELECT dsf2.design_system_id FROM design_system_frameworks dsf2
        JOIN frameworks f2 ON f2.id = dsf2.framework_id
        WHERE f2.name = $${params.length}
      )`);
    }

    if (req.query.tag) {
      params.push(req.query.tag);
      conditions.push(`ds.id IN (
        SELECT dst2.design_system_id FROM design_system_tags dst2
        JOIN tags t2 ON t2.id = dst2.tag_id
        WHERE t2.name = $${params.length}
      )`);
    }

    if (req.query.theming) {
      params.push(req.query.theming);
      conditions.push(`ds.theming = $${params.length}`);
    }

    const whereClause = conditions.length ? `AND ${conditions.join(" AND ")}` : "";

    const { rows } = await query(
      `${BASE_SELECT} WHERE 1=1 ${whereClause} ${GROUP_BY} ORDER BY ds.name`,
      params
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const { rows } = await query(
      `${DETAIL_SELECT} WHERE ds.slug = $1 ${GROUP_BY}`,
      [req.params.slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Design system not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
