"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./CodeSnippet.module.css";

export function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.snippet}>
      <code>{code}</code>
      <button
        type="button"
        onClick={copyCode}
        aria-label={copied ? "Copied" : "Copy code"}
        title={copied ? "Copied" : "Copy code"}
        data-copied={copied}
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
