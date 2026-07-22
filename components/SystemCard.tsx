import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { DesignSystem } from "@/lib/types";
import { HealthBadge } from "./HealthBadge";
import { TechnologyIcon } from "./TechnologyIcon";
import styles from "./SystemCard.module.css";

const coverImages: Record<string, string> = {
  "aalto-university": "/system-cover-image/aalto-design-system.png",
  "adobe-spectrum": "/system-cover-image/spectrum-system.png",
  "adjust-atlas": "/system-cover-image/adjust-atlas-system.png",
  "alibaba-ant-design": "/system-cover-image/alibaba-ant-system.png?v=202607220027",
  "alaska-airlines": "/system-cover-image/alaska-system.png",
  "amplify-ui": "/system-cover-image/amplify-system.png",
  "apple-developer-design-guidelines": "/system-cover-image/apple-system.png",
  "aragon-ui": "/system-cover-image/aragon-system.png",
  "artsy-palette": "/system-cover-image/Artsy-Palette-system.png",
  "astro-uxds": "/system-cover-image/astro-system.png",
  "atlassian-design-system": "/system-cover-image/atlassian-system.png",
  "at-uikit": "/system-cover-image/AT-UI-system.png",
  "aurora-government-of-canada": "/system-cover-image/aurora-system.png",
  "aws-cloudscape-design-system": "/system-cover-image/cloudscape-system.png",
  "autoguru-overdrive": "/system-cover-image/overdrive-autoguru-system.png",
  "backpack-skyscanner": "/system-cover-image/backpack-system.png",
  "bento-ds": "/system-cover-image/bento-ds-system.png",
  blueprint: "/system-cover-image/blueprint-system.png",
  "bold-bridge-design-system": "/system-cover-image/bold-system.png",
  "bolt-design-system": "/system-cover-image/bolt-system.png",
  "brand-estonia": "/system-cover-image/estonia-system.png",
  "braid-design-system": "/system-cover-image/braid-system.png",
  "bbc-gel-global-experience-language": "/system-cover-image/gel-system.png",
  "british-gas-nucleus": "/system-cover-image/Nucleus-system.png",
  "buzzvil-design-system": "/system-cover-image/buzzvil-system.png",
  carbon: "/system-cover-image/carbon-system.png",
  cedar: "/system-cover-image/cedar-system.png",
  "chakra-ui": "/system-cover-image/chakraui-system.png",
  "city-of-boston-fleet": "/system-cover-image/fleet-system.png",
  cloudflare: "/system-cover-image/cloudfare-system.png",
  "co-op-experience-library": "/system-cover-image/coop-system.png",
  "contentful-forma-36": "/system-cover-image/forma-36-system.png",
  "decentraland-ui": "/system-cover-image/decentraland-system.png",
  duet: "/system-cover-image/duet-system.png",
  duolingo: "/system-cover-image/duolingo-system.png",
  "elastic-ui-framework": "/system-cover-image/elastic-system.png",
  "engie-fluid-design-system": "/system-cover-image/fluid-system.png",
  enel: "/system-cover-image/enelx-system.png",
  "enigma-boundless": "/system-cover-image/enigma-system.png",
  evergreen: "/system-cover-image/evergreen-system.png",
  "ebay-evo": "/system-cover-image/evo-system.png",
  "fluent-ui": "/system-cover-image/Fluent-ui-system.png",
  "firefox-photon-design-system": "/system-cover-image/Acorn-system.png",
  "flowbite-design-system": "/system-cover-image/flowbite-system.png",
  foundation: "/system-cover-image/foundation-system.png",
  "french-government-design-system": "/system-cover-image/french-goverment-system.png",
  "futurelearn-pattern-library": "/system-cover-image/futurelearn-system.png",
  "github-primer": "/system-cover-image/primer-system.png",
  "goodbarber-design-system": "/system-cover-image/goodbarber-system.png",
  "google-material-design": "/system-cover-image/Material-design.png",
  "gov-uk-design-system": "/system-cover-image/gov-uk-system.png",
  "gympass-yoga": "/system-cover-image/gympass-system.png",
  "gitlab-design-system-pajamas": "/system-cover-image/pajams-system.png",
  "hashicorp-helios": "/system-cover-image/helios-system.png",
  "heroku-purple3": "/system-cover-image/heroku-system.png",
  "hpe-design-system": "/system-cover-image/hpe-system.png",
  "hubspot-canvas": "/system-cover-image/canvas-hubshot-system.png",
  "hudl-design-system": "/system-cover-image/hudl-system.png",
  "intuit-harmony": "/system-cover-image/quickbooks-system.png",
  "italia-design-system": "/system-cover-image/italia-design-system.png",
  "jb-design-system": "/system-cover-image/jb-system.png",
  jobber: "/system-cover-image/atlantis-system.png",
  "just-eat-takeaway-com-pie-design-system": "/system-cover-image/pie-system.png",
  kaizen: "/system-cover-image/kaizen-system.png",
  kolibri: "/system-cover-image/KoliBri-system.png",
  kontur: "/system-cover-image/kontur-ru-system.png",
  "korea-design-system": "/system-cover-image/korean-design-system.png",
  lexicon: "/system-cover-image/lexicon-system.png",
  "louder-than-ten-manual": "/system-cover-image/louder-then-10-system.png",
  "mail-ru-group-paradigm": "/system-cover-image/mail.ru-system.png",
  mantine: "/system-cover-image/mantine-system.png",
  "marvel-styleguide": "/system-cover-image/marvel-design-system.png",
  materializecss: "/system-cover-image/Materializecss-system.png",
  "material-minimal": "/system-cover-image/material-minimal-system.png",
  "mesh-design-system": "/system-cover-image/mesh-system.png",
  "mixpanel-design-system": "/system-cover-image/mixpanel-system.png",
  "monzo-tone-of-voice": "/system-cover-image/monzo-design-system.png",
  "mongodb-design-system": "/system-cover-image/mongodb-system.png",
  "morningstar-design-system": "/system-cover-image/morning-system.png",
  "nationbuilder-radius": "/system-cover-image/radius-nationbuilder-system.png",
  "new-york-state-design-system": "/system-cover-image/newyork-state-system.png",
  "nhs-uk-service-manual": "/system-cover-image/nhs-system.png",
  nordhealth: "/system-cover-image/nordhealth-system.png",
  "ontario-design-system": "/system-cover-image/ontario-system.png",
  "oracle-redwood": "/system-cover-image/redwood-system.png",
  "persona-design-system": "/system-cover-image/Persona-Identities-systems.png",
  "privy-persona-design-system": "/system-cover-image/persona-design-system.png",
  "pharos-jstor-s-design-system": "/system-cover-image/Pharos-system.png",
  "pinterest-gestalt": "/system-cover-image/gestalt-system.png",
  "pluralsight-design-system": "/system-cover-image/pando-system.png",
  "porsche-design-system": "/system-cover-image/Porsche-system.png",
  "priceline-design-system": "/system-cover-image/priceline-system.png",
  radix: "/system-cover-image/Radix-system.png",
  ratio: "/system-cover-image/rambler-ratio-system.png",
  "ray-by-wework": "/system-cover-image/ray-wework-system.png",
  reshaped: "/system-cover-image/reshaped-system.png",
  "salesforce-lightning-design-system": "/system-cover-image/salesforce-lightning-system.png",
  "sage-by-kajabi": "/system-cover-image/sage-system.png",
  "samsung-design-system": "/system-cover-image/samsung-system.png",
  "sap-fiori": "/system-cover-image/fioir-system.png",
  "sap-openui": "/system-cover-image/openui-system.png",
  "scania-digital-design-system": "/system-cover-image/scania-system.png",
  seeds: "/system-cover-image/seeds-system.png",
  "semi-design": "/system-cover-image/semi-design-system.png",
  "semrush-intergalactic-design-system": "/system-cover-image/Intergalactic-system.png",
  "shopify-polaris": "/system-cover-image/shopify-polaris.png",
  "shadcn-ui": "/system-cover-image/Shadcn-ui-system.png",
  shoelace: "/system-cover-image/shoelace-system.png",
  "siemens-ix": "/system-cover-image/iX-system.png",
  "singapore-government-design-system": "/system-cover-image/singapore-state-system.png",
  "stacks-stack-overflow": "/system-cover-image/stacks-system.png",
  "strapi-design-system": "/system-cover-image/strapi-system.png",
  "telef-nica-m-stica": "/system-cover-image/Mistica-system.png",
  "teambition-clarity-design": "/system-cover-image/clarity-design-teambition-system.png",
  thumbprint: "/system-cover-image/thumbprint-system.png",
  "twilio-paste": "/system-cover-image/paste-system.png",
  "uber-s-base-web": "/system-cover-image/base-system.png",
  "ubuntu-vanilla-framework": "/system-cover-image/Canonical-system.png",
  "u-s-web-design-standards": "/system-cover-image/u-s-web-system.png",
  "u-s-cms-gov-design-system": "/system-cover-image/us-cms-system.png",
  "untitled-ui": "/system-cover-image/untitledui-system.png",
  uiverse: "/system-cover-image/uiverse-system.png",
  vibe: "/system-cover-image/vibe-system.png",
  "vtex-styleguide": "/system-cover-image/VTEX-Styleguid-system.png",
  "vue-design-system": "/system-cover-image/vue-system.png",
  "vmware-clarity-design-system": "/system-cover-image/Clarity-system.png",
  vercel: "/system-cover-image/geist-system.png",
  "decathlon-design-system-vitamin": "/system-cover-image/vitamin-system.png",
  "welcome-ui": "/system-cover-image/welcome-u-i-system.png",
  "wmca-design-system": "/system-cover-image/wmca-systems.png",
  "jetbrains-ring-ui": "/system-cover-image/ringui-system.png",
  "mozilla-protocol": "/system-cover-image/protocol-system.png",
  "workday-canvas": "/system-cover-image/canvas-system.png",
  "yelp-styleguide": "/system-cover-image/yelp-system.png",
  "zendesk-garden": "/system-cover-image/garden-system.png",
};

export function SystemCard({ system, view = "grid" }: { system: DesignSystem; view?: "grid" | "list" }) {
  const resources = [
    system.figma_url && { name: "Figma", icon: "/icons/figma.svg", note: system.figma_url.includes("/community/") ? "Community" : "Available" },
    system.github_repo && { name: "GitHub", icon: "/icons/github.svg" },
    system.storybook_url && { name: "Storybook", icon: "/icons/storybook.svg" },
  ].filter((resource): resource is { name: string; icon: string; note?: string } => Boolean(resource));
  const href = system.listing_only ? system.site_url : `/design-systems/${system.id}`;
  const coverImage = coverImages[system.id];

  return (
    <article className={styles.card} data-view={view}>
      <Link href={href} target={system.listing_only ? "_blank" : undefined} rel={system.listing_only ? "noopener noreferrer" : undefined} className={styles.profile} aria-label={`Open ${system.name}`}>
        <div className={`${styles.cover} ${coverImage ? styles.imageCover : ""}`} aria-hidden="true">
          {coverImage ? (
            <Image className={styles.coverImage} src={coverImage} alt="" width={690} height={388} unoptimized />
          ) : system.id === "carbon" ? (
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
                    <TechnologyIcon technology={framework} />
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
