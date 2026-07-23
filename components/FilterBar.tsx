import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import type { DesignSystem } from "@/lib/types";
import {
  BEST_FOR_OPTIONS, GUIDANCE_OPTIONS, RESOURCE_OPTIONS, systemValues,
  type CatalogFilters, type FilterGroup, type SortOption,
} from "@/lib/catalog-filters";
import styles from "./FilterBar.module.css";

export type Filters = CatalogFilters;

const SORT_OPTIONS: [SortOption, string][] = [
  ["recommended", "Recommended"], ["updated", "Recently updated"], ["name", "Name A–Z"],
  ["stars", "Most GitHub stars"], ["downloads", "Most downloaded"],
];

function FilterMenu({ label, group, options, systems, filters, onChange }: {
  label: string; group: FilterGroup; options: readonly (readonly [string, string])[];
  systems: DesignSystem[]; filters: CatalogFilters; onChange: (filters: CatalogFilters) => void;
}) {
  const selected = filters[group];
  return (
    <details name="catalog-filter" className={styles.filter}>
      <summary>{label}{selected.length > 0 && <span className={styles.count}>{selected.length}</span>}<ChevronDown size={15} aria-hidden="true" /></summary>
      <fieldset className={styles.menu}>
        <legend className={styles.srOnly}>{label}</legend>
        {options.map(([value, optionLabel]) => {
          const checked = selected.includes(value);
          const count = systems.filter((system) => systemValues(system, group).includes(value)).length;
          return (
            <label key={value} className={styles.option}>
              <input
                className={styles.srOnly}
                type="checkbox"
                name={group}
                value={value}
                checked={checked}
                disabled={count === 0}
                onChange={() => onChange({ ...filters, [group]: checked ? selected.filter((item) => item !== value) : [...selected, value] })}
              />
              <i className={styles.checkbox}>{checked && <Check size={13} aria-hidden="true" />}</i>
              <span>{optionLabel}</span><small>{count}</small>
            </label>
          );
        })}
      </fieldset>
    </details>
  );
}

export function FilterBar({ systems, filters, onChange }: { systems: DesignSystem[]; filters: CatalogFilters; onChange: (filters: CatalogFilters) => void }) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const technology = Array.from(new Set(systems.flatMap((system) => system.frameworks))).sort().map((value) => [value, value] as const);
  const activeCount = filters.resources.length + filters.technology.length + filters.guidance.length + filters.bestFor.length;
  const sortLabel = SORT_OPTIONS.find(([value]) => value === filters.sort)?.[1];

  useEffect(() => {
    const closeOpenMenus = (event: PointerEvent) => {
      toolbarRef.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((details) => {
        if (!details.contains(event.target as Node)) details.removeAttribute("open");
      });
    };
    document.addEventListener("pointerdown", closeOpenMenus);
    return () => document.removeEventListener("pointerdown", closeOpenMenus);
  }, []);

  return (
    <div ref={toolbarRef} className={styles.toolbar}>
      <div className={styles.filters}>
        <FilterMenu label="Resources" group="resources" options={RESOURCE_OPTIONS} systems={systems} filters={filters} onChange={onChange} />
        <FilterMenu label="Technology" group="technology" options={technology} systems={systems} filters={filters} onChange={onChange} />
        <FilterMenu label="Guidance" group="guidance" options={GUIDANCE_OPTIONS} systems={systems} filters={filters} onChange={onChange} />
        <FilterMenu label="Best suited for" group="bestFor" options={BEST_FOR_OPTIONS} systems={systems} filters={filters} onChange={onChange} />
        {activeCount > 0 && (
          <Button
            hierarchy="tertiaryGray"
            onClick={() => onChange({ ...filters, resources: [], technology: [], guidance: [], bestFor: [] })}
          >
            Clear all
          </Button>
        )}
      </div>
      <details name="catalog-filter" className={`${styles.filter} ${styles.sort}`}>
        <summary>{sortLabel}<ChevronDown size={15} aria-hidden="true" /></summary>
        <fieldset className={styles.menu}>
          <legend className={styles.srOnly}>Sort systems</legend>
          {SORT_OPTIONS.map(([value, label]) => (
            <label key={value} className={styles.option}>
              <input className={styles.srOnly} type="radio" name="catalog-sort" value={value} checked={filters.sort === value} onChange={() => onChange({ ...filters, sort: value })} />
              <span>{label}</span>{filters.sort === value && <Check size={15} aria-hidden="true" />}
            </label>
          ))}
        </fieldset>
      </details>
    </div>
  );
}
