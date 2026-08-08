import Link from "next/link";
import { ComponentCover } from "@/components/ComponentCover";
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
  const coveredCount = components.filter((entry) => entry.coverPath).length;

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Component gallery</p>
          <h1>Components</h1>
          <p className={styles.lede}>
            A visual index of UI components across public design systems. Open any card to compare
            implementations, then jump straight to that system&apos;s component docs.
          </p>
          <p className={styles.meta}>
            {components.length} types · {totalExamples} visual references
            {coveredCount > 0 ? ` · ${coveredCount} covers uploaded` : ""}
          </p>
        </header>

        <ul className={styles.grid}>
          {components.map((component) => (
            <li key={component.slug}>
              <Link href={`/components/${component.slug}`} className={styles.card}>
                <div className={styles.coverWrap}>
                  <ComponentCover name={component.name} coverPath={component.coverPath} />
                </div>
                <div className={styles.content}>
                  <div className={styles.cardTop}>
                    <h2>{component.name}</h2>
                    <span className={styles.count}>
                      {component.examples.length}{" "}
                      {component.examples.length === 1 ? "example" : "examples"}
                    </span>
                  </div>
                  {component.aliases.length > 0 && (
                    <p className={styles.aliases}>{component.aliases.slice(0, 4).join(", ")}</p>
                  )}
                  <p className={styles.description}>{component.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
