import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales, paths, type PageKey } from "@/i18n/config";

const pages: { key: PageKey; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { key: "home", changeFrequency: "monthly", priority: 1 },
  { key: "contact", changeFrequency: "yearly", priority: 0.8 },
];

const abs = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ key, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: abs(paths[locale][key]),
      changeFrequency,
      priority,
      alternates: { languages: { en: abs(paths.en[key]), es: abs(paths.es[key]) } },
    })),
  );
}
