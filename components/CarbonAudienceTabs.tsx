"use client";

import { useState } from "react";
import Image from "next/image";
import { Accessibility, ArrowUpRight, BookOpen, ListChecks, Palette, RefreshCw } from "lucide-react";
import { CodeSnippet } from "./CodeSnippet";
import styles from "./CarbonAudienceTabs.module.css";

export function CarbonAudienceTabs({
  stars,
  contributors,
  openIssues,
  weeklyDownloads,
  siteUrl,
  figmaUrl,
  storybookUrl,
  githubUrl,
}: {
  stars: string;
  contributors: string;
  openIssues: string;
  weeklyDownloads: string;
  siteUrl: string;
  figmaUrl: string | null;
  storybookUrl: string | null;
  githubUrl: string | null;
}) {
  const [audience, setAudience] = useState<"design" | "developer">("design");

  return (
    <section className={styles.section} aria-labelledby="audience-title">
      <p className={styles.eyebrow}>Use Carbon</p>
      <div className={styles.heading}>
        <h2 id="audience-title">Choose your perspective</h2>
        <div className={styles.tabs} aria-label="Audience">
          <button aria-pressed={audience === "design"} onClick={() => setAudience("design")}>Design</button>
          <button aria-pressed={audience === "developer"} onClick={() => setAudience("developer")}>Developer</button>
        </div>
      </div>

      {audience === "design" ? (
        <div className={styles.panel}>
          <div>
            <h3>Design with Carbon</h3>
            <p>Use IBM Design Language foundations, Figma libraries, four core themes, design tokens, component guidance, and accessibility standards.</p>
          </div>
          <dl className={styles.facts}>
            <div><dt>Documented components</dt><dd>39</dd></div>
            <div><dt>Core themes</dt><dd>4</dd></div>
            <div><dt>Figma generation</dt><dd>v11</dd></div>
            <div><dt>Accessibility baseline</dt><dd>WCAG AA</dd></div>
          </dl>
          <div className={styles.links}>
            {figmaUrl && <a href={figmaUrl} target="_blank" rel="noopener noreferrer"><Image src="/icons/figma.svg" alt="" width={16} height={16} /> Figma kit <ArrowUpRight size={16} /></a>}
            <a href="https://carbondesignsystem.com/designing/get-started/" target="_blank" rel="noopener noreferrer"><Palette size={16} /> Design guide <ArrowUpRight size={16} /></a>
            <a href="https://carbondesignsystem.com/guidelines/accessibility/overview/" target="_blank" rel="noopener noreferrer"><Accessibility size={16} /> Accessibility guidance <ArrowUpRight size={16} /></a>
          </div>
        </div>
      ) : (
        <div className={styles.panel}>
          <div>
            <h3>Build with Carbon</h3>
            <p>React and Web Components are officially maintained. Angular, Vue, Svelte, and LWC implementations are community supported.</p>
          </div>
          <div className={styles.health}>
            <div><span>GitHub stars</span><strong>{stars}</strong></div>
            <div><span>Contributors</span><strong>{contributors}</strong></div>
            <div><span>Open issues</span><strong>{openIssues}</strong></div>
            <div><span>npm / week</span><strong>{weeklyDownloads}</strong></div>
          </div>
          <div className={styles.setup}>
            <span className={styles.label}>1 · Install React and Sass</span>
            <div className={styles.commands}>
              <div className={styles.command}><span className={styles.npm} aria-label="npm">npm</span><CodeSnippet code="npm install @carbon/react sass" /></div>
              <div className={styles.command}><span className={styles.yarn} aria-label="Yarn">Y</span><CodeSnippet code="yarn add @carbon/react sass" /></div>
              <div className={styles.command}><span className={styles.pnpm} aria-label="pnpm"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span><CodeSnippet code="pnpm add @carbon/react sass" /></div>
              <div className={styles.command}><span className={styles.bun} aria-label="Bun">bun</span><CodeSnippet code="bun add @carbon/react sass" /></div>
            </div>
            <p className={styles.note}>Homebrew manages system tools, not project packages, so it is not used for Carbon.</p>
          </div>
          <div className={styles.steps}>
            <div><span className={styles.label}>2 · Load the styles</span><CodeSnippet code="@use '@carbon/react';" /></div>
            <div><span className={styles.label}>3 · Use a component</span><CodeSnippet code="import { Button } from '@carbon/react';" /></div>
          </div>
          <dl className={styles.facts}>
            <div><dt>Current generation</dt><dd>Carbon v11</dd></div>
            <div><dt>Latest React package</dt><dd>1.111.1</dd></div>
            <div><dt>Published npm versions</dt><dd>313</dd></div>
            <div><dt>Official implementations</dt><dd>2</dd></div>
          </dl>
          <details className={styles.legacy}>
            <summary>Maintaining a Carbon v10 product?</summary>
            <p>Carbon v10 is unsupported and no longer receives updates. Use v11 for current work and follow the migration guide below when upgrading.</p>
          </details>
          <div className={styles.links}>
            <a href={siteUrl} target="_blank" rel="noopener noreferrer"><BookOpen size={16} /> Documentation <ArrowUpRight size={16} /></a>
            {storybookUrl && <a href={storybookUrl} target="_blank" rel="noopener noreferrer"><Image src="/icons/storybook.svg" alt="" width={16} height={16} /> Storybook <ArrowUpRight size={16} /></a>}
            <a href="https://carbondesignsystem.com/developing/react-tutorial/step-1/" target="_blank" rel="noopener noreferrer"><ListChecks size={16} /> Full setup guide <ArrowUpRight size={16} /></a>
            {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Image src="/icons/github.svg" alt="" width={16} height={16} /> GitHub source <ArrowUpRight size={16} /></a>}
            <a href="https://carbondesignsystem.com/migrating/guide/overview/" target="_blank" rel="noopener noreferrer"><RefreshCw size={16} /> Migration guide <ArrowUpRight size={16} /></a>
          </div>
          <small className={styles.checked}>Version information checked July 15, 2026.</small>
        </div>
      )}
    </section>
  );
}
