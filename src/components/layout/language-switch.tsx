"use client";

import { usePathname } from "next/navigation";
import { locales, pageFromPath, paths, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const names: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  es: { short: "ES", full: "Español" },
};

/**
 * EN / ES toggle. Links to the same page in the other language.
 * Plain anchors on purpose: each language has its own root layout,
 * so switching is a full page load anyway.
 */
export function LanguageSwitch({
  locale,
  label,
  className,
  variant = "short",
}: {
  locale: Locale;
  label: string;
  className?: string;
  variant?: "short" | "full";
}) {
  const page = pageFromPath(usePathname());

  return (
    <nav aria-label={label} className={cn("label-mono flex items-center gap-2 text-muted", className)}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          {l === locale ? (
            <span aria-current="true" className="text-fg">
              <span aria-hidden="true">{variant === "full" ? names[l].full : names[l].short}</span>
              <span className="sr-only">{names[l].full}</span>
            </span>
          ) : (
            <a
              href={paths[l][page]}
              hrefLang={l}
              lang={l}
              className="transition-colors duration-300 hover:text-accent"
            >
              <span aria-hidden="true">{variant === "full" ? names[l].full : names[l].short}</span>
              <span className="sr-only">{names[l].full}</span>
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
