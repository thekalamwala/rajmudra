import { useId } from "react";
import { cn } from "@/lib/utils";

// The signature Rajmudra poster border: a repeating temple-arch lace — magenta
// outer arches with teal inner arches and marigold beads, bounded by thin gold
// rules and marigold valley dots. This is the framing band that runs along the
// top and bottom of the social posters; tiles to any width and tints are fixed
// to the brand palette so it reads the same everywhere (cream or indigo ground).

type Props = {
  /** rendered height in px (art authored at 24 units, scales uniformly) */
  height?: number;
  /** flip vertically — use on the BOTTOM edge of a band so arches point up into it */
  flip?: boolean;
  className?: string;
};

const GOLD = "#ffc01e";
const MAGENTA = "#e80f7a";
const TEAL = "#0e9384";
const CREAM = "#fbf4e6";

const ART_W = 40;
const ART_H = 24;

export function FestiveBand({ height = 22, flip, className }: Props) {
  const id = useId().replace(/:/g, "");
  const s = height / ART_H; // uniform scale from authored units to px
  const tileW = ART_W * s;
  const B = ART_H - 3; // arch baseline in art units
  return (
    <div
      aria-hidden
      className={cn("w-full overflow-hidden leading-[0]", className)}
      style={{ height, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg width="100%" height={height} role="presentation">
        <defs>
          <pattern id={`fb-${id}`} width={tileW} height={height} patternUnits="userSpaceOnUse">
            <g transform={`scale(${s})`}>
              {/* gold rules top & bottom */}
              <rect x="0" y="0" width={ART_W} height="2.4" fill={GOLD} />
              <rect x="0" y={ART_H - 2.4} width={ART_W} height="2.4" fill={GOLD} />
              {/* magenta outer arch */}
              <path d={`M4 ${B} A 16 15 0 0 1 36 ${B} Z`} fill={MAGENTA} />
              {/* cream ring + teal inner arch */}
              <path d={`M10 ${B} A 10 9.5 0 0 1 30 ${B} Z`} fill={CREAM} />
              <path d={`M14 ${B} A 6 6 0 0 1 26 ${B} Z`} fill={TEAL} />
              {/* marigold bead crowning the arch */}
              <circle cx="20" cy="12" r="2.6" fill={GOLD} />
              {/* valley beads (shared across the tile seam) */}
              <circle cx="0" cy={B - 3} r="2.3" fill={GOLD} />
              <circle cx={ART_W} cy={B - 3} r="2.3" fill={GOLD} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#fb-${id})`} />
      </svg>
    </div>
  );
}
