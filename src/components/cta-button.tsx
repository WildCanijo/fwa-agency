import { ArrowUpRight } from "lucide-react";
import { ScrambleLinkButton } from "@/components/ui/scramble-link-button";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  label: string;
  variant?: "solid" | "outline";
  className?: string;
};

/**
 * The studio's primary action: a sharp rectangle with a scrambling mono label,
 * a magnetic pull and an arrow that turns forward on hover.
 */
export function CtaButton({ href, label, variant = "solid", className }: CtaButtonProps) {
  return (
    <Magnetic strength={0.22}>
      <ScrambleLinkButton
        href={href}
        btnText={label}
        hoverColor={variant === "solid" ? "#0b0b0b" : "#ff5a36"}
        showArrow
        icon={<ArrowUpRight />}
        iconClassName="text-[15px]"
        className={cn(
          "label-mono h-12 gap-3 px-5 text-[12px] font-medium transition-[background-color,color,border-color] duration-300",
          variant === "solid"
            ? "bg-accent text-bg hover:bg-fg"
            : "border border-line text-fg hover:border-accent",
          className,
        )}
      />
    </Magnetic>
  );
}
