import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ForwardField } from "@/components/home/forward-field";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { site } from "@/config/site";

/** The contact page, in one language. Used by /contact and /es/contacto. */
export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.contact;
  const last = t.lines.length - 1;

  return (
    <>
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden pt-(--nav-h)">
        <ForwardField className="-z-10 opacity-70" />
        <div className="px-gutter mx-auto max-w-[1600px]">
          <div className="label-mono grid grid-cols-2 gap-4 border-b border-line py-4 text-muted md:grid-cols-4">
            <span className="text-fg">{t.top[0]}</span>
            <span>{t.top[1]}</span>
          </div>

          <div className="py-16 md:py-24">
            <h1
              id="contact-title"
              className="text-[clamp(3.2rem,10.5vw,11rem)] leading-[0.86] font-extrabold tracking-[-0.042em] [word-spacing:0.06em] text-fg uppercase"
            >
              {t.lines.map((line, i) => (
                <span key={line} className="rise-line" style={{ "--i": i } as CSSProperties}>
                  <span>
                    {line}
                    {i === last ? <span className="text-accent">.</span> : null}
                  </span>
                </span>
              ))}
            </h1>
            <p
              className="fade-late mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted md:text-[20px]"
              style={{ "--d": "500ms" } as CSSProperties}
            >
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      <section aria-label={t.formLabel} className="px-gutter mx-auto max-w-[1600px] pb-24 md:pb-36">
        <div className="grid gap-16 border-t border-line pt-12 lg:grid-cols-12 lg:gap-6 lg:pt-16">
          <div className="lg:col-span-7">
            <ContactForm locale={locale} t={dict.form} />
          </div>

          <aside className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            <div>
              <h2 className="label-mono text-muted">{t.direct}</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.03em] break-all text-fg underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent"
              >
                {site.email}
              </a>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.directNote}</p>
            </div>

            <div>
              <h2 className="label-mono text-muted">{t.nextTitle}</h2>
              <ol className="mt-5 border-t border-line">
                {t.nextSteps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-5">
                    <span className="label-mono pt-0.5 text-accent">0{i + 1}</span>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-fg">{s.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
