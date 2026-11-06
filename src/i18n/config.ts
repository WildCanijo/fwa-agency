export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

/** URL paths for each page, per language. */
export const paths = {
  en: { home: "/", contact: "/contact" },
  es: { home: "/es", contact: "/es/contacto" },
} as const satisfies Record<Locale, { home: string; contact: string }>;

export type PageKey = keyof (typeof paths)["en"];

/** Link to a section on the homepage, e.g. section("es", "work") → "/es#work". */
export function section(locale: Locale, id: string) {
  const home: string = paths[locale].home;
  return home === "/" ? `/#${id}` : `${home}#${id}`;
}

/** Finds which page a pathname is, so the language switch can link to its twin. */
export function pageFromPath(pathname: string): PageKey {
  for (const locale of locales) {
    if (pathname === paths[locale].contact) return "contact";
  }
  return "home";
}

/** hreflang alternates for page metadata. */
export function alternatesFor(page: PageKey, locale: Locale) {
  return {
    canonical: paths[locale][page],
    languages: {
      en: paths.en[page],
      es: paths.es[page],
      "x-default": paths.en[page],
    },
  };
}
