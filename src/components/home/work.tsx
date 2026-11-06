import type { ComponentType } from "react";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { BrowserFrame, PhoneFrame } from "@/components/work/device-frames";
import {
  FieldnoteDesktop,
  FieldnoteMobile,
  RidgelineDesktop,
  RidgelineMobile,
  SolaceDesktop,
  SolaceMobile,
} from "@/components/work/mock-screens";
import { cn } from "@/lib/utils";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Project = {
  name: string;
  url: string;
  Desktop: ComponentType;
  Mobile: ComponentType;
  tint: string;
};

// Concept projects. These are studio demos, not client work.
// Replace them with real case studies when they're available.
// Category, type and description for each language live in
// src/i18n/dictionaries.ts (work.projects), in the same order as this list.
const projects: Project[] = [
  {
    name: "Ridgeline Builders",
    url: "ridgeline.concept",
    Desktop: RidgelineDesktop,
    Mobile: RidgelineMobile,
    tint: "#d9a441",
  },
  {
    name: "Solace Physio",
    url: "solace.concept",
    Desktop: SolaceDesktop,
    Mobile: SolaceMobile,
    tint: "#2f5d50",
  },
  {
    name: "Fieldnote",
    url: "app.fieldnote.concept",
    Desktop: FieldnoteDesktop,
    Mobile: FieldnoteMobile,
    tint: "#7aa2ff",
  },
];

export function Work({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).work;
  return (
    <section id="work" aria-labelledby="work-title" className="px-gutter mx-auto max-w-[1600px] py-24 md:py-36">
      <SectionHeader index="02" label={t.label} note={t.note} />

      <div className="mt-12 flex flex-col justify-between gap-6 md:mt-16 md:flex-row md:items-end">
        <Reveal>
          <h2
            id="work-title"
            className="text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.05em] text-fg"
          >
            {t.title}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-muted">
            {t.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-36">
        {projects.map((p, i) => (
          <li key={p.name}>
            <ProjectRow project={p} copy={t.projects[i]} t={t} index={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}

type WorkCopy = Dictionary["work"];

function ProjectRow({
  project: p,
  copy,
  t,
  index,
}: {
  project: Project;
  copy: WorkCopy["projects"][number];
  t: WorkCopy;
  index: number;
}) {
  const flip = index % 2 === 1;
  return (
    <article aria-labelledby={`project-${index}`} className="group grid gap-10 lg:grid-cols-12 lg:gap-6">
      {/* Preview */}
      <Reveal className={cn("lg:col-span-8", flip && "lg:order-2 lg:col-start-5")}>
        <div className="relative overflow-hidden border border-line bg-bg-2 px-[6%] pt-[7%] pb-[11%]">
          {/* technical backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1.2px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -right-1/4 -bottom-1/2 h-full w-3/4 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
            style={{ background: p.tint }}
          />
          <span className="label-mono absolute top-4 left-4 z-10 text-[10px] text-muted">
            W/0{index + 1} — {copy.type}
          </span>
          <span className="label-mono absolute top-4 right-4 z-10 border border-accent/50 px-2 py-0.5 text-[10px] text-accent">
            {t.concept}
          </span>

          <div className="relative w-[86%] transition-transform duration-700 ease-swift motion-safe:group-hover:-translate-y-2">
            <BrowserFrame url={p.url}>
              <p.Desktop />
            </BrowserFrame>
          </div>

          <Parallax distance={30} className="absolute right-[5%] bottom-[6%] w-[22%] min-w-[96px]">
            <div className="transition-transform duration-700 ease-swift motion-safe:group-hover:-translate-y-4 motion-safe:group-hover:-rotate-2">
              <PhoneFrame>
                <p.Mobile />
              </PhoneFrame>
            </div>
          </Parallax>
        </div>
        <p className="sr-only">
          {t.previewAlt.replace("{name}", p.name)}
        </p>
      </Reveal>

      {/* Meta */}
      <Reveal
        delay={0.1}
        className={cn("flex flex-col lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}
      >
        <div className="label-mono flex items-center gap-3 text-muted">
          <span className="text-accent">0{index + 1}</span>
          <span className="h-px w-8 bg-line" aria-hidden="true" />
          <span>{copy.category}</span>
        </div>
        <h3
          id={`project-${index}`}
          className="mt-5 text-[clamp(2rem,3.6vw,3.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-fg"
        >
          {p.name}
        </h3>
        <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-muted">{copy.description}</p>
        <dl className="label-mono mt-8 grid grid-cols-2 gap-y-3 border-t border-line pt-5 text-[10.5px]">
          <dt className="text-muted">{t.type}</dt>
          <dd className="text-fg">{copy.type}</dd>
          <dt className="text-muted">{t.industry}</dt>
          <dd className="text-fg">{copy.category}</dd>
          <dt className="text-muted">{t.status}</dt>
          <dd className="text-fg">{t.statusValue}</dd>
        </dl>
      </Reveal>
    </article>
  );
}
