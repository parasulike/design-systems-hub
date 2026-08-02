import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { getComponentsIndex } from "@/lib/components-index";
import styles from "./page.module.css";

export const metadata = {
  title: "Components · Design Atlas",
  description:
    "Browse UI components across public design systems and jump straight to each system's visual documentation.",
};

export default function ComponentsPage() {
  const components = getComponentsIndex();
  const totalExamples = components.reduce((sum, entry) => sum + entry.examples.length, 0);

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Component gallery</p>
          <h1>Components</h1>
          <p className={styles.lede}>
            Browse {components.length} component types curated from public design systems. Open any
            type to compare implementations, then jump directly to the system&apos;s visual component
            docs.
          </p>
          <p className={styles.meta}>
            {components.length} types · {totalExamples} visual references
          </p>
        </header>

        <div className={styles.toolbar}>
          <span>Sort by name</span>
          <span>Example count</span>
        </div>

        <ol className={styles.list}>
          {components.map((component) => (
            <li key={component.slug}>
              <Link href={`/components/${component.slug}`} className={styles.row}>
                <div className={styles.rowCopy}>
                  <h2>{component.name}</h2>
                  {component.aliases.length > 0 && (
                    <p className={styles.aliases}>{component.aliases.slice(0, 6).join(", ")}</p>
                  )}
                  <p className={styles.description}>{component.description}</p>
                </div>
                <div className={styles.count}>
                  <strong>{component.examples.length}</strong>
                  <span>{component.examples.length === 1 ? "example" : "examples"}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
