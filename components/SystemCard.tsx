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

export function SystemCard({ system, view = "grid" }: { system: DesignSystem; view?: "grid" | "list" }) {
  const resources = [
    system.figma_url && { name: "Figma", icon: "/icons/figma.svg", note: system.figma_url.includes("/community/") ? "Community" : "Available" },
    system.github_repo && { name: "GitHub", icon: "/icons/github.svg" },
    system.storybook_url && { name: "Storybook", icon: "/icons/storybook.svg" },
  ].filter((resource): resource is { name: string; icon: string; note?: string } => Boolean(resource));
  const href = system.listing_only ? system.site_url : `/design-systems/${system.id}`;

  return (
    <article className={styles.card} data-view={view}>
      <Link href={href} target={system.listing_only ? "_blank" : undefined} rel={system.listing_only ? "noopener noreferrer" : undefined} className={styles.profile} aria-label={`Open ${system.name}`}>
        <div className={styles.cover} aria-hidden="true">
          {system.id === "carbon" ? (
            <div className={styles.brandLockup}>
              <Image src="/ibm-logo.svg" alt="" width={64} height={25} />
              <Plus size={14} strokeWidth={1.8} />
              <Image className={styles.carbonLogo} src="/carbon-logo.png" alt="" width={44} height={44} />
            </div>
          ) : (
            system.logo_path ? <Image className={styles.systemLogo} src={system.logo_path} alt="" width={58} height={58} /> : <><span>{system.name.charAt(0)}</span><small>{system.company}</small></>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <p className={styles.company}>{system.company}</p>
              <h2 className={styles.name}>{system.name}</h2>
            </div>
            {!system.listing_only && <HealthBadge health={system.health} />}
          </div>
          <p className={styles.description}>{system.description}</p>
          <div className={styles.footer}>
            {system.frameworks.length > 0 && <div className={styles.metaGroup}>
              <small>Technology</small>
              <div className={styles.technologies} aria-label="Technologies">
                {system.frameworks.slice(0, 3).map((framework) => (
                  <span className={styles.framework} key={framework} title={framework}>
                    {frameworkLogos[framework] ? <Image src={frameworkLogos[framework]} alt="" width={18} height={18} /> : <i aria-hidden="true">{framework.slice(0, 2)}</i>}
                    <span className={styles.srOnly}>{framework}</span>
                  </span>
                ))}
              </div>
            </div>}
            {resources.length > 0 && <div className={`${styles.metaGroup} ${styles.resourceGroup}`}>
              <small>Resources</small>
              <div className={styles.resources} aria-label="Available resources">
                {resources.map((resource) => <span className={styles.resource} key={resource.name} title={`${resource.name}${resource.note ? ` · ${resource.note}` : " · Public"}`}>
                  <Image src={resource.icon} alt="" width={18} height={18} />
                  <span className={styles.srOnly}>{resource.name}{resource.note ? ` ${resource.note}` : " public"}</span>
                </span>)}
              </div>
            </div>}
          </div>
        </div>
      </Link>
    </article>
  );
}
