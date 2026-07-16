"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import type { DesignSystem } from "@/lib/types";
import { SystemCard } from "./SystemCard";
import { FilterBar, type Filters } from "./FilterBar";
import { Hero } from "./Hero";
import { matchesFilters, sortSystems } from "@/lib/catalog-filters";
import styles from "./CatalogView.module.css";

const EMPTY_FILTERS: Filters = {
  query: "",
  resources: [],
  technology: [],
  guidance: [],
  bestFor: [],
  sort: "recommended",
};

export function CatalogView({
  systems,
  initialQuery = "",
}: {
  systems: DesignSystem[];
  initialQuery?: string;
}) {
  const [filters, setFilters] = useState<Filters>({
    ...EMPTY_FILTERS,
    query: initialQuery,
  });
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = sortSystems(systems.filter((system) => matchesFilters(system, filters)), filters.sort);

  return (
    <>
      <Hero
        query={filters.query}
        onQueryChange={(query) => setFilters({ ...filters, query })}
      />
      <section id="catalog" className={styles.catalog}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Explore the Atlas</p>
            <h2>Systems worth studying</h2>
          </div>
          <div className={styles.headingActions}><span>{filtered.length} systems</span><div className={styles.viewToggle} aria-label="Catalog view">
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")}><LayoutGrid size={16} /></button>
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")}><List size={16} /></button>
          </div></div>
        </div>
        <FilterBar systems={systems} filters={filters} onChange={setFilters} />
        {filtered.length === 0 ? (
          <p>No systems match these filters.</p>
        ) : (
          <div className={view === "grid" ? styles.grid : styles.list}>
            {filtered.map((system) => (
              <SystemCard key={system.id} system={system} view={view} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
