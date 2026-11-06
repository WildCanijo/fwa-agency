import type { CSSProperties } from "react";
import { ArrowDownRight } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { ScrambleLinkButton } from "@/components/ui/scramble-link-button";
import { ForwardField } from "@/components/home/forward-field";
import { getDictionary } from "@/i18n/dictionaries";
import { paths, section, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

// Sized so the longest line ("you forward. →" / "lo que te hace") fits the width.
const headlineSize: Record<Locale, string> = {
  en: "text-[clamp(3.2rem,11.3vw,11.5rem)]",
  es: "text-[clamp(2.9rem,10.2vw,10.5rem)]",
};

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;
  const last = t.lines.length - 1;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-(--nav-h)"
    >
      <ForwardField className="-z-10" />

      <div className="px-gutter mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        {/* Top meta row */}
        <div
          className="label-mono fade-late grid grid-cols-2 gap-4 border-b border-line py-4 text-muted md:grid-cols-4"
          style={{ "--d": "100ms" } as CSSProperties}
        >
          <span className="text-fg">{t.meta[0]}</span>
          <span>{t.meta[1]}</span>
          <span className="hidden md:block">{t.meta[2]}</span>
          <span className="hidden items-center justify-end gap-2 text-right md:flex">
            <span className="pulse-dot size-1.5 shrink-0 bg-accent" aria-hidden="true" />
            {t.meta[3]}
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-1 flex-col justify-center py-14 md:py-20">
          <h1
            id="hero-title"
            className={cn(
              headlineSize[locale],
              "leading-[0.86] font-extrabold tracking-[-0.042em] [word-spacing:0.06em] text-fg uppercase",
            )}
          >
            {t.lines.map((line, i) => (
              <span key={line} className="rise-line" style={{ "--i": i } as CSSProperties}>
                <span>
                  {line}
                  {i === last ? (
                    <>
                      <span className="text-accent">.</span>
                      <span aria-hidden="true" className="nudge ml-[0.08em] align-[0.04em] text-[0.62em] text-accent">
                        →
                      </span>
                    </>
                  ) : null}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom row */}
        <div
          className="fade-late grid gap-10 border-t border-line pt-6 pb-10 md:grid-cols-12 md:gap-6 md:pb-12"
          style={{ "--d": "650ms" } as CSSProperties}
        >
          <p className="max-w-[44ch] text-[17px] leading-relaxed text-muted md:col-span-5 md:text-[18px]">
            <span className="text-fg">{t.leadStrong}</span> {t.lead}
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:col-span-5 md:col-start-7">
            <CtaButton href={paths[locale].contact} label={t.primary} />
            <ScrambleLinkButton
              href={section(locale, "work")}
              btnText={t.secondary.toUpperCase()}
              className="label-mono text-[12px] text-fg"
              showLine
              showArrow
              icon={<ArrowDownRight />}
              iconClassName="text-[14px]"
            />
          </div>

          <div className="label-mono hidden items-end justify-end text-muted md:col-span-1 md:flex">
            <span>{t.scroll}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
