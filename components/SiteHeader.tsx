"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import styles from "./SiteHeader.module.css";

export function SiteHeader({
  query,
  onQueryChange,
}: {
  query?: string;
  onQueryChange?: (query: string) => void;
}) {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link href="/" className={styles.logo}><span aria-hidden="true"><em><i /><i /><i /><i /><i /><i /><i /><i /><i /></em></span>Design Atlas</Link>
        <div className={styles.links}>
          <Link href="/#catalog">Catalog</Link>
          <Link href="/?q=component#catalog" onClick={() => onQueryChange?.("component")}>Components</Link>
          <Link href="/?q=pattern#catalog" onClick={() => onQueryChange?.("pattern")}>Patterns</Link>
          <a href="https://github.com/parasulike/design-systems-hub" target="_blank" rel="noopener noreferrer">About <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
        <form className={styles.search} action="/" role="search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            name="q"
            aria-label="Search design systems"
            placeholder="Search design systems"
            value={onQueryChange ? query : undefined}
            onChange={(event) => onQueryChange?.(event.target.value)}
          />
        </form>
      </nav>
    </header>
  );
}
