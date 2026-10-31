import { useId } from "react";
import { cn } from "@/lib/utils";

// A jaali (lattice) patch — the overlapping-circles screen pattern seen in
// Indian stonework. Used faint in section corners as a background watermark.

type Props = { color?: string; className?: string; size?: number | string; opacity?: number };

export function Jaali({ color = "var(--desi-orange)", className, size = 240, opacity = 0.18 }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden className={cn("pointer-events-none", className)} style={{ width: size, height: size, color, opacity }}>
      <svg width="100%" height="100%" role="presentation">
        <defs>
          <pattern id={`jl-${id}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="0" cy="0" r="15" />
              <circle cx="30" cy="0" r="15" />
              <circle cx="0" cy="30" r="15" />
              <circle cx="30" cy="30" r="15" />
              <circle cx="15" cy="15" r="15" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#jl-${id})`} />
      </svg>
    </div>
  );
}
