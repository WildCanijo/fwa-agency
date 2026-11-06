"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function Approach({ t }: { t: Dictionary["approach"] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="approach" aria-labelledby="approach-title" className="border-y border-line bg-bg-2">
      <div className="px-gutter mx-auto max-w-[1600px] py-24 md:py-36">
        <SectionHeader index="03" label={t.label} note={t.note} />

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2
                  id="approach-title"
                  className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.045em] text-fg"
                >
                  {t.titleA}
                  <br />
                  <span className="text-muted">{t.titleB}</span>
                </h2>
                <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed text-muted">
                  {t.intro}
                </p>
              </Reveal>
            </div>
          </div>

          <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
            {/* track + progress */}
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-line" />
            <motion.span
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-accent"
              style={{ scaleY: reduced ? 1 : progress }}
            />

            {t.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.04} className="relative pb-16 pl-12 last:pb-0 md:pl-16">
                <span
                  aria-hidden="true"
                  className="absolute top-[0.55em] left-0 size-[15px] border border-accent bg-bg-2"
                />
                <div className="label-mono text-accent">0{i + 1} —</div>
                <h3 className="mt-3 text-[clamp(2.2rem,5vw,4.25rem)] leading-none font-semibold tracking-[-0.045em] text-fg">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[40ch] text-[16.5px] leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
