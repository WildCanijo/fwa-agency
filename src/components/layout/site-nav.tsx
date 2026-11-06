"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrambleLinkButton } from "@/components/ui/scramble-link-button";
import { CtaButton } from "@/components/cta-button";
import { Wordmark } from "@/components/layout/wordmark";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { site } from "@/config/site";
import { paths, section, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type NavProps = {
  locale: Locale;
  t: Dictionary["nav"];
  common: Dictionary["common"];
};

export function SiteNav({ locale, t, common }: NavProps) {
  const links = t.links.map((l) => ({ label: l.label, href: section(locale, l.id) }));
  const contactHref = paths[locale].contact;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 240 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Mobile menu: lock scroll, focus the first link, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggle, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[translate,background-color,border-color] duration-500 ease-out-expo",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="label-mono sr-only bg-accent px-3 py-2 text-bg focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
      >
        {t.skip}
      </a>

      <nav
        aria-label={t.label}
        className="px-gutter mx-auto flex h-(--nav-h) max-w-[1600px] items-center justify-between"
      >
        <Wordmark href={paths[locale].home} label={common.homeLabel} studio={common.studio} onClick={() => setOpen(false)} />

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link, i) => (
            <li key={link.href} className="flex items-baseline gap-1.5">
              <span aria-hidden="true" className="label-mono text-[10px] text-muted">
                0{i + 1}
              </span>
              <ScrambleLinkButton
                href={link.href}
                btnText={link.label.toUpperCase()}
                className="label-mono text-fg"
                showLine
              />
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitch locale={locale} label={t.language} />
          <CtaButton href={contactHref} label={t.contact} variant="outline" className="h-10 px-4 text-[11px]" />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="label-mono flex h-10 items-center gap-2 text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? t.close : t.menu}</span>
          <span aria-hidden="true" className="relative block h-2.5 w-5">
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                open ? "top-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                open ? "top-1/2 -rotate-45" : "bottom-0",
              )}
            />
          </span>
        </button>
      </nav>
    </header>

      {/* Mobile menu: a sibling of the header, so the header's transform and blur don't confine it. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="px-gutter fixed inset-x-0 top-(--nav-h) bottom-0 z-40 flex flex-col justify-between overflow-y-auto border-t border-line bg-bg pt-10 pb-8 md:hidden"
      >
        <ul className="flex flex-col">
          {[...links, { label: t.contact, href: contactHref }].map((link, i) => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5 text-[clamp(2.5rem,12vw,4rem)] leading-none font-bold tracking-[-0.04em] text-fg active:text-accent"
              >
                {link.label}
                <span className="label-mono text-muted">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="label-mono mt-10 flex flex-col gap-1 text-muted">
          <LanguageSwitch locale={locale} label={t.language} variant="full" className="mb-6 text-[13px]" />
          <span className="text-fg">{common.fullName}</span>
          <a href={`mailto:${site.email}`} className="text-fg underline-offset-4 hover:underline">
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
