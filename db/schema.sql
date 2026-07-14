-- Design Systems Hub — schema reference (v1)
-- One-shot creation script: psql -d design_systems_hub -f db/schema.sql
-- Source of truth for migrations is db/migrations/ (this file mirrors 001_init.sql).

CREATE TABLE design_systems (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  company         TEXT,
  description     TEXT,
  site_url        TEXT,
  github_repo     TEXT,
  figma_url       TEXT,
  storybook_url   TEXT,
  npm_package     TEXT,
  license         TEXT,
  token_format    TEXT,
  theming         TEXT CHECK (theming IN ('none','single-brand','multi-brand')),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE frameworks (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL
);

CREATE TABLE design_system_frameworks (
  design_system_id INT REFERENCES design_systems(id) ON DELETE CASCADE,
  framework_id      INT REFERENCES frameworks(id) ON DELETE CASCADE,
  PRIMARY KEY (design_system_id, framework_id)
);

CREATE TABLE tags (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL
);

CREATE TABLE design_system_tags (
  design_system_id INT REFERENCES design_systems(id) ON DELETE CASCADE,
  tag_id            INT REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (design_system_id, tag_id)
);

CREATE TABLE design_system_metrics (
  design_system_id     INT PRIMARY KEY REFERENCES design_systems(id) ON DELETE CASCADE,
  stars                 INT,
  open_issues           INT,
  last_commit_at        TIMESTAMPTZ,
  contributors_count    INT,
  latest_release_tag    TEXT,
  latest_release_at     TIMESTAMPTZ,
  npm_weekly_downloads  INT,
  npm_package_size_kb   INT,
  fetched_at            TIMESTAMPTZ
);
