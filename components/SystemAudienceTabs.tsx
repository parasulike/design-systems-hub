"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CodeSnippet } from "./CodeSnippet";
import type { EditorialProfile } from "@/lib/editorial-profiles";
import styles from "./CarbonAudienceTabs.module.css";

type Metrics = {
  stars: string;
  contributors: string;
  openIssues: string;
  weeklyDownloads: string;
};

export function SystemAudienceTabs({ systemName, audience, metrics }: {
  systemName: string;
  audience: EditorialProfile["audience"];
  metrics: Metrics;
}) {
  const [active, setActive] = useState<"design" | "developer">("design");
  const panel = audience[active];

  return (
    <section className={styles.section} aria-labelledby="audience-title">
      <p className={styles.eyebrow}>Use {systemName}</p>
      <div className={styles.heading}>
        <h2 id="audience-title">Choose your perspective</h2>
        <div className={styles.tabs} aria-label="Audience">
          <button aria-pressed={active === "design"} onClick={() => setActive("design")}>Design</button>
          <button aria-pressed={active === "developer"} onClick={() => setActive("developer")}>Developer</button>
        </div>
      </div>
      <div className={styles.panel}>
        <div><h3>{panel.title}</h3><p>{panel.description}</p></div>
        {active === "developer" && (
          <div className={styles.health}>
            <div><span>GitHub stars</span><strong>{metrics.stars}</strong></div>
            <div><span>Contributors</span><strong>{metrics.contributors}</strong></div>
            <div><span>Open issues</span><strong>{metrics.openIssues}</strong></div>
            <div><span>npm / week</span><strong>{metrics.weeklyDownloads}</strong></div>
          </div>
        )}
        {active === "developer" && audience.developer.packageName && (
          <div className={styles.setup}>
            <span className={styles.label}>Install the package</span>
            <div className={styles.commands}>
              {[
                ["npm", `npm install ${audience.developer.packageName}`],
                ["yarn", `yarn add ${audience.developer.packageName}`],
                ["pnpm", `pnpm add ${audience.developer.packageName}`],
                ["bun", `bun add ${audience.developer.packageName}`],
              ].map(([manager, command]) => (
                <div className={styles.command} key={manager}>
                  <span className={styles.manager}>{manager}</span>
                  <CodeSnippet code={command} />
                </div>
              ))}
            </div>
          </div>
        )}
        <dl className={styles.facts}>{panel.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className={styles.links}>{panel.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div>
      </div>
    </section>
  );
}
