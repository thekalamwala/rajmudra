import { useId } from "react";
import { cn } from "@/lib/utils";

// A tileable rangoli border strip — diamonds, beads and petal arcs on a thin
// baseline — used to separate sections the way the posters frame their panels.
// Renders as a repeating SVG <pattern> in user-space px so it tiles across any
// width, and tints from a single colour prop.

type Props = {
  color?: string;
  className?: string;
  height?: number;
  /** mirror the motif vertically */
  flip?: boolean;
};

export function RangoliDivider({ color = "var(--desi-orange)", className, height = 40, flip }: Props) {
  const id = useId().replace(/:/g, "");
  const U = 72; // tile width (px)
  const mid = height / 2;

  return (
    <div
      className={cn("w-full overflow-hidden leading-[0]", className)}
      aria-hidden
      style={{ transform: flip ? "scaleY(-1)" : undefined, color }}
    >
      <svg width="100%" height={height} role="presentation">
        <defs>
          <pattern id={`rg-${id}`} width={U} height={height} patternUnits="userSpaceOnUse">
            {/* baseline */}
            <line x1="0" y1={mid} x2={U} y2={mid} stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
            {/* centre diamond */}
            <rect
              x={U / 2 - 6}
              y={mid - 6}
              width="12"
              height="12"
              transform={`rotate(45 ${U / 2} ${mid})`}
              fill="currentColor"
            />
            {/* inner diamond notch (cream) */}
            <rect
              x={U / 2 - 2.6}
              y={mid - 2.6}
              width="5.2"
              height="5.2"
              transform={`rotate(45 ${U / 2} ${mid})`}
              fill="var(--desi-cream, #fbf4e6)"
            />
            {/* petal arcs flanking the diamond */}
            <path
              d={`M ${U / 2 - 15} ${mid} q 4.5 -8 9 0 M ${U / 2 + 6} ${mid} q 4.5 -8 9 0`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* beads along the baseline */}
            <circle cx="0" cy={mid} r="2.8" fill="currentColor" />
            <circle cx={U} cy={mid} r="2.8" fill="currentColor" />
            <circle cx={U / 4} cy={mid} r="1.9" fill="currentColor" opacity="0.8" />
            <circle cx={(U * 3) / 4} cy={mid} r="1.9" fill="currentColor" opacity="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#rg-${id})`} />
      </svg>
    </div>
  );
}
