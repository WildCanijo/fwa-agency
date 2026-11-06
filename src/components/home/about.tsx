import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Statement } from "@/components/home/statement";
import { Founder } from "@/components/home/founder";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function About({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.about;
  return (
    <section id="about" aria-labelledby="about-title" className="px-gutter mx-auto max-w-[1600px] py-24 md:py-36">
      <SectionHeader index="04" label={t.label} note={dict.common.fullName} />
      <h2 id="about-title" className="sr-only">
        {t.srTitle}
      </h2>

      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-6">
        <div className="label-mono text-muted lg:col-span-3">
          <p>{t.side}</p>
          <p className="mt-1 text-fg">
            {t.foundedBy} {site.owner}
          </p>
        </div>
        <div className="lg:col-span-9">
          <Statement text={t.statement} highlight={t.highlight} />
        </div>
      </div>

      <Founder t={t.founder} />

      <ul className="mt-20 grid border-t border-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
        {t.principles.map((p, i) => (
          <Reveal
            as="li"
            key={p.title}
            delay={i * 0.06}
            className="border-b border-line py-8 sm:px-6 sm:odd:border-r sm:odd:pl-0 lg:border-r lg:border-b-0 lg:pl-6 lg:last:border-r-0 lg:first:pl-0"
          >
            <span className="label-mono text-accent">0{i + 1}</span>
            <h3 className="mt-4 text-[20px] leading-tight font-semibold tracking-[-0.02em] text-fg">{p.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
