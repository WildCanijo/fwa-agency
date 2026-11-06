// Central site settings. Change values here and they update everywhere.
// Page copy lives in src/i18n/dictionaries.ts.

export const site = {
  name: "Romano Web",
  fullName: "Romano Web — Independent Digital Studio",
  tagline: "We build what moves you forward.",
  description:
    "Romano Web is an independent web development and digital design studio. Thoughtful design and serious development for small and medium-sized businesses.",
  owner: "Andoni Romano",

  // The site's domain.
  // Used for canonical URLs and Open Graph images.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://romanoweb.com",

  // Public contact email shown on the site.
  email: "andoniromano108@gmail.com",
} as const;
