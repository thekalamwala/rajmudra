import { useId } from "react";
import { cn } from "@/lib/utils";

// A hand-block-print field — a grid of eight-petal flower stamps with bead
// accents, from the brand "Block Print" graphic. Used as a decorative fill
// behind panels. Tints from a single `color`.

type Props = { color?: string; className?: string; opacity?: number; scale?: number };

export function BlockPrint({ color = "var(--desi-marigold)", className, opacity = 0.14, scale = 1 }: Props) {
  const id = useId().replace(/:/g, "");
  const U = 54 * scale;
  const c = U / 2;
  return (
    <div aria-hidden className={cn("pointer-events-none", className)} style={{ color, opacity }}>
      <svg width="100%" height="100%" role="presentation">
        <defs>
          <pattern id={`bp-${id}`} width={U} height={U} patternUnits="userSpaceOnUse">
            <g fill="currentColor">
              {/* flower stamp */}
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={i} cx={c} cy={c - 8 * scale} rx={2 * scale} ry={4.4 * scale} transform={`rotate(${i * 45} ${c} ${c})`} />
              ))}
              <circle cx={c} cy={c} r={3 * scale} />
              <circle cx={c} cy={c} r={1.2 * scale} fill="none" />
              {/* bead accents at the tile corners */}
              <circle cx={0} cy={0} r={2 * scale} />
              <circle cx={U} cy={0} r={2 * scale} />
              <circle cx={0} cy={U} r={2 * scale} />
              <circle cx={U} cy={U} r={2 * scale} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#bp-${id})`} />
      </svg>
    </div>
  );
}
