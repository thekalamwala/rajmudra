import { useId } from "react";
import { cn } from "@/lib/utils";

// A quiet section divider: a gentle up-and-down wave line running out to each
// side from a single eight-petal flower. A calmer alternative to the festive
// temple-arch band — one tint, no arches.

function Flower({ color }: { color: string }) {
  return (
    <svg viewBox="-16 -16 32 32" width="26" height="26" aria-hidden style={{ color }} className="shrink-0">
      <g fill="currentColor">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-9" rx="2.4" ry="5.2" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="3.2" />
      </g>
    </svg>
  );
}

// One side of the divider: a sine-like wave that tiles to any width.
function Wave({ flip }: { flip?: boolean }) {
  const id = useId().replace(/:/g, "");
  const W = 28; // wave period in px
  const H = 12; // strip height
  const mid = H / 2;
  const A = 3.2; // amplitude
  return (
    <span
      className="h-3 flex-1 overflow-hidden leading-[0] opacity-55"
      aria-hidden
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <svg width="100%" height={H} role="presentation" style={{ display: "block" }}>
        <defs>
          <pattern id={`wd-${id}`} width={W} height={H} patternUnits="userSpaceOnUse">
            <path
              d={`M0 ${mid} q ${W / 4} -${A} ${W / 2} 0 t ${W / 2} 0`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height={H} fill={`url(#wd-${id})`} />
      </svg>
    </span>
  );
}

export function WaveDivider({ color = "var(--desi-orange)", className }: { color?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden style={{ color }}>
      <Wave />
      <Flower color={color} />
      <Wave flip />
    </div>
  );
}
