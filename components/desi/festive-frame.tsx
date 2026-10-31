import { useId } from "react";
import { cn } from "@/lib/utils";

// Ornamental card dressing for the Desi Digital cards: a fish-scale (seigaiha)
// scallop lace along the bottom edge. Drop inside a `relative overflow-hidden`
// card; it tints from one `color`.

function ScallopEdge({ color, className }: { color: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const H = 26;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{
        height: H,
        color,
        WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent)",
        maskImage: "linear-gradient(to top, #000 10%, transparent)",
      }}
    >
      <svg width="100%" height={H} role="presentation">
        <defs>
          <pattern id={`sc-${id}`} width="22" height={H} patternUnits="userSpaceOnUse">
            <path d={`M0 ${H} A11 11 0 0 0 22 ${H}`} fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
            <path d={`M3.5 ${H} A7.5 7.5 0 0 0 18.5 ${H}`} fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
            <path d={`M7 ${H} A4 4 0 0 0 15 ${H}`} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height={H} fill={`url(#sc-${id})`} />
      </svg>
    </div>
  );
}

export function FestiveFrame({ color, scallop = true }: { color: string; scallop?: boolean }) {
  if (!scallop) return null;
  return <ScallopEdge color={color} className="absolute inset-x-0 bottom-0" />;
}
