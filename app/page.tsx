import { getCatalog } from "@/lib/catalog";
import { CatalogView } from "@/components/CatalogView";
import styles from "./page.module.css";

export default function Home() {
  const systems = getCatalog();

  return (
    <main className={styles.main}>
      <h1>Design Systems Hub</h1>
      <p className={styles.subtitle}>
        A catalog of public design systems with live maintenance health —
        not just a logo and a link.
      </p>
      <CatalogView systems={systems} />
    </main>
  );
}
