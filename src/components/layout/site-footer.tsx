import HalftoneWordmarkFooter, { type FooterColumn } from "@/components/ui/halftone-wordmark-footer";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { paths, section, type Locale } from "@/i18n/config";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.footer;

  const columns: FooterColumn[] = [
    {
      title: t.studio,
      links: [
        { label: t.links.services, href: section(locale, "services") },
        { label: t.links.work, href: section(locale, "work") },
        { label: t.links.approach, href: section(locale, "approach") },
        { label: t.links.about, href: section(locale, "about") },
      ],
    },
    {
      title: t.start,
      links: [
        { label: t.startProject, href: paths[locale].contact },
        { label: site.email, href: `mailto:${site.email}` },
      ],
    },
    {
      title: t.language,
      links: [
        { label: "English", href: paths.en.home },
        { label: "Español", href: paths.es.home },
      ],
    },
  ];

  return (
    <HalftoneWordmarkFooter
      wordmark="fwd"
      label={dict.common.fullName}
      meta={t.meta}
      note={t.note}
      backToTopLabel={t.backToTop}
      columns={columns}
      preset="night"
      palette={{ background: "#0b0b0b", ink: "#f3f1ec", warm: "#ff5a36" }}
      fontFamily="var(--font-grotesk)"
      fontWeight={800}
      monoFamily="var(--fwd-mono)"
      crop={0.22}
      height="clamp(500px, 56vw, 740px)"
      className="border-t border-line"
    />
  );
}
