import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.PG_POOL_MAX ?? 10),
    });
  }
  return pool;
}

export async function query(text, params) {
  return getPool().query(text, params);
}
