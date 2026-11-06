import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Services } from "@/components/home/services";
import { Work } from "@/components/home/work";
import { Approach } from "@/components/home/approach";
import { About } from "@/components/home/about";
import { FinalCta } from "@/components/home/final-cta";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** The full homepage, in one language. Used by / and /es. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Marquee locale={locale} />
      <Services locale={locale} />
      <Work locale={locale} />
      <Approach t={getDictionary(locale).approach} />
      <About locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
