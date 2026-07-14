import { Router } from "express";
import { query } from "../db.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await query(`
      SELECT DISTINCT f.name
      FROM frameworks f
      JOIN design_system_frameworks dsf ON dsf.framework_id = f.id
      ORDER BY f.name
    `);
    res.json(rows.map((r) => r.name));
  } catch (err) {
    next(err);
  }
});

export default router;
