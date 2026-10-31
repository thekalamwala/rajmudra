import { useId } from "react";
import { cn } from "@/lib/utils";

// A minimal toran — a thin draped line of small dots — strung across the top of
// a card. Tileable to any width; tints from `color`.

type Props = { color?: string; className?: string; height?: number };

export function Toran({ color = "var(--desi-orange)", className, height = 22 }: Props) {
  const id = useId().replace(/:/g, "");
  const W = 108;
  return (
    <div aria-hidden className={cn("pointer-events-none w-full overflow-hidden leading-[0]", className)} style={{ color }}>
      <svg width="100%" height={height} role="presentation">
        <defs>
          <pattern id={`tr-${id}`} width={W} height={height} patternUnits="userSpaceOnUse">
            {/* thin swag of tiny dots */}
            <path
              d={`M0 5 Q ${W / 2} ${height - 5} ${W} 5`}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeDasharray="0.5 6"
              strokeLinecap="round"
            />
            {/* small hanging dot at the low point */}
            <circle cx={W / 2} cy={height - 3.5} r={1.6} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#tr-${id})`} />
      </svg>
    </div>
  );
}
