"use client";

import { useMemo, useState } from "react";
import type { DesignSystem } from "@/lib/types";
import { SystemCard } from "./SystemCard";
import { FilterBar, type Filters } from "./FilterBar";
import styles from "./CatalogView.module.css";

const EMPTY_FILTERS: Filters = { framework: "", license: "", theming: "", tag: "" };

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}

export function CatalogView({ systems }: { systems: DesignSystem[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const frameworks = useMemo(
    () => uniqueSorted(systems.flatMap((s) => s.frameworks)),
    [systems],
  );
  const licenses = useMemo(() => uniqueSorted(systems.map((s) => s.license)), [systems]);
  const themings = useMemo(() => uniqueSorted(systems.map((s) => s.theming)), [systems]);
  const tags = useMemo(() => uniqueSorted(systems.flatMap((s) => s.tags)), [systems]);

  const filtered = systems.filter(
    (s) =>
      (!filters.framework || s.frameworks.includes(filters.framework)) &&
      (!filters.license || s.license === filters.license) &&
      (!filters.theming || s.theming === filters.theming) &&
      (!filters.tag || s.tags.includes(filters.tag)),
  );

  return (
    <div>
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
    </div>
  );
}
