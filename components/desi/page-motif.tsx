import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { MandalaSeal } from "./mandala-seal";

// ONE calm brand motif for an inner page — the "50% of the homepage" rule made
// reusable. A single faint mandala tucked into a top corner, sitting well behind
// the content (-z-10) and ignoring pointer events. Never stack more than one per
// page. Token-driven colour; no motion, so it stays quiet and reduced-motion safe.
//
// Usage: drop once inside a page's outermost wrapper, which must be `relative`
// and clip horizontal overflow (e.g. `relative overflow-x-clip`).
export function PageMotif({
  className,
  color = "var(--desi-orange)",
  size = 420,
  opacity = 0.06,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute right-0 top-0 -z-10 overflow-hidden",
        className,
      )}
      style={{ opacity } as CSSProperties}
    >
      <MandalaSeal
        size={size}
        color={color}
        className="translate-x-1/3 -translate-y-1/4"
      />
    </div>
  );
}
