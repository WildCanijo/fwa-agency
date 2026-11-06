import Link from "next/link";
import { cn } from "@/lib/utils";

/** FWD wordmark: heavy grotesk letters, a forward arrow, and a mono descriptor. */
export function Wordmark({
  href,
  label,
  studio,
  className,
  onClick,
}: {
  href: string;
  label: string;
  studio: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} aria-label={label} className={cn("group flex items-baseline gap-2 text-fg", className)}>
      <span className="text-[22px] leading-none font-extrabold tracking-[-0.04em]">
        FWD
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block text-accent transition-transform duration-500 ease-swift group-hover:translate-x-1"
        >
          →
        </span>
      </span>
      <span className="label-mono hidden text-[10px] text-muted sm:inline">{studio}</span>
    </Link>
  );
}
