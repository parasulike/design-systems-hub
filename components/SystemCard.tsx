import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { DesignSystem } from "@/lib/types";
import { HealthBadge } from "./HealthBadge";
import styles from "./SystemCard.module.css";

const frameworkLogos: Record<string, string> = {
  React: "/react-logo.svg",
  Angular: "/angular-logo.svg",
};

export function SystemCard({ system }: { system: DesignSystem }) {
  return (
    <article className={styles.card}>
      <Link href={`/design-systems/${system.id}`} className={styles.profile} aria-label={`Open ${system.name}`}>
        <div className={styles.cover} aria-hidden="true">
          {system.id === "carbon" ? (
            <div className={styles.brandLockup}>
              <Image src="/ibm-logo.svg" alt="" width={64} height={25} />
              <Plus size={14} strokeWidth={1.8} />
              <Image className={styles.carbonLogo} src="/carbon-logo.png" alt="" width={44} height={44} />
            </div>
          ) : (
            <><span>{system.name.charAt(0)}</span><small>{system.company}</small></>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <p className={styles.company}>{system.company}</p>
              <h2 className={styles.name}>{system.name}</h2>
            </div>
            <HealthBadge health={system.health} />
          </div>
          <p className={styles.description}>{system.description}</p>
          <div className={styles.footer}>
            {system.frameworks.slice(0, 2).map((framework) => (
              <span className={styles.framework} key={framework}>
                {frameworkLogos[framework] && <Image src={frameworkLogos[framework]} alt="" width={16} height={16} />}
                {framework}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
