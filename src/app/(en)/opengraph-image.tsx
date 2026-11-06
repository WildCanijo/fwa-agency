import { getDictionary } from "@/i18n/dictionaries";
import { ogSize, renderOgImage } from "@/lib/og-image";

const dict = getDictionary("en");

export const alt = dict.meta.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ label: dict.hero.meta[1], lines: dict.hero.lines });
}
