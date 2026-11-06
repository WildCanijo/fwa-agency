import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/config";

const t = getDictionary("es").contact;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: alternatesFor("contact", "es"),
  openGraph: {
    title: `${t.metaTitle} — FWD Studio`,
    description: t.intro,
    url: alternatesFor("contact", "es").canonical,
  },
};

export default function Page() {
  return <ContactPage locale="es" />;
}
