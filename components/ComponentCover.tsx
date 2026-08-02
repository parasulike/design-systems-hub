import Image from "next/image";
import styles from "./ComponentCover.module.css";

export function ComponentCover({
  name,
  coverPath,
  priority = false,
  className,
}: {
  name: string;
  coverPath: string | null;
  priority?: boolean;
  className?: string;
}) {
  const classes = [styles.cover, coverPath ? styles.hasImage : styles.placeholder, className]
    .filter(Boolean)
    .join(" ");

  if (coverPath) {
    return (
      <div className={classes}>
        <Image
          src={coverPath}
          alt=""
          width={1280}
          height={800}
          className={styles.image}
          priority={priority}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className={classes} aria-hidden="true">
      <div className={styles.stage}>
        <span className={styles.glyph}>{name.charAt(0)}</span>
        <span className={styles.label}>{name}</span>
        <span className={styles.hint}>Cover coming soon</span>
      </div>
    </div>
  );
}
