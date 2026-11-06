"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/** A paragraph whose words light up one by one as it scrolls through the viewport. */
export function Statement({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-[clamp(1.9rem,4.4vw,4rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-fg"
    >
      {words.map((word, i) => {
        const clean = word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
        const accent = highlight.includes(clean);
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={accent}
            static={!!reduced}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
  static: isStatic,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  static: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={isStatic ? undefined : { opacity }} className={accent ? "text-accent" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}
