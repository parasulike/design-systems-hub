"use client";

import { SiteHeader } from "./SiteHeader";
import styles from "./Hero.module.css";

export function Hero({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <>
      <SiteHeader query={query} onQueryChange={onQueryChange} />
      <header className={styles.wrapper}>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.kicker}>A field guide for product makers</p>
            <h1>Map the ideas behind the world’s design systems</h1>
            <p>
              Study visual foundations, standout components, working patterns,
              and implementation choices—without getting lost in every doc site.
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
