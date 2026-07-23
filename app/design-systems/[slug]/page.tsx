import Image from "next/image";
import { ArrowLeft, ArrowUpRight, BookOpen, Boxes, Braces, Briefcase, Code2, Diamond, FileCheck2, Inbox, LockKeyhole, PackageOpen, PanelsTopLeft, RefreshCw, TriangleAlert, type LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { CarbonAudienceTabs } from "@/components/CarbonAudienceTabs";
import { ButtonLink } from "@/components/Button";
import { HealthBadge } from "@/components/HealthBadge";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemAudienceTabs } from "@/components/SystemAudienceTabs";
import { coverImages } from "@/components/SystemCard";
import { getCatalog } from "@/lib/catalog";
import { BEST_FOR_OPTIONS, GUIDANCE_OPTIONS } from "@/lib/catalog-filters";
import { EDITORIAL_PROFILES } from "@/lib/editorial-profiles";
import styles from "./page.module.css";

type ResourceLink = { label: string; detail: string; href: string; icon: LucideIcon };

const guidanceLabels = new Map<string, string>(GUIDANCE_OPTIONS);
const productFitLabels = new Map<string, string>(BEST_FOR_OPTIONS);

function readableList(values: string[], labels?: Map<string, string>) {
  return values.map((value) => labels?.get(value) ?? value).join(", ") || "Not listed";
}

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
  const editorialProfile = EDITORIAL_PROFILES[system.id];
  const coverImage = coverImages[system.id];

  const resources: ResourceLink[] = [
    { label: "Documentation", detail: "Official guidance, foundations, and component documentation.", href: system.site_url, icon: BookOpen },
    system.github_repo && { label: "Source code", detail: "Repository, releases, issues, and contribution history.", href: `https://github.com/${system.github_repo}`, icon: Code2 },
    system.figma_url && { label: "Figma library", detail: "Design assets and reusable component libraries for Figma.", href: system.figma_url, icon: Boxes },
    system.sketch_url && { label: "Sketch library", detail: "Reusable design assets provided for Sketch.", href: system.sketch_url, icon: Diamond },
    system.storybook_url && { label: "Storybook", detail: "Rendered component examples and implementation states.", href: system.storybook_url, icon: PanelsTopLeft },
    system.tokens_url && { label: "Design tokens", detail: "Source values for color, type, spacing, and other foundations.", href: system.tokens_url, icon: Braces },
    system.migration_url && { label: "Migration guide", detail: "Upgrade guidance for moving between system versions.", href: system.migration_url, icon: RefreshCw },
    system.npm_package && { label: "Package", detail: `Install and inspect ${system.npm_package}.`, href: `https://www.npmjs.com/package/${system.npm_package}`, icon: PackageOpen },
  ].filter((resource): resource is ResourceLink => Boolean(resource));

  const metric = (value: number | null) =>
    value == null ? "—" : value.toLocaleString("en-US");

  return (
    <>
      <SiteHeader />
      <nav className={styles.backBar} aria-label="Back navigation">
        <div className={styles.backBarInner}>
          <ButtonLink
            href="/#catalog"
            hierarchy="tertiaryGray"
            leadingIcon={<ArrowLeft aria-hidden="true" />}
          >
            Back to catalog
          </ButtonLink>
        </div>
      </nav>
      <main>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
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
                <ButtonLink
                  href={system.site_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  leadingIcon={<BookOpen aria-hidden="true" />}
                  trailingIcon={<ArrowUpRight aria-hidden="true" />}
                >
                  Open documentation
                </ButtonLink>
                {system.github_repo && (
                  <ButtonLink
                    href={`https://github.com/${system.github_repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    hierarchy="secondaryGray"
                    leadingIcon={<Code2 aria-hidden="true" />}
                    trailingIcon={<ArrowUpRight aria-hidden="true" />}
                  >
                    View source
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
          {coverImage && <div className={styles.heroCover}>
            <Image src={coverImage} alt={`${system.name} cover`} width={690} height={388} priority unoptimized />
          </div>}
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

        {!hasEditorialProfile && <section className={styles.snapshot} aria-labelledby="snapshot-title">
          <p className={styles.eyebrow}>Atlas summary</p>
          <div className={styles.snapshotIntro}>
            <h2 id="snapshot-title">A quick read before opening the documentation.</h2>
            <p>{system.description}</p>
          </div>
          <dl className={styles.snapshotFacts}>
            <div><Briefcase className={styles.factIcon} size={24} strokeWidth={1.8} aria-hidden="true" /><dt>Best suited for</dt><dd>{readableList(system.best_for ?? [], productFitLabels)}</dd></div>
            <div><BookOpen className={styles.factIcon} size={24} strokeWidth={1.8} aria-hidden="true" /><dt>Guidance available</dt><dd>{readableList(system.guidance ?? [], guidanceLabels)}</dd></div>
            <div><Code2 className={styles.factIcon} size={24} strokeWidth={1.8} aria-hidden="true" /><dt>Technology</dt><dd>{readableList(system.frameworks)}</dd></div>
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

          {editorialProfile && <section className={styles.section} aria-labelledby="anatomy-title">
            <p className={styles.eyebrow}>Visual anatomy</p>
            <div className={styles.sectionHeading}><h2 id="anatomy-title">{editorialProfile.visual.heading}</h2></div>
            <div className={styles.anatomy}>
              <article className={styles.palette}>
                {editorialProfile.visual.palette.map((color) => <div key={color.name}><i style={{ background: color.value }} /><span>{color.name}<br /><small>{color.value}</small></span></div>)}
              </article>
              <article className={styles.typeSample}>
                <span>{editorialProfile.visual.typeface}</span><strong>Aa</strong><p>{editorialProfile.visual.typeNote}</p>
              </article>
              <article className={styles.density}>
                <span>{editorialProfile.visual.density}</span><div aria-hidden="true"><i /><i /><i /><i /></div><p>{editorialProfile.visual.densityNote}</p>
              </article>
            </div>
          </section>}

          {editorialProfile && <section className={styles.section} aria-labelledby="components-title">
            <p className={styles.eyebrow}>Standout component references</p>
            <div className={styles.sectionHeading}><h2 id="components-title">Four components that reveal how {system.name} thinks</h2></div>
            <div className={styles.referenceGrid}>
              {editorialProfile.components.map((component, index) => <a key={component.name} href={component.href} target="_blank" rel="noopener noreferrer">
                <div className={styles.cardTop}><span>0{index + 1}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                <small>{component.tag}</small><h3>{component.name}</h3><p>{component.note}</p>
              </a>)}
            </div>
          </section>}

          {editorialProfile && <section className={styles.section} aria-labelledby="patterns-title">
            <p className={styles.eyebrow}>Product patterns</p>
            <div className={styles.sectionHeading}><h2 id="patterns-title">Patterns for common product problems</h2></div>
            <div className={styles.patterns}>
              {editorialProfile.patterns.map((pattern, index) => {
                const PatternIcon = [FileCheck2, Inbox, LockKeyhole][index];
                return <a key={pattern.name} href={pattern.href} target="_blank" rel="noopener noreferrer">
                  <div className={styles.patternTop}><span>0{index + 1}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
                  <PatternIcon className={styles.patternIcon} size={24} strokeWidth={1.8} aria-hidden="true" />
                  <h3>{pattern.name}</h3><dl><div><dt>Use when</dt><dd>{pattern.useWhen}</dd></div><div><dt>Learn from {system.name}</dt><dd>{pattern.learn}</dd></div></dl>
                </a>;
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

          {editorialProfile && (
            <SystemAudienceTabs
              systemName={system.name}
              audience={editorialProfile.audience}
              metrics={{
                stars: metric(system.live.stars),
                contributors: metric(system.live.contributors_count),
                openIssues: metric(system.live.open_issues),
                weeklyDownloads: metric(system.live.npm_weekly_downloads),
              }}
            />
          )}

          {!hasEditorialProfile && <section className={styles.section} aria-labelledby="resources-title">
            <p className={styles.eyebrow}>Primary resources</p>
            <div className={styles.sectionHeading}>
              <h2 id="resources-title">Continue with reliable first-party references</h2>
            </div>
            <div className={styles.resourceLinks}>
              {resources.map((resource) => {
                const ResourceIcon = resource.icon;
                return (
                  <a key={resource.label} href={resource.href} target="_blank" rel="noopener noreferrer">
                    <div><ResourceIcon size={20} strokeWidth={1.8} aria-hidden="true" /><ArrowUpRight size={16} aria-hidden="true" /></div>
                    <h3>{resource.label}</h3>
                    <p>{resource.detail}</p>
                  </a>
                );
              })}
            </div>
          </section>}

          <section className={`${styles.section} ${styles.decisionSection}`} aria-labelledby="decision-title">
            <p className={styles.eyebrow}>Practical decision</p>
            <div className={styles.sectionHeading}>
              <h2 id="decision-title">{hasEditorialProfile ? "Should you use Carbon?" : editorialProfile ? `Should you use ${system.name}?` : `System facts for ${system.name}`}</h2>
            </div>
            {hasEditorialProfile && <div className={styles.decision}>
              <article><span>Choose it when</span><p>You are building complex operational software, need multiple supported implementations, and value deep accessibility guidance.</p></article>
              <article><span>Reconsider when</span><p>Your product is lightweight, consumer-facing, or needs a highly distinctive brand expression without substantial retheming.</p></article>
            </div>}
            {editorialProfile && <div className={styles.decision}>
              <article><span>Choose it when</span><p>{editorialProfile.decision.choose}</p></article>
              <article><span>Reconsider when</span><p>{editorialProfile.decision.reconsider}</p></article>
            </div>}

            <div className={styles.technical}>
              <h3>Technical health and system facts</h3>
              <dl>
                <div><dt>Maintenance</dt><dd>{system.health === "Unknown" ? "Not monitored" : <HealthBadge health={system.health} />}</dd></div>
                <div><dt>Frameworks</dt><dd>{readableList(system.frameworks)}</dd></div>
                <div><dt>License</dt><dd>{system.license}</dd></div>
                <div><dt>Token format</dt><dd>{system.token_format ?? "Not listed"}</dd></div>
                <div><dt>Package</dt><dd>{system.npm_package ?? "Not listed"}</dd></div>
                <div><dt>Theming</dt><dd>{system.theming === "multi-brand" ? "Multi-brand" : system.theming === "single-brand" ? "Single brand" : "Not documented"}</dd></div>
              </dl>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
