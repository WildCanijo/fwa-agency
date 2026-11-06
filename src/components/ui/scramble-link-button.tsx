"use client";

// Scramble Link Button — from 21st.dev (@hyperiux/scramble-link-button).
// Built using Hyperiux Vault: https://vault.hyperiux.com
//
// Changes for Romano Web:
// - Renders next/link, so internal routes don't do a full page reload.
// - No viewport-based font size; size it with className like any text.
// - Screen readers get the label once (the scrambling layer is aria-hidden).
// - The tap highlight on touch screens clears itself after the scramble.
// - `icon` takes an element, not a component, so server components can pass it.
// - Uppercase glyph set to match the uppercase mono labels.

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties, type MouseEventHandler, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DEFAULT_BTN_TEXT = "Hover me";
const DEFAULT_HREF = "#";
const DEFAULT_HOVER_COLOR = "#ff5a36";
const DEFAULT_SCRAMBLE_DURATION = 500;
const DEFAULT_STEP_MS = 30;
const DEFAULT_REVEAL_STAGGER = 1;
const COMPACT_LAYOUT_BREAKPOINT = 1025;
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#_";

interface GetScrambledTextOptions {
  finalText: string;
  iteration: number;
  maxIterations: number;
  revealStagger: number;
}

function getScrambledText({
  finalText,
  iteration,
  maxIterations,
  revealStagger,
}: GetScrambledTextOptions): string {
  let output = "";

  for (let index = 0; index < finalText.length; index += 1) {
    const char = finalText[index];

    if (char === " ") {
      output += char;
      continue;
    }

    const revealThreshold =
      (((index + 1) / finalText.length) * maxIterations) / revealStagger;

    if (iteration >= revealThreshold) {
      output += char;
      continue;
    }

    output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }

  return output;
}

export interface ScrambleLinkButtonOwnProps {
  btnText?: string;
  href?: string;
  className?: string;
  textClassName?: string;
  hoverColor?: string;
  showLine?: boolean;
  lineClassName?: string;
  showArrow?: boolean;
  /** A rendered icon element (e.g. <ArrowUpRight />). Elements, unlike components, can be passed from server components. */
  icon?: ReactNode;
  iconClassName?: string;
  scrambleDuration?: number;
  stepMs?: number;
  revealStagger?: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type ScrambleLinkButtonProps = ScrambleLinkButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick" | keyof ScrambleLinkButtonOwnProps>;

export function ScrambleLinkButton({
  btnText = DEFAULT_BTN_TEXT,
  href = DEFAULT_HREF,
  className = "",
  textClassName = "",
  hoverColor = DEFAULT_HOVER_COLOR,
  showLine = false,
  lineClassName = "",
  showArrow = false,
  icon = <ArrowRight />,
  iconClassName = "",
  scrambleDuration = DEFAULT_SCRAMBLE_DURATION,
  stepMs = DEFAULT_STEP_MS,
  revealStagger = DEFAULT_REVEAL_STAGGER,
  onClick,
  onPointerDown,
  ...props
}: ScrambleLinkButtonProps) {
  const scrambleRef = useRef<HTMLSpanElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const activeStyle = isCompactLayout && isPressed ? { color: hoverColor } : undefined;

  const innerClassName = `relative inline-block ${
    showLine
      ? `w-fit after:absolute after:left-0 after:bottom-[-4%] after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.625,0.05,0,1)] after:content-[''] motion-reduce:after:transition-none motion-safe:group-hover:after:origin-left motion-safe:group-hover:after:scale-x-100 motion-safe:group-focus-visible:after:origin-left motion-safe:group-focus-visible:after:scale-x-100 motion-safe:group-data-[pressed=true]:after:origin-left motion-safe:group-data-[pressed=true]:after:scale-x-100 ${lineClassName}`
      : ""
  }`;

  useEffect(() => {
    if (scrambleRef.current) {
      scrambleRef.current.textContent = btnText;
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (pressRef.current) clearTimeout(pressRef.current);
    };
  }, [btnText]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${COMPACT_LAYOUT_BREAKPOINT - 1}px)`);

    const sync = (matches: boolean) => {
      setIsCompactLayout(matches);
      if (!matches) setIsPressed(false);
    };
    const onChange = (event: MediaQueryListEvent) => sync(event.matches);

    sync(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const runScramble = () => {
    const element = scrambleRef.current;
    if (!element || !btnText.length) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      element.textContent = btnText;
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    let iteration = 0;
    const maxIterations = Math.max(1, Math.floor(scrambleDuration / stepMs));

    const updateScramble = () => {
      element.textContent = getScrambledText({
        finalText: btnText,
        iteration,
        maxIterations,
        revealStagger,
      });

      if (iteration >= maxIterations) {
        element.textContent = btnText;
        return;
      }

      iteration += 1;
      timeoutRef.current = setTimeout(updateScramble, stepMs);
    };

    updateScramble();
  };

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerDown?.(event);
    if (!isCompactLayout || event.pointerType === "mouse") return;

    setIsPressed(true);
    runScramble();
    if (pressRef.current) clearTimeout(pressRef.current);
    pressRef.current = setTimeout(() => setIsPressed(false), scrambleDuration + 400);
  };

  return (
    <Link
      href={href}
      {...props}
      onClick={onClick}
      onMouseEnter={runScramble}
      onFocus={runScramble}
      data-pressed={isPressed ? "true" : "false"}
      onPointerDown={handlePointerDown}
      className={`group inline-flex cursor-pointer items-center gap-2 text-inherit no-underline transition-colors duration-300 ease-in-out motion-reduce:transition-none hover:text-(--scramble-hover-color) focus-visible:text-(--scramble-hover-color) ${className}`}
      style={{ "--scramble-hover-color": hoverColor } as CSSProperties & Record<string, string>}
    >
      <span className={innerClassName} style={activeStyle}>
        <span className="sr-only">{btnText}</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none invisible inline-block select-none whitespace-pre [font-variant-ligatures:none] ${textClassName}`}
        >
          {btnText}
        </span>
        <span
          ref={scrambleRef}
          aria-hidden="true"
          className={`absolute inset-0 inline-block whitespace-pre text-left [font-variant-ligatures:none] ${textClassName}`}
          style={activeStyle}
        >
          {btnText}
        </span>
      </span>

      {showArrow && icon && (
        <span
          aria-hidden="true"
          className={`inline-flex items-center justify-center transition-transform duration-300 ease-in-out [&>svg]:size-[1em] motion-reduce:transition-none motion-safe:group-hover:-rotate-45 motion-safe:group-data-[pressed=true]:-rotate-45 ${iconClassName}`}
        >
          {icon}
        </span>
      )}
    </Link>
  );
}

export default ScrambleLinkButton;
