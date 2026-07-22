import { Search, X } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.css";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  onClear?: () => void;
};

export function SearchInput({ onClear, value, ...props }: SearchInputProps) {
  return (
    <div className={styles.field}>
      <Search size={18} aria-hidden="true" />
      <input {...props} type="search" value={value} />
      {onClear && value && <button type="button" aria-label="Clear search" onClick={onClear}><X size={16} aria-hidden="true" /></button>}
    </div>
  );
}
