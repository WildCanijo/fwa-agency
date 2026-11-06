// Central site settings. Change values here and they update everywhere.
// Page copy lives in src/i18n/dictionaries.ts.

export const site = {
  name: "FWD Studio",
  fullName: "FWD Studio — Independent Digital Studio",
  tagline: "We build what moves you forward.",
  description:
    "FWD Studio is an independent web development and digital design studio. Thoughtful design and serious development for small and medium-sized businesses.",
  owner: "Andoni Romano",

  // PLACEHOLDER: replace with the real domain before launch.
  // Used for canonical URLs and Open Graph images.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fwdstudio.com",

  // PLACEHOLDER: replace with the real business email.
  email: "hello@fwdstudio.com",
} as const;
