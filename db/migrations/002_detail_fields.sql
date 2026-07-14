-- 002_detail_fields.sql — editorial content columns for the detail page

ALTER TABLE design_systems
  ADD COLUMN IF NOT EXISTS industry              TEXT,
  ADD COLUMN IF NOT EXISTS launch_year           INT,
  ADD COLUMN IF NOT EXISTS open_source           BOOLEAN,
  ADD COLUMN IF NOT EXISTS design_philosophy     TEXT,
  ADD COLUMN IF NOT EXISTS accessibility         TEXT,
  ADD COLUMN IF NOT EXISTS developer_experience  TEXT,
  ADD COLUMN IF NOT EXISTS governance            TEXT,
  ADD COLUMN IF NOT EXISTS contribution_process  TEXT;

CREATE TABLE IF NOT EXISTS paras_notes (
  design_system_id      INT PRIMARY KEY REFERENCES design_systems(id) ON DELETE CASCADE,
  strengths             TEXT,
  weaknesses            TEXT,
  best_suited_for       TEXT,
  ideas_worth_borrowing TEXT,
  lessons_learned       TEXT
);
