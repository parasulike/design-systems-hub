import Image from "next/image";
import { Boxes, Database, Gauge, Leaf, Monitor, Smartphone, type LucideIcon } from "lucide-react";
import { TECHNOLOGY_ICONS, type GenericTechnologyIcon } from "@/lib/technology-icons";

const genericIcons: Record<GenericTechnologyIcon, LucideIcon> = {
  boxes: Boxes,
  database: Database,
  gauge: Gauge,
  leaf: Leaf,
  monitor: Monitor,
  smartphone: Smartphone,
};

export function TechnologyIcon({ technology }: { technology: string }) {
  const icon = TECHNOLOGY_ICONS[technology];
  if (!icon) return <i aria-hidden="true">{technology.slice(0, 2)}</i>;
  if (typeof icon === "string") {
    const Icon = genericIcons[icon];
    return <Icon size={18} strokeWidth={1.8} aria-hidden="true" />;
  }
  if ("src" in icon) return <Image src={icon.src} alt="" width={18} height={18} />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: `#${icon.hex}` }} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
