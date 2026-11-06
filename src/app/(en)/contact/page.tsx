import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/config";

const t = getDictionary("en").contact;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: alternatesFor("contact", "en"),
  openGraph: {
    title: `${t.metaTitle} — Romano Web`,
    description: t.intro,
    url: alternatesFor("contact", "en").canonical,
  },
};

export default function Page() {
  return <ContactPage locale="en" />;
}
