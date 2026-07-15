"use client";

import { useMemo, useState } from "react";
import type { DesignSystem } from "@/lib/types";
import { SystemCard } from "./SystemCard";
import { FilterBar, type Filters } from "./FilterBar";
import { Hero } from "./Hero";
import styles from "./CatalogView.module.css";

const EMPTY_FILTERS: Filters = {
  query: "",
  framework: "",
  license: "",
  theming: "",
  tag: "",
};

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}

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

  const frameworks = useMemo(
    () => uniqueSorted(systems.flatMap((s) => s.frameworks)),
    [systems],
  );
  const licenses = useMemo(() => uniqueSorted(systems.map((s) => s.license)), [systems]);
  const themings = useMemo(() => uniqueSorted(systems.map((s) => s.theming)), [systems]);
  const tags = useMemo(() => uniqueSorted(systems.flatMap((s) => s.tags)), [systems]);

  const filtered = systems.filter(
    (s) => {
      const query = filters.query.toLowerCase();
      const searchable = [
        s.name,
        s.company,
        s.description,
        s.token_format,
        s.theming,
        ...s.frameworks,
        ...s.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || searchable.includes(query)) &&
        (!filters.framework || s.frameworks.includes(filters.framework)) &&
        (!filters.license || s.license === filters.license) &&
        (!filters.theming || s.theming === filters.theming) &&
        (!filters.tag || s.tags.includes(filters.tag))
      );
    },
  );

  return (
    <>
      <Hero
        query={filters.query}
        onQueryChange={(query) => setFilters({ ...filters, query })}
      />
      <section id="catalog" className={styles.catalog}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Catalog</p>
            <h2>Design systems</h2>
          </div>
          <span>{filtered.length} systems</span>
        </div>
        <FilterBar
          frameworks={frameworks}
          licenses={licenses}
          themings={themings}
          tags={tags}
          filters={filters}
          onChange={setFilters}
        />
        {filtered.length === 0 ? (
          <p>No systems match these filters.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
