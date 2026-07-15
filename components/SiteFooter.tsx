import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <div aria-hidden="true" className={styles.mark}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>
            <Link className={styles.brand} href="/">
              Design Atlas
            </Link>
            <p className={styles.statement}>
              Map the system. Understand the choices. Use what works.
            </p>
            <p className={styles.description}>
              A practical reference—not another directory of links.
            </p>
          </div>
        </div>

        <nav aria-label="Footer navigation" className={styles.links}>
          <Link href="/#catalog">Catalog</Link>
          <a
            href="https://github.com/parasulike/design-systems-hub"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.8} />
          </a>
        </nav>
      </div>
    </footer>
  );
}
