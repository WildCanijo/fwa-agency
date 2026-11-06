// Central site settings. Change values here and they update everywhere.
// Page copy lives in src/i18n/dictionaries.ts.

export const site = {
  name: "Romano Web",
  fullName: "Romano Web — Independent Digital Studio",
  tagline: "We build what moves you forward.",
  description:
    "Romano Web is an independent web development and digital design studio. Thoughtful design and serious development for small and medium-sized businesses.",
  owner: "Andoni Romano",

  // The site's address, used for canonical URLs, the sitemap and share images.
  // 1. NEXT_PUBLIC_SITE_URL, if you set it.
  // 2. Otherwise Netlify's built-in URL: your custom domain once connected,
  //    or the .netlify.app address until then.
  // 3. Otherwise (e.g. local development) romanoweb.com.
  url: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://romanoweb.com").replace(/\/$/, ""),

  // Public contact email shown on the site.
  email: "andoniromano108@gmail.com",
} as const;
