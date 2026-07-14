import styles from "./FilterBar.module.css";

export interface Filters {
  query: string;
  framework: string;
  license: string;
  theming: string;
  tag: string;
}

interface FilterBarProps {
  frameworks: string[];
  licenses: string[];
  themings: string[];
  tags: string[];
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function FilterBar({
  frameworks,
  licenses,
  themings,
  tags,
  filters,
  onChange,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <select
        value={filters.framework}
        onChange={(e) => onChange({ ...filters, framework: e.target.value })}
      >
        <option value="">All frameworks</option>
        {frameworks.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <select
        value={filters.license}
        onChange={(e) => onChange({ ...filters, license: e.target.value })}
      >
        <option value="">All licenses</option>
        {licenses.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <select
        value={filters.theming}
        onChange={(e) => onChange({ ...filters, theming: e.target.value })}
      >
        <option value="">All theming</option>
        {themings.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={filters.tag}
        onChange={(e) => onChange({ ...filters, tag: e.target.value })}
      >
        <option value="">All tags</option>
        {tags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
