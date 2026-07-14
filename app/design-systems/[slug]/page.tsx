import Link from "next/link";
import { notFound } from "next/navigation";
import { HealthBadge } from "@/components/HealthBadge";
import { getCatalog } from "@/lib/catalog";
import styles from "./page.module.css";

const CARBON_COMPONENTS = [
  "Accordion", "AI label", "Breadcrumb", "Button", "Checkbox",
  "Code snippet", "Contained list", "Content switcher", "Data table",
  "Date picker", "Dropdown", "File uploader", "Form", "Inline loading",
  "Link", "List", "Loading", "Menu", "Modal", "Multiselect",
  "Notification", "Number input", "Pagination", "Popover", "Progress bar",
  "Progress indicator", "Radio button", "Search", "Select", "Slider",
  "Structured list", "Tabs", "Tag", "Text input", "Tile", "Toggle",
  "Toggletip", "Tooltip",
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

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Breadcrumb">
        <Link href="/">Design Systems Hub</Link>
        <span>/</span>
        <Link href="/">Systems</Link>
        <span>/</span>
        <span>{system.name}</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.status}>
          <HealthBadge health={system.health} />
          <span>{system.live.latest_release_tag ? `Latest ${system.live.latest_release_tag}` : "Public system"}</span>
        </div>
        <h1>{system.name}</h1>
        <p>{system.description}</p>

        <dl className={styles.summary}>
          <div><dt>Company</dt><dd>{system.company}</dd></div>
          <div><dt>Type</dt><dd>Design system</dd></div>
          <div><dt>Components</dt><dd>{CARBON_COMPONENTS.length}</dd></div>
          <div><dt>License</dt><dd>{system.license}</dd></div>
        </dl>

        <div className={styles.links}>
          <a href={system.site_url} target="_blank" rel="noopener noreferrer">Website ↗</a>
          {system.github_repo && <a href={`https://github.com/${system.github_repo}`} target="_blank" rel="noopener noreferrer">Repository ↗</a>}
          {system.figma_url && <a href={system.figma_url} target="_blank" rel="noopener noreferrer">Figma ↗</a>}
          {system.storybook_url && <a href={system.storybook_url} target="_blank" rel="noopener noreferrer">Storybook ↗</a>}
        </div>
      </header>

      <section className={styles.content}>
        <aside>
          <p className={styles.label}>System details</p>
          <dl className={styles.details}>
            <div><dt>Frameworks</dt><dd>{system.frameworks.join(", ")}</dd></div>
            <div><dt>Theming</dt><dd>{system.theming}</dd></div>
            <div><dt>Tokens</dt><dd>{system.token_format ?? "—"}</dd></div>
            <div><dt>npm</dt><dd>{system.npm_package ?? "—"}</dd></div>
          </dl>
        </aside>

        <div>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.label}>Library</p>
              <h2>Components</h2>
            </div>
            <span>{CARBON_COMPONENTS.length} documented</span>
          </div>
          <ul className={styles.components}>
            {CARBON_COMPONENTS.map((component) => (
              <li key={component}>{component}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
