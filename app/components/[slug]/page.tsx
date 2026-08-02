import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { SiteHeader } from "@/components/SiteHeader";
import { getCatalog } from "@/lib/catalog";
import { getComponentBySlug, getComponentsIndex } from "@/lib/components-index";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getComponentsIndex().map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getComponentBySlug(slug);
  if (!component) return { title: "Component · Design Atlas" };
  return {
    title: `${component.name} · Components · Design Atlas`,
    description: component.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getComponentBySlug(slug);
  if (!component) notFound();

  const catalog = new Map(getCatalog().map((system) => [system.id, system]));

  return (
    <>
      <SiteHeader />
      <nav className={styles.backBar} aria-label="Back navigation">
        <div className={styles.backBarInner}>
          <ButtonLink
            href="/components"
            hierarchy="tertiaryGray"
            leadingIcon={<ArrowLeft aria-hidden="true" />}
          >
            All components
          </ButtonLink>
        </div>
      </nav>
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Component</p>
          <h1>{component.name}</h1>
          {component.aliases.length > 0 && (
            <p className={styles.aliases}>{component.aliases.join(", ")}</p>
          )}
          <p className={styles.lede}>{component.description}</p>
          <p className={styles.meta}>
            {component.examples.length}{" "}
            {component.examples.length === 1 ? "visual reference" : "visual references"} across design
            systems
          </p>
        </header>

        <section aria-labelledby="examples-title">
          <div className={styles.sectionHeading}>
            <h2 id="examples-title">Open the visual component</h2>
            <p>
              Each example links straight to that design system&apos;s component documentation where the
              UI is shown.
            </p>
          </div>

          <ul className={styles.examples}>
            {component.examples.map((example) => {
              const system = catalog.get(example.systemId);
              return (
                <li key={`${example.systemId}-${example.localName}`} className={styles.example}>
                  <div className={styles.exampleIdentity}>
                    {example.logoPath ? (
                      <Image
                        src={example.logoPath}
                        alt=""
                        width={40}
                        height={40}
                        className={styles.logo}
                      />
                    ) : (
                      <span className={styles.logoFallback} aria-hidden="true">
                        {example.systemName.charAt(0)}
                      </span>
                    )}
                    <div>
                      <h3>{example.systemName}</h3>
                      <p>{example.company}</p>
                    </div>
                  </div>

                  <div className={styles.exampleCopy}>
                    <small>{example.tag}</small>
                    <p>
                      <strong>{example.localName}</strong> — {example.note}
                    </p>
                  </div>

                  <div className={styles.exampleActions}>
                    <a
                      href={example.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.primaryAction}
                    >
                      View component
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                    {system && (
                      <Link href={`/design-systems/${system.id}#components`} className={styles.secondaryAction}>
                        Atlas profile
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
