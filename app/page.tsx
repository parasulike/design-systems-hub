import { getCatalog } from "@/lib/catalog";
import { Hero } from "@/components/Hero";
import { CatalogView } from "@/components/CatalogView";
import styles from "./page.module.css";

export default function Home() {
  const systems = getCatalog();

  return (
    <>
      <Hero systems={systems} />
      <main id="catalog" className={styles.main}>
        <CatalogView systems={systems} />
      </main>
    </>
  );
}
