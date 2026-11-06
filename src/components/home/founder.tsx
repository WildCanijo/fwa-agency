import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import portrait from "../../../public/images/andoni-romano.jpg";

type FounderCopy = Dictionary["about"]["founder"];

/** Founder card: portrait, short bio, focus areas and a few things outside work. */
export function Founder({ t }: { t: FounderCopy }) {
  return (
    <div className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-6 lg:mt-28 lg:pt-14">
      {/* Portrait */}
      <Reveal className="md:col-span-4 lg:col-span-3">
        <figure className="group relative w-[200px]">
          <div className="relative overflow-hidden border border-line">
            <Image
              src={portrait}
              alt={t.photoAlt}
              width={200}
              height={200}
              sizes="200px"
              placeholder="blur"
              className="block size-[200px] object-cover grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0"
            />
            {/* thin accent wash that fades out on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-accent mix-blend-multiply opacity-[0.12] transition-opacity duration-700 group-hover:opacity-0"
            />
          </div>
          {/* corner ticks */}
          <span aria-hidden="true" className="absolute -top-1.5 -left-1.5 size-3 border-t border-l border-accent" />
          <span aria-hidden="true" className="absolute -right-1.5 -bottom-1.5 size-3 border-r border-b border-accent" />
          <figcaption className="label-mono mt-4 flex justify-between text-[10px] text-muted">
            <span>{site.owner}</span>
            <span className="text-accent">RW/01</span>
          </figcaption>
        </figure>
      </Reveal>

      {/* Bio */}
      <Reveal delay={0.08} className="md:col-span-8 lg:col-span-5">
        <p className="label-mono text-accent">{t.eyebrow}</p>
        <h3 className="mt-4 text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[0.95] font-bold tracking-[-0.045em] text-fg">
          {site.owner}
        </h3>
        <p className="label-mono mt-3 text-fg">{t.role}</p>
        <p className="mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-muted">{t.bio}</p>
        <p className="label-mono mt-6 text-[10.5px] text-muted">{t.based}</p>
      </Reveal>

      {/* Lists */}
      <Reveal delay={0.16} className="grid grid-cols-2 gap-6 md:col-span-8 md:col-start-5 lg:col-span-3 lg:col-start-10 lg:grid-cols-1 lg:gap-10">
        <ListBlock title={t.focusTitle} items={t.focus} />
        <ListBlock title={t.offTitle} items={t.off} />
      </Reveal>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="label-mono text-muted">{title}</h4>
      <ul className="mt-3 border-t border-line">
        {items.map((item) => (
          <li key={item} className="flex items-center justify-between border-b border-line py-2.5 text-[15px] text-fg">
            {item}
            <span aria-hidden="true" className="text-accent">
              →
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
