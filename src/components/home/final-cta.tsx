import Link from "next/link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { paths, type Locale } from "@/i18n/config";

export function FinalCta({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).finalCta;
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line">
      <div className="px-gutter mx-auto grid max-w-[1600px] gap-12 py-24 md:py-36 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-9">
          <p className="label-mono text-accent">{t.eyebrow}</p>
          <Reveal>
            <h2
              id="cta-title"
              className="mt-6 text-[clamp(3rem,10vw,10rem)] leading-[0.86] font-extrabold tracking-[-0.042em] [word-spacing:0.06em] text-fg uppercase"
            >
              {t.lines[0]}
              <br />
              {t.lines[1]}
              <span className="text-accent">?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[40ch] text-[18px] leading-relaxed text-muted md:text-[20px]">
              {t.body}
            </p>
            <p className="label-mono mt-6 text-muted">
              {t.orWrite}{" "}
              <a href={`mailto:${site.email}`} className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent">
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>

        <div className="flex lg:col-span-3 lg:justify-end">
          <Magnetic strength={0.35}>
            <Link
              href={paths[locale].contact}
              className="group relative flex size-40 items-center justify-center rounded-full bg-accent text-bg transition-colors duration-500 hover:bg-fg md:size-48"
            >
              <span className="label-mono flex flex-col items-center text-center text-[12px] font-medium">
                <span>{t.button[0]}</span>
                <span>{t.button[1]}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 text-[18px] transition-transform duration-500 ease-swift group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
