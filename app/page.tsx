import { getCatalog } from "@/lib/catalog";
import { CatalogView } from "@/components/CatalogView";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const systems = getCatalog().slice(0, 1);
  const q = (await searchParams).q;

  return (
    <main className={styles.main}>
      <CatalogView systems={systems} initialQuery={typeof q === "string" ? q : ""} />
    </main>
  );
}
