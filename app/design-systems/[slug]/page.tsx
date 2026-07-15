import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, BookOpen, Briefcase, Code2, FileCheck2, Inbox, LockKeyhole, Plus, TriangleAlert } from "lucide-react";
import { notFound } from "next/navigation";
import { CarbonAudienceTabs } from "@/components/CarbonAudienceTabs";
import { HealthBadge } from "@/components/HealthBadge";
import { SiteHeader } from "@/components/SiteHeader";
import { getCatalog } from "@/lib/catalog";
import styles from "./page.module.css";

const COMPONENTS = [
  {
    name: "Data table",
    note: "A strong reference for sorting, selection, expansion, batch actions, and dense enterprise data.",
    href: "https://carbondesignsystem.com/components/data-table/usage/",
    tag: "Dense data",
  },
  {
    name: "Notification",
    note: "Clear severity, placement, and dismissal guidance across inline and toast feedback.",
    href: "https://carbondesignsystem.com/components/notification/usage/",
    tag: "Feedback",
  },
  {
    name: "Date picker",
    note: "Worth studying for input states, range selection, formatting, and validation behavior.",
    href: "https://carbondesignsystem.com/components/date-picker/usage/",
    tag: "Input",
  },
  {
    name: "Tile",
    note: "A flexible surface with clickable, selectable, expandable, and contained variants.",
    href: "https://carbondesignsystem.com/components/tile/usage/",
    tag: "Composition",
  },
];

const PATTERNS = [
  {
    name: "Forms and validation",
    useWhen: "A workflow collects several related inputs or can fail validation.",
    learn: "How to group fields, place errors beside the problem, and help people recover.",
    icon: FileCheck2,
    href: "https://carbondesignsystem.com/patterns/forms-pattern/",
  },
  {
    name: "Empty states",
    useWhen: "A view has no data because of first use, filters, permissions, or an error.",
    learn: "How to explain why it is empty and give people a useful next action.",
    icon: Inbox,
    href: "https://carbondesignsystem.com/patterns/empty-states-pattern/",
  },
  {
    name: "Read-only states",
    useWhen: "People need to review information but are not allowed to edit it.",
    learn: "How to distinguish readable information from controls that are temporarily disabled.",
    icon: LockKeyhole,
    href: "https://carbondesignsystem.com/patterns/read-only-states-pattern/",
  },
];

export function generateStaticParams() {
  return getCatalog().map((system) => ({ slug: system.id }));
}

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = getCatalog().find((item) => item.id === slug);
  if (!system) notFound();
  const hasEditorialProfile = system.id === "carbon";

  const metric = (value: number | null) =>
    value == null ? "—" : value.toLocaleString("en-US");

  return (
    <>
      <SiteHeader />
      <main>
        <div className={styles.backWrap}>
          <Link href="/#catalog" className={styles.back}>
            <ArrowLeft size={14} aria-hidden="true" /> Back to catalog
          </Link>
        </div>

        <header className={styles.hero}>
          <div className={styles.brandRow}>
            {hasEditorialProfile ? (
              <>
                <Image src="/ibm-logo.svg" alt="IBM" width={72} height={28} />
                <Plus className={styles.brandJoin} size={16} strokeWidth={1.8} aria-hidden="true" />
                <Image className={styles.carbonLogo} src="/carbon-logo.png" alt="Carbon Design System" width={48} height={48} />
              </>
            ) : (
              <>
                <span className={styles.brandPlaceholder} aria-label={system.company}>{system.company.charAt(0)}</span>
                <Plus className={styles.brandJoin} size={16} strokeWidth={1.8} aria-hidden="true" />
                <span className={styles.systemWordmark}>{system.name}</span>
              </>
            )}
          </div>

          <h1>{system.name}</h1>

          <div className={styles.heroDetails}>
            <div>
              <p className={styles.eyebrow}>{system.company} · Design system</p>
              <p className={styles.intro}>
                {hasEditorialProfile
                  ? "A mature system for complex, data-heavy products where accessibility and design-to-code consistency matter."
                  : system.description}
              </p>
            </div>
            <div className={styles.actions}>
              <a href={system.site_url} target="_blank" rel="noopener noreferrer" className={styles.primary}>
                <BookOpen size={16} aria-hidden="true" /> Open documentation <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {system.github_repo && (
                <a href={`https://github.com/${system.github_repo}`} target="_blank" rel="noopener noreferrer">
                  <Code2 size={16} aria-hidden="true" /> View source <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </header>

        {hasEditorialProfile && <section className={styles.snapshot} aria-labelledby="snapshot-title">
          <p className={styles.eyebrow}>Design Atlas perspective</p>
          <div className={styles.snapshotIntro}>
            <h2 id="snapshot-title">The useful parts, before the documentation rabbit hole.</h2>
            <div className={styles.perspectives}>
              <div>
                <span>Designer lens</span>
                <p>Carbon is strongest when it explains behavior across states, not only appearance. Study its tables, forms, and accessibility guidance—but avoid copying its visual language unchanged.</p>
              </div>
              <div>
                <span>Developer lens</span>
                <p>The React package and documentation are unusually complete, but the system is large. Adopt only the foundations and components your product needs, and plan migrations early.</p>
              </div>
            </div>
          </div>
          <dl className={styles.snapshotFacts}>
            <div><Briefcase className={styles.factIcon} size={24} strokeWidth={1.8} aria-hidden="true" /><dt>Best for</dt><dd>Enterprise tools and dense workflows</dd></div>
            <div><BookOpen className={styles.factIcon} size={24} strokeWidth={1.8} aria-hidden="true" /><dt>Study this</dt><dd>Data tables, states, forms, accessibility</dd></div>
            <div><TriangleAlert className={styles.factIcon} size={24} strokeWidth={1.8} aria-hidden="true" /><dt>Watch out</dt><dd>Strong IBM character and a large API surface</dd></div>
          </dl>
        </section>}

        <div className={styles.content}>
          {hasEditorialProfile && <section className={styles.section} aria-labelledby="anatomy-title">
            <p className={styles.eyebrow}>Visual anatomy</p>
            <div className={styles.sectionHeading}>
              <h2 id="anatomy-title">A restrained language built for clarity</h2>
            </div>
            <div className={styles.anatomy}>
              <article className={styles.palette}>
                <div><i style={{ background: "#0f62fe" }} /><span>Blue 60<br /><small>#0F62FE</small></span></div>
                <div><i style={{ background: "#161616" }} /><span>Gray 100<br /><small>#161616</small></span></div>
                <div><i style={{ background: "#f4f4f4" }} /><span>Gray 10<br /><small>#F4F4F4</small></span></div>
                <div><i style={{ background: "#da1e28" }} /><span>Support red<br /><small>#DA1E28</small></span></div>
              </article>
              <article className={styles.typeSample}>
                <span>IBM Plex Sans</span>
                <strong>Aa</strong>
                <p>Information should feel structured, direct, and readable.</p>
              </article>
              <article className={styles.density}>
                <span>Compact by design</span>
                <div aria-hidden="true"><i /><i /><i /><i /></div>
                <p>Predictable rows and spacing support information-heavy screens.</p>
              </article>
            </div>
          </section>}

          {hasEditorialProfile && <section className={styles.section} aria-labelledby="components-title">
            <p className={styles.eyebrow}>Standout component references</p>
            <div className={styles.sectionHeading}>
              <h2 id="components-title">Four components that reveal how Carbon thinks</h2>
            </div>
            <div className={styles.referenceGrid}>
              {COMPONENTS.map((component, index) => (
                <a key={component.name} href={component.href} target="_blank" rel="noopener noreferrer">
                  <div className={styles.cardTop}><span>0{index + 1}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                  <small>{component.tag}</small>
                  <h3>{component.name}</h3>
                  <p>{component.note}</p>
                </a>
              ))}
            </div>
          </section>}

          {hasEditorialProfile && <section className={styles.section} aria-labelledby="patterns-title">
            <p className={styles.eyebrow}>Product patterns</p>
            <div className={styles.sectionHeading}>
              <h2 id="patterns-title">Patterns for common product problems</h2>
            </div>
            <div className={styles.patterns}>
              {PATTERNS.map((pattern, index) => {
                const PatternIcon = pattern.icon;
                return (
                  <a key={pattern.name} href={pattern.href} target="_blank" rel="noopener noreferrer">
                    <div className={styles.patternTop}><span>0{index + 1}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
                    <PatternIcon className={styles.patternIcon} size={24} strokeWidth={1.8} aria-hidden="true" />
                    <h3>{pattern.name}</h3>
                    <dl>
                      <div><dt>Use when</dt><dd>{pattern.useWhen}</dd></div>
                      <div><dt>Learn from Carbon</dt><dd>{pattern.learn}</dd></div>
                    </dl>
                  </a>
                );
              })}
            </div>
          </section>}

          {system.id === "carbon" && (
            <CarbonAudienceTabs
              stars={metric(system.live.stars)}
              contributors={metric(system.live.contributors_count)}
              openIssues={metric(system.live.open_issues)}
              weeklyDownloads={metric(system.live.npm_weekly_downloads)}
              siteUrl={system.site_url}
              figmaUrl={system.figma_url}
              storybookUrl={system.storybook_url}
              githubUrl={system.github_repo ? `https://github.com/${system.github_repo}` : null}
            />
          )}

          <section className={`${styles.section} ${styles.decisionSection}`} aria-labelledby="decision-title">
            <p className={styles.eyebrow}>Practical decision</p>
            <div className={styles.sectionHeading}>
              <h2 id="decision-title">{hasEditorialProfile ? "Should you use Carbon?" : `System facts for ${system.name}`}</h2>
            </div>
            {hasEditorialProfile && <div className={styles.decision}>
              <article><span>Choose it when</span><p>You are building complex operational software, need multiple supported implementations, and value deep accessibility guidance.</p></article>
              <article><span>Reconsider when</span><p>Your product is lightweight, consumer-facing, or needs a highly distinctive brand expression without substantial retheming.</p></article>
            </div>}

            <div className={styles.technical}>
              <h3>Technical health and system facts</h3>
              <dl>
                <div><dt>Maintenance</dt><dd><HealthBadge health={system.health} /></dd></div>
                <div><dt>Components</dt><dd>39 documented</dd></div>
                <div><dt>Frameworks</dt><dd>{system.frameworks.join(", ")}</dd></div>
                <div><dt>License</dt><dd>{system.license}</dd></div>
                <div><dt>Token format</dt><dd>{system.token_format ?? "—"}</dd></div>
                <div><dt>Package</dt><dd>{system.npm_package ?? "—"}</dd></div>
              </dl>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
