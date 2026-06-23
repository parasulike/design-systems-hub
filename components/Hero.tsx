import type { DesignSystem } from "@/lib/types";
import styles from "./Hero.module.css";

function countByHealth(systems: DesignSystem[]) {
  return systems.reduce(
    (acc, s) => {
      acc[s.health] = (acc[s.health] ?? 0) + 1;
      return acc;
    },
    { Active: 0, Slowing: 0, Stale: 0, Unknown: 0 } as Record<string, number>,
  );
}

export function Hero({ systems }: { systems: DesignSystem[] }) {
  const counts = countByHealth(systems);

  return (
    <header className={styles.wrapper}>
      <nav className={styles.nav}>
        <span className={styles.logo}>Design Systems Hub</span>
        <a
          href="https://github.com/parasulike/design-systems-hub"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>

      <div className={styles.hero}>
        <div className={styles.copy}>
          <h1>Design Systems Hub</h1>
          <p>
            Live maintenance health for every public design system. Not just
            a logo and a link.
          </p>
          <a className={styles.cta} href="#catalog">
            Browse the catalog
          </a>
        </div>

        <dl className={styles.stats}>
          <div>
            <dt>Systems tracked</dt>
            <dd>{systems.length}</dd>
          </div>
          <div>
            <dt>Active</dt>
            <dd>{counts.Active}</dd>
          </div>
          <div>
            <dt>Slowing</dt>
            <dd>{counts.Slowing}</dd>
          </div>
          <div>
            <dt>Stale</dt>
            <dd>{counts.Stale}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
