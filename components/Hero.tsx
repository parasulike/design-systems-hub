"use client";

import styles from "./Hero.module.css";

export function Hero({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.nav}>
        <span className={styles.logo}>Design Systems Hub</span>
        <div className={styles.navLinks}>
          <a href="#catalog">Catalog</a>
          <a href="#catalog" onClick={() => onQueryChange("component")}>Components</a>
          <a href="#catalog" onClick={() => onQueryChange("pattern")}>Patterns</a>
          <a
            href="https://github.com/parasulike/design-systems-hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </div>
        <input
          type="search"
          aria-label="Search design systems"
          placeholder="Search design systems"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </nav>

      <div className={styles.hero}>
        <div className={styles.copy}>
          <h1>Explore how the world’s best design systems are built</h1>
          <p>
            Explore foundations, components, patterns, documentation, and
            governance across leading design systems.
          </p>
          <a className={styles.cta} href="#catalog">
            Explore design systems
          </a>
        </div>
      </div>
    </header>
  );
}
