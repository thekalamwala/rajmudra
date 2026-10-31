import { useId } from "react";
import { cn } from "@/lib/utils";

// A clean scallop border — a row of filled semicircles — straight from the
// brand "Scallop Border" graphic. Tileable to any width; tints from `color`.
// Default bumps point down; `flip` points them up.

type Props = { color?: string; radius?: number; flip?: boolean; className?: string };

export function ScallopBorder({ color = "var(--desi-orange)", radius = 11, flip, className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <div
      aria-hidden
      className={cn("w-full overflow-hidden leading-[0]", className)}
      style={{ height: radius, color, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg width="100%" height={radius} role="presentation">
        <defs>
          <pattern id={`sb-${id}`} width={radius * 2} height={radius} patternUnits="userSpaceOnUse">
            <path d={`M0 0 A ${radius} ${radius} 0 0 0 ${radius * 2} 0 Z`} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height={radius} fill={`url(#sb-${id})`} />
      </svg>
    </div>
  );
}
