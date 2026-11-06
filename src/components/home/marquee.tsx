import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** A slow ticker of what the studio makes. Decorative, so hidden from screen readers. */
export function Marquee({ locale }: { locale: Locale }) {
  const items = getDictionary(locale).marquee;
  const row = [...items, ...items];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-bg-2 py-5 select-none">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {row.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-8 pr-8 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-fg/90 uppercase"
              >
                {item}
                <span className="text-accent">→</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
