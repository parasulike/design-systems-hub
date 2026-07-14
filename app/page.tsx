import { getCatalog } from "@/lib/catalog";
import { CatalogView } from "@/components/CatalogView";
import styles from "./page.module.css";

export default function Home() {
  const systems = getCatalog().slice(0, 1);

  return (
    <main className={styles.main}>
      <CatalogView systems={systems} />
    </main>
  );
}
