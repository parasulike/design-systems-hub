import { Router } from "express";
import { query } from "../db.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await query(`
      SELECT DISTINCT t.name
      FROM tags t
      JOIN design_system_tags dst ON dst.tag_id = t.id
      ORDER BY t.name
    `);
    res.json(rows.map((r) => r.name));
  } catch (err) {
    next(err);
  }
});

export default router;
