import type { DesignSystem } from "@/lib/types";
import { HealthBadge } from "./HealthBadge";
import styles from "./SystemCard.module.css";

export function SystemCard({ system }: { system: DesignSystem }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.name}>{system.name}</h2>
        <HealthBadge health={system.health} />
      </div>
      <p className={styles.company}>{system.company}</p>
      <p className={styles.description}>{system.description}</p>

      <dl className={styles.meta}>
        <div>
          <dt>Frameworks</dt>
          <dd>{system.frameworks.join(", ")}</dd>
        </div>
        <div>
          <dt>License</dt>
          <dd>{system.license}</dd>
        </div>
        <div>
          <dt>Theming</dt>
          <dd>{system.theming}</dd>
        </div>
        {system.live.stars !== null && (
          <div>
            <dt>Stars</dt>
            <dd>{system.live.stars.toLocaleString()}</dd>
          </div>
        )}
        {system.live.npm_weekly_downloads !== null && (
          <div>
            <dt>Weekly npm downloads</dt>
            <dd>{system.live.npm_weekly_downloads.toLocaleString()}</dd>
          </div>
        )}
      </dl>

      {system.tags.length > 0 && (
        <ul className={styles.tags}>
          {system.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      <div className={styles.links}>
        <a href={system.site_url} target="_blank" rel="noopener noreferrer">
          Site
        </a>
        {system.github_repo && (
          <a
            href={`https://github.com/${system.github_repo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}
        {system.figma_url && (
          <a href={system.figma_url} target="_blank" rel="noopener noreferrer">
            Figma
          </a>
        )}
        {system.storybook_url && (
          <a href={system.storybook_url} target="_blank" rel="noopener noreferrer">
            Storybook
          </a>
        )}
      </div>
    </article>
  );
}
