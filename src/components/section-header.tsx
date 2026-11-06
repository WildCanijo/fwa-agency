import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  label: string;
  note?: string;
  className?: string;
};

/** The thin technical rule that opens every section: (02) — SERVICES ........ note */
export function SectionHeader({ index, label, note, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "label-mono flex items-center gap-4 border-t border-line pt-4 text-muted",
        className,
      )}
    >
      <span className="text-accent">({index})</span>
      <span className="text-fg">{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-line-soft" />
      {note ? <span className="hidden sm:inline">{note}</span> : null}
    </div>
  );
}
