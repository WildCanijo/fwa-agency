import type { Metadata } from "next";
import { grotesk, mono } from "@/components/layout/root-shell";
import { paths } from "@/i18n/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — FWD Studio",
  description: "This page doesn't exist. / Esta página no existe.",
};

// Shown for any URL that matches no route. It renders outside both language
// layouts, so it carries its own <html> and speaks both languages.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <main className="px-gutter mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center py-24">
          <a href={paths.en.home} className="text-[22px] leading-none font-extrabold tracking-[-0.04em] text-fg">
            FWD<span className="text-accent">→</span>
          </a>
          <p className="label-mono mt-16 text-accent">(404) — Page not found / Página no encontrada</p>
          <h1 className="mt-6 text-[clamp(3rem,10vw,9rem)] leading-[0.88] font-extrabold tracking-[-0.042em] [word-spacing:0.06em] text-fg uppercase">
            Wrong turn<span className="text-accent">.</span>
          </h1>
          <p lang="es" className="mt-2 text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-[-0.03em] text-muted uppercase">
            Camino equivocado.
          </p>
          <div className="label-mono mt-12 flex flex-wrap gap-4">
            <a href={paths.en.home} className="flex h-12 items-center bg-accent px-5 text-bg transition-colors hover:bg-fg">
              Back to home →
            </a>
            <a
              href={paths.es.home}
              lang="es"
              className="flex h-12 items-center border border-line px-5 text-fg transition-colors hover:border-accent"
            >
              Volver al inicio →
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
