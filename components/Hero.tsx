"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SiteHeader } from "./SiteHeader";
import styles from "./Hero.module.css";

const systemLogos = [
  { name: "Carbon", src: "/carbon-logo.png" },
  { name: "Polaris", src: "/system-logos/shopify.svg" },
  { name: "Primer", src: "/system-logos/github.svg" },
  { name: "Atlassian", src: "/system-logos/atlassian.svg" },
  { name: "Material", src: "/system-logos/mui.svg" },
  { name: "Spectrum", src: "/system-logos/adobe.svg" },
  { name: "Lightning", src: "/system-logos/salesforce.svg" },
  { name: "Fluent", src: "/system-logos/microsoft.svg" },
  { name: "Ant Design", src: "/system-logos/antdesign.svg" },
  { name: "Chakra", src: "/system-logos/chakraui.svg" },
  { name: "Radix", src: "/system-logos/radixui.svg" },
  { name: "shadcn/ui", src: "/system-logos/shadcnui.svg" },
  { name: "PatternFly", src: "/system-logos/redhat.svg" },
  { name: "GOV.UK", src: "/system-logos/govuk.svg" },
];

export function Hero({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  const atlasRef = useRef<HTMLDivElement>(null);
  const [face, setFace] = useState(1);

  function moveAtlas(event: React.PointerEvent<HTMLDivElement>) {
    const atlas = atlasRef.current;
    if (!atlas) return;
    const bounds = atlas.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    atlas.style.setProperty("--tilt-x", `${-y * 7}deg`);
    atlas.style.setProperty("--tilt-y", `${x * 7}deg`);
    const angle = Math.atan2(y, x) + Math.PI;
    setFace(Math.floor(angle / (Math.PI / 3)) + 1);
  }

  function resetAtlas() {
    const atlas = atlasRef.current;
    if (!atlas) return;
    atlas.style.setProperty("--tilt-x", "0deg");
    atlas.style.setProperty("--tilt-y", "0deg");
    setFace(1);
  }

  return (
    <>
      <SiteHeader query={query} onQueryChange={onQueryChange} />
      <header className={styles.wrapper}>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Design systems, decoded</p>
            <h1>See how great products are designed</h1>
            <p>
              Explore the foundations, components, patterns, and code behind
              leading design systems—all in one practical reference.
            </p>
            <ul className={styles.outcomes}>
              <li>Compare systems</li>
              <li>Study proven patterns</li>
              <li>Start building</li>
            </ul>
          </div>
          <div ref={atlasRef} className={styles.atlas} onPointerMove={moveAtlas} onPointerLeave={resetAtlas} aria-hidden="true">
            <div className={styles.logoGrid}>
              {systemLogos.map((logo) => (
                <span className={styles.logoTile} key={logo.name} title={logo.name}>
                  <Image src={logo.src} alt="" width={54} height={54} />
                </span>
              ))}
            </div>
            <div className={`${styles.atomOrbit} ${styles.atomOrbitOne}`}><i /></div>
            <div className={`${styles.atomOrbit} ${styles.atomOrbitTwo}`}><i /></div>
            <div className={styles.orbit}>
              <span className={styles.nodeOne}><b>Foundations</b></span>
              <span className={styles.nodeTwo}><b>Components</b></span>
              <span className={styles.nodeThree}><b>Patterns</b></span>
              <span className={styles.nodeFour}><b>Tokens</b></span>
            </div>
            <div className={styles.atlasMark} data-face={face}><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </header>
    </>
  );
}
