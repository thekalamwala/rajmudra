import { cn } from "@/lib/utils";

// A horizontal section divider: a dotted rule running out to each side from a
// central eight-petal flower burst. Matches the poster's framing lines.

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

export function FlowerDivider({ color = "var(--desi-orange)", className }: { color?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden style={{ color }}>
      <span className="h-0 flex-1 border-t-2 border-dotted border-current opacity-45" />
      <Flower color={color} />
      <span className="h-0 flex-1 border-t-2 border-dotted border-current opacity-45" />
    </div>
  );
}
