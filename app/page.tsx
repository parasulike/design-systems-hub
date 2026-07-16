import { getCatalog } from "@/lib/catalog";
import { CatalogView } from "@/components/CatalogView";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const systems = getCatalog();
  const q = (await searchParams).q;

  return (
    <main className={styles.main}>
      <CatalogView systems={systems} initialQuery={typeof q === "string" ? q : ""} />
    </main>
  );
}
