import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Minimal browser window. Inner content scales with the frame via cqw units. */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-white/10 bg-[#161616] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        <div className="flex-1 truncate bg-white/[0.04] px-2 py-0.5 text-center font-mono text-[10px] text-white/40">
          {url}
        </div>
        <span className="w-8" aria-hidden="true" />
      </div>
      <div className="@container relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}

/** Phone outline with a notch. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] border border-white/15 bg-[#0e0e0e] p-[5px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="@container relative aspect-[9/19] overflow-hidden rounded-[17px]">
        {children}
        <span
          aria-hidden="true"
          className="absolute top-[2.2%] left-1/2 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  );
}
