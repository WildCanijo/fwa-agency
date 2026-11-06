import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { paths, type Locale } from "@/i18n/config";

export function Services({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).services;
  return (
    <section id="services" aria-labelledby="services-title" className="px-gutter mx-auto max-w-[1600px] py-24 md:py-36">
      <SectionHeader index="01" label={t.label} note={t.note} />

      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2
                id="services-title"
                className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.045em] text-fg"
              >
                {t.titleA}
                <br />
                <span className="text-muted">{t.titleB}</span>
              </h2>
              <p className="mt-6 max-w-[36ch] text-[16px] leading-relaxed text-muted">
                {t.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="border-b border-line lg:col-span-8 lg:col-start-5">
          {t.items.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05}>
              <Link
                href={paths[locale].contact}
                className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 border-t border-line py-8 transition-colors duration-500 hover:bg-white/[0.02] md:gap-x-10 md:py-10"
              >
                {/* accent rule that sweeps in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-swift group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="label-mono pt-2 text-muted transition-colors group-hover:text-accent md:pt-3">
                  S/0{i + 1}
                </span>
                <span>
                  <span className="block text-[clamp(1.8rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.04em] text-fg transition-transform duration-700 ease-swift motion-safe:group-hover:translate-x-3">
                    {s.title}
                  </span>
                  <span className="mt-4 block max-w-[52ch] text-[15.5px] leading-relaxed text-muted md:text-[16.5px]">
                    {s.body}
                  </span>
                  <span className="label-mono mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-muted/80">
                    {s.tags.map((t) => (
                      <span key={t}>/ {t}</span>
                    ))}
                  </span>
                </span>
                <span className="pt-2 text-muted transition-[color,transform] duration-500 ease-swift group-hover:text-accent motion-safe:group-hover:rotate-45 md:pt-3">
                  <ArrowUpRight aria-hidden="true" className="size-6 md:size-7" strokeWidth={1.25} />
                  <span className="sr-only">
                    {t.srStart} {s.title}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
