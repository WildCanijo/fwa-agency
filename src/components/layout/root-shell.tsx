import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { GridGuides } from "@/components/layout/grid-guides";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor, type Locale } from "@/i18n/config";
import { site } from "@/config/site";

export const grotesk = Inter_Tight({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

/** Site-wide metadata for one language. */
export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(site.url),
    title: { default: t.title, template: "%s — Romano Web" },
    description: t.description,
    applicationName: site.name,
    authors: [{ name: site.owner }],
    creator: site.owner,
    alternates: alternatesFor("home", locale),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.title,
      description: t.description,
      url: alternatesFor("home", locale).canonical,
      locale: t.ogLocale,
      alternateLocale: locale === "en" ? ["es_US"] : ["en_US"],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

/** The <html> document shared by both languages: fonts, grid, nav, footer. */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);
  return (
    <html lang={locale} className={`${grotesk.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <GridGuides />
        <SiteNav locale={locale} t={dict.nav} common={dict.common} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
