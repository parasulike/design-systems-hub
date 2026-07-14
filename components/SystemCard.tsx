import Link from "next/link";
import type { DesignSystem } from "@/lib/types";
import { HealthBadge } from "./HealthBadge";
import styles from "./SystemCard.module.css";

export function SystemCard({ system }: { system: DesignSystem }) {
  return (
    <article className={styles.card}>
      <Link href={`/design-systems/${system.id}`} className={styles.profile}>
        <div className={styles.cover} aria-hidden="true">
          <span>{system.name.charAt(0)}</span>
          <small>{system.company}</small>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <p className={styles.company}>{system.company}</p>
              <h2 className={styles.name}>{system.name}</h2>
            </div>
            <HealthBadge health={system.health} />
          </div>
          <p className={styles.description}>{system.description}</p>
          <div className={styles.footer}>
            <span>{system.frameworks.slice(0, 2).join(" · ")}</span>
            <strong>View profile →</strong>
          </div>
        </div>
      </Link>
    </article>
  );
}
