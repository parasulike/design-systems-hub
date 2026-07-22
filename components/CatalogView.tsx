"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import type { DesignSystem } from "@/lib/types";
import { SystemCard } from "./SystemCard";
import { FilterBar, type Filters } from "./FilterBar";
import { Hero } from "./Hero";
import { SearchInput } from "./SearchInput";
import { matchesFilters, sortSystems, suggestSystems } from "@/lib/catalog-filters";
import styles from "./CatalogView.module.css";

const EMPTY_FILTERS: Filters = {
  query: "",
  resources: [],
  technology: [],
  guidance: [],
  bestFor: [],
  sort: "recommended",
};

function CatalogSearch({ systems, query, onChange }: { systems: DesignSystem[]; query: string; onChange: (query: string) => void }) {
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestions = suggestSystems(systems, query);

  const select = (system: DesignSystem) => {
    onChange(system.name);
    setOpen(false);
    setActiveIndex(-1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (!suggestions.length || !["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;
    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      select(suggestions[activeIndex]);
      return;
    }
    if (event.key === "Enter") return;
    event.preventDefault();
    setOpen(true);
    setActiveIndex((current) => event.key === "ArrowDown"
      ? Math.min(current + 1, suggestions.length - 1)
      : Math.max(current - 1, 0));
  };

  return (
    <div className={styles.searchWrap} onFocus={() => setOpen(true)} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <SearchInput
        role="combobox"
        aria-label="Search the design system catalog"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={open && suggestions.length > 0}
        aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
        placeholder="Search systems or companies"
        value={query}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={onKeyDown}
        onClear={() => onChange("")}
      />
      {open && suggestions.length > 0 && (
        <div id={listboxId} className={styles.suggestions} role="listbox" aria-label={query ? "Search suggestions" : "Suggested systems"}>
          <small>{query ? "Matching systems" : "Suggested systems"}</small>
          {suggestions.map((system, index) => (
            <button
              id={`${listboxId}-${index}`}
              key={system.id}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(system)}
            >
              <span>{system.name}</span>
              <small>{system.company}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
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
  const [view, setView] = useState<"grid" | "list">("grid");
  const stickySentinelRef = useRef<HTMLDivElement>(null);
  const [isControlsStuck, setIsControlsStuck] = useState(false);

  useEffect(() => {
    const sentinel = stickySentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsControlsStuck(!entry.isIntersecting && entry.boundingClientRect.top < 8);
    }, { rootMargin: "-8px 0px 0px" });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

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
        <div ref={stickySentinelRef} className={styles.stickySentinel} aria-hidden="true" />
        <div className={styles.stickyControls} data-stuck={isControlsStuck}>
          <CatalogSearch systems={systems} query={filters.query} onChange={(query) => setFilters({ ...filters, query })} />
          <FilterBar systems={systems} filters={filters} onChange={setFilters} />
        </div>
        <div className={styles.results}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <Search size={24} aria-hidden="true" />
              <h3>No systems found</h3>
              <p>Try another search or clear the filters to explore all systems.</p>
              <button type="button" onClick={() => setFilters(EMPTY_FILTERS)}>Clear search and filters</button>
            </div>
          ) : (
            <div className={view === "grid" ? styles.grid : styles.list}>
              {filtered.map((system) => (
                <SystemCard key={system.id} system={system} view={view} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
