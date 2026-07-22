import type { HealthLabel } from "@/lib/types";
import styles from "./HealthBadge.module.css";

const LABEL_TEXT: Record<HealthLabel, string> = {
  Active: "Active",
  Slowing: "Slowing",
  Stale: "Stale",
  Unknown: "No data available",
};

export function HealthBadge({ health }: { health: HealthLabel }) {
  return <span className={styles.badge}>{LABEL_TEXT[health]}</span>;
}
